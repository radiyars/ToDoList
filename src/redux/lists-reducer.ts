
import { Dispatch } from 'react';
import axios from 'axios';
import { ColorType } from './color-reducer';

//	Actions CONST	---------------------------------------------------------------------------

export const ADD_LISTS = 'ADD_LISTS'


//	Initial State & i'ts type	---------------------------------------------------------------

// Массив задач
export type TaskType = {
	_id: string
	text: string
	completed: boolean
}


// Массив листов
export type ListType = {
	_id: string
	name: string
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
			return {
				// ...state,
				...action.lists
			}
		default:
			return state;
	}
}

//	Actions	-----------------------------------------------------------------------------------

export type AppActionsTypes = AddListsType


type AddListsType = {
	type: typeof ADD_LISTS
	lists: Array<ListType>
}

export const addLists = (lists: Array<ListType>): AddListsType => ({ type: ADD_LISTS, lists })



//	Thunks	------------------------------------------------------------------------------------

export function getLists() {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			//? Добавить лоадер?? dispatch(loaderOn());
			axios.get('https://todo-list-server-silk.vercel.app/api/lists').then(({ data }) => {
				dispatch(addLists(data))
			})
		} catch (err) {
			alert("ашипка!")
		}
	}
}

export const listsActions = { addLists, getLists }
