
import { Dispatch } from 'react'
import { listsAPI } from '../api/lists-api'
import { ColorType, ListType, TaskType } from '../types/types'

//	Actions CONST	---------------------------------------------------------------------------
export const ADD_LISTS = 'ADD_LISTS'
export const ADD_LIST = 'ADD_LIST'
export const DELETE_LIST = 'DELETE_LIST'
export const RENAME_LIST = 'RENAME_LIST'
export const PARCH_LISTS_TASKS = 'PARCH_LISTS_TASKS'


//	Initial State & i'ts type	---------------------------------------------------------------

const initialState: Array<ListType> = [
	{
		_id: '',
		name: '',
		color: null,
		tasks: null
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
			return state.filter(({ _id }) => _id !== action.id)

		case RENAME_LIST:
			let list = state.find(list => list._id === action.id)
			if (list) {
				list.name = action.name
			}
			return [...state]

		case PARCH_LISTS_TASKS:
			{
				let list = state.find(list => list._id === action.id)
				if (list) {
					list.tasks = [...action.tasks]
				}
				return [...state]
			}
		default:
			return state;
	}
}

//	Actions	-----------------------------------------------------------------------------------

export type AppActionsTypes = AddListsType | AddListType | DelListType | RenListType | PatListsTasksType


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


type RenListType = {
	type: typeof RENAME_LIST
	id: string
	name: string
}
export const renList = (id: string, name: string): RenListType => ({ type: RENAME_LIST, id, name })


type PatListsTasksType = {
	type: typeof PARCH_LISTS_TASKS
	id: string
	tasks: Array<TaskType>
}
export const patListsTasks = (id: string, tasks: Array<TaskType>): PatListsTasksType => ({ type: PARCH_LISTS_TASKS, id, tasks })


//	Thunks	------------------------------------------------------------------------------------

export function getLists() {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			//? Добавить лоадер?? dispatch(loaderOn());
			let data = await listsAPI.getLists()
			dispatch(addLists(data))
		} catch (err) {
			alert(`Не удалось загрузить списки задач! ${err}`)
		}
	}
}


export function postList(name: string, color: ColorType) {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			let data = await listsAPI.postList(name, color)
			dispatch(addList(data))
		} catch (err) {
			alert(`Не удалось добавить список задач! ${err}`)
		}
	}
}


export function deleteList(id: string) {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			await listsAPI.deleteList(id)
			dispatch(delList(id))
		} catch (err) {
			alert(`Не удалось удалить список задач! ${err}`)
		}
	}
}


export function renameList(id: string, name: string) {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			await listsAPI.renameList(id, name)
			dispatch(renList(id, name))
		} catch (err) {
			alert(`Не удалось изменить название списка задач! ${err}`)
		}
	}
}


export function patchListsTasks(id: string, tasks: Array<TaskType>) {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			await listsAPI.patchListsTasks(id, tasks)
			dispatch(patListsTasks(id, tasks))
		} catch (err) {
			alert(`Не удалось обновить список задач! ${err}`)
		}
	}
}

export const listsActions = {
	addLists,
	getLists,
	postList,
	deleteList,
	renameList,
	patchListsTasks
}
