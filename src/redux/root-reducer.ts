import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { appReducer } from "./task-reducer";


export const rootReducer = combineReducers({
	app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(thunk)
));
