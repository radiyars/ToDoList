import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppStateType } from "../redux/root-reducer";


export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector
