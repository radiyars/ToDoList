import { Dispatch } from 'react'
import { colorsAPI } from '../api/colors-api'
import { ColorType } from '../types/types'

//	Actions CONST	---------------------------------------------------------------------------

export const ADD_COLORS = 'ADD_COLORS'


//	Initial State & i'ts type	---------------------------------------------------------------


// Массив цветов
const initialState: Array<ColorType> = [
	{
		colorId: 0,
		hex: '',
		name: ''
	}
]

export type InitialStateType = Array<ColorType>


//	Reducer	-------------------------------------------------------------------------------------

export const colorsReducer = (state = initialState, action: AppActionsTypes): InitialStateType => {
	switch (action.type) {
		case ADD_COLORS:
			return [...action.colors]
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

export function getColors() {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			let data = await colorsAPI.getColors()
			dispatch(addColors(data))
		} catch (err) {
			alert(`Не удалось загрузить список цветов! ${err}`)
		}
	}
}

export const colorsActions = { addColors, getColors }
