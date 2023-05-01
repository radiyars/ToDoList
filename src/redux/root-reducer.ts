import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"
import { listsReducer } from "./lists-reducer"
import { colorsReducer } from "./color-reducer"


export const rootReducer = combineReducers({
	lists: listsReducer,
	colors: colorsReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(thunk)
));
