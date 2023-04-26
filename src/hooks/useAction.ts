import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { listsActions } from '../redux/lists-reducer';

const allActions = { ...listsActions }

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(allActions, dispatch)
}
