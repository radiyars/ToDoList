import { ColorType, ListType, TaskType } from '../types/types';
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
	},

	renameList(id: string, name: string) {
		return instance.patch<ListType>(`/lists/${id}`, { name })
	},

	patchListsTasks(listId: string, tasks: Array<TaskType>) {
		return instance.patch<ListType>(`/lists/${listId}`, { tasks })
	}

}

