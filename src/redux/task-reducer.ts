
import { Dispatch } from 'react';
import axios from 'axios';

//	Actions CONST	---------------------------------------------------------------------------

export const ADD_COLORS = 'ADD_COLORS'


//	Initial State & i'ts type	---------------------------------------------------------------

// Массив цветов
export type ColorType = {
	id: number
	hex: string
	name: string
}

const initialColor: ColorType = {
	id: 0,
	hex: '',
	name: ''
}

// Массив задач
export type TaskType = {
	id: number
	listId: number
	text: string
	completed: boolean
}

const initialTask: TaskType = {
	id: 0,
	listId: 0,
	text: '',
	completed: false
}

// Массив листов
export type ListType = {
	id: number
	name: string
	colorId: number
	color: ColorType
	tasks: Array<TaskType>
}

const initialList: ListType = {
	id: 0,
	name: '',
	colorId: 0,
	color: initialColor,
	tasks: [initialTask]
}


export type InitialStateType = {
	lists: Array<ListType>
	tasks: Array<TaskType>
	colors: Array<ColorType>
}

const initialState: InitialStateType = {
	lists: [initialList],
	tasks: [initialTask],
	colors: [initialColor]
}

//	Reducer	-------------------------------------------------------------------------------------
export const appReducer = (state = initialState, action: AppActionsTypes): InitialStateType => {
	switch (action.type) {
		case ADD_COLORS:
			return {
				...state,
				colors: action.colors
			}
		default:
			return state;
	}
}

//	Actions	-----------------------------------------------------------------------------------

export type AppActionsTypes = AddColorsType


type AddColorsType = {
	type: typeof ADD_COLORS
	colors: Array<ColorType>
}

export const addColors = (colors: Array<ColorType>): AddColorsType => ({ type: ADD_COLORS, colors })



//	Thunks	------------------------------------------------------------------------------------

export function loadColors() {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			//? Добавить лоадер?? dispatch(loaderOn());
			axios.get('http://localhost:3001/colors').then(({ data }) => {
				dispatch(addColors(data))
			})
		} catch (err) {
			alert("Для полноценной работы приложения необходимо запустить json-server. Для этого выполните 'npm run fake-server' или 'yarn fake-server'")
		}
	}
}

export const appActions = { addColors, loadColors }
