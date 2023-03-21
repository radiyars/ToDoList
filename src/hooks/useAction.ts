import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { appActions } from './../redux/task-reducer';

const allActions = { ...appActions }

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(allActions, dispatch)
}
