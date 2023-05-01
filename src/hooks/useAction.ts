import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { listsActions } from '../redux/lists-reducer'
import { colorsActions } from "../redux/color-reducer"

const allActions = { ...listsActions, ...colorsActions }

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(allActions, dispatch)
}
