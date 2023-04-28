import { ColorType } from "../redux/color-reducer"
import { ListType } from "../redux/lists-reducer"
import { instance } from './api'


export const listsAPI = {

	getLists() {
		return instance.get<Array<ListType>>(`/lists`)
			.then(response => response.data);
	},

	postList(name: string, color: ColorType) {
		return instance.post<ListType>(`/lists`, { name, color })
			.then(response => response.data);
	},

	deleteList(id: string) {
		return instance.delete<ListType>(`/lists/${id}`)
			.then(response => response.data);
	},


}

