// Список задач
export type ListType = {
	_id: string
	name: string
	color: ColorType | null
	tasks: Array<TaskType> | null
}


// Задача
export type TaskType = {
	_id?: string
	text: string
	completed: boolean
}


// Цвет списка задач
export type ColorType = {
	colorId: number
	hex: string
	name: string
}