
import { Dispatch } from 'react'
import { listsAPI } from '../api/lists-api'
import { ColorType } from './color-reducer'

//	Actions CONST	---------------------------------------------------------------------------
export const ADD_LISTS = 'ADD_LISTS'
export const ADD_LIST = 'ADD_LIST'
export const DELETE_LIST = 'DELETE_LIST'


//	Initial State & i'ts type	---------------------------------------------------------------

// Задачи
export type TaskType = {
	_id: string | null
	text: string | null
	completed: boolean | null
}

// Листы с задачами
export type ListType = {
	_id: string | null
	name: string | null
	color: ColorType
	tasks: Array<TaskType>
}

const initialState: Array<ListType> = [
	{
		_id: '',
		name: '',
		color: {
			colorId: 0,
			hex: '',
			name: '',
		},
		tasks: [{
			_id: '',
			text: '',
			completed: false
		}]
	}
]

export type InitialStateType = Array<ListType>


//	Reducer	-------------------------------------------------------------------------------------

export const listsReducer = (state = initialState, action: AppActionsTypes): InitialStateType => {
	switch (action.type) {
		case ADD_LISTS:
			return [...action.lists]

		case ADD_LIST:
			return [...state, action.list]

		case DELETE_LIST:
			return state.filter(({ _id }) => _id !== action.id);

		default:
			return state;
	}
}

//	Actions	-----------------------------------------------------------------------------------

export type AppActionsTypes = AddListsType | AddListType | DelListType


type AddListsType = {
	type: typeof ADD_LISTS
	lists: Array<ListType>
}
export const addLists = (lists: Array<ListType>): AddListsType => ({ type: ADD_LISTS, lists })


type AddListType = {
	type: typeof ADD_LIST
	list: ListType
}
export const addList = (list: ListType): AddListType => ({ type: ADD_LIST, list })


type DelListType = {
	type: typeof DELETE_LIST
	id: string
}
export const delList = (id: string): DelListType => ({ type: DELETE_LIST, id })


//	Thunks	------------------------------------------------------------------------------------

export function getLists() {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			//? Добавить лоадер?? dispatch(loaderOn());
			let data = await listsAPI.getLists()
			dispatch(addLists(data))
		} catch (err) {
			alert(`Ошибка при загрузке списка задач! ${err}`)
		}
	}
}


export function postList(name: string, color: ColorType) {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			let data = await listsAPI.postList(name, color)
			dispatch(addList(data))
		} catch (err) {
			alert(`Ошибка при добавлении списка задач! ${err}`)
		}
	}
}


export function deleteList(id: string) {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			let data = await listsAPI.deleteList(id)
			dispatch(delList(id))
		} catch (err) {
			alert(`Ошибка при удалении списка задач! ${err}`)
		}
	}
}


export const listsActions = { addLists, getLists, postList, deleteList }
