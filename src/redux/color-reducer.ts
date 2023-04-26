// Массив цветов
export type ColorType = {
	// id: string
	colorId: number
	hex: string
	name: string
}

// // const initialColor: ColorType = {
// // 	id: 0,
// // 	hex: '',
// // 	name: ''
// // }


// import { Dispatch } from 'react';
// import axios from 'axios';
// import { ColorType } from './color-reducer';

// //	Actions CONST	---------------------------------------------------------------------------

// export const ADD_LISTS = 'ADD_LISTS'


// //	Initial State & i'ts type	---------------------------------------------------------------

// // Массив задач
// export type TaskType = {
// 	text: string
// 	completed: boolean
// }


// // Массив листов
// export type ListType = {
// 	id: string
// 	name: string
// 	colorId: number
// 	color: ColorType
// 	tasks: Array<TaskType>
// }

// const initialState: ListType = {
// 	id: '',
// 	name: '',
// 	colorId: 0,
// 	color: {
// 		id: '',
// 		colorId: 0,
// 		hex: '',
// 		name: '',
// 	},
// 	tasks: [{
// 		text: '',
// 		completed: false
// 	}]
// }

// export type InitialStateType = ListType


// //	Reducer	-------------------------------------------------------------------------------------
// export const appReducer = (state = initialState, action: AppActionsTypes): InitialStateType => {
// 	switch (action.type) {
// 		case ADD_LISTS:
// 			return {
// 				...state,
// 				lists: action.lists
// 			}
// 		default:
// 			return state;
// 	}
// }

// //	Actions	-----------------------------------------------------------------------------------

// export type AppActionsTypes = AddColorsType


// type AddColorsType = {
// 	type: typeof ADD_COLORS
// 	colors: Array<ColorType>
// }

// export const addLists = (lists: Array<ColorType>): AddColorsType => ({ type: ADD_COLORS, colors })



// //	Thunks	------------------------------------------------------------------------------------

// export function loadColors() {
// 	return async (dispatch: Dispatch<AppActionsTypes>) => {
// 		try {
// 			//? Добавить лоадер?? dispatch(loaderOn());
// 			axios.get('http://localhost:3001/colors').then(({ data }) => {
// 				dispatch(addColors(data))
// 			})
// 		} catch (err) {
// 			alert("Для полноценной работы приложения необходимо запустить json-server. Для этого выполните 'npm run fake-server' или 'yarn fake-server'")
// 		}
// 	}
// }

// export const appActions = { addColors, loadColors }
