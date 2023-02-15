import axios from 'axios';
import { useEffect, useState } from 'react';
import listSvg from './assets/img/list2.svg';
import AddList from './components/AddList/AddList';
import List from './components/List/List';
import Tasks from './components/Tasks/Tasks';


export type ListType = {
	id: number
	name: string
	colorId: number
	color: ColorType
	tasks: TaskTypeArray
}
export type ListTypeArray = Array<ListType>

type TaskType = {
	id: number
	listId: number
	text: string
	completed: boolean
}
export type TaskTypeArray = Array<TaskType>

type ColorType = {
	id: number
	hex: string
	name: string
}
export type ColorTypeArray = Array<ColorType>

export type StateType = {
	lists: Array<ListType>
	tasks: Array<TaskType>
	colors: Array<ColorType>
}


function App() {

	const [isNewLists, setIsNewLists] = useState(false) // Новый список листов
	const [lists, setLists] = useState<ListTypeArray | null>(null) // Список листов
	const [colors, setColors] = useState<ColorTypeArray | null>(null) // список цветов

	// Получаем данные о цветах только при первом рендеринге
	useEffect(() => {
		axios.get('http://localhost:3001/colors').then(({ data }) => {
			setColors(data)
		})
	}, [])

	// Следим за изменением листов
	useEffect(() => {
		setIsNewLists(false)
		axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
			setLists(data)
		})
	}, [isNewLists])


	// const onAddList = (obj: ListType) => {
	// 	if (!!lists) {
	// 		setLists([...lists, obj])
	// 	}
	// };


	return (
		<div className="todo">
			<div className="todo__sidebar">
				<List onRemove={() => { }} lists={null} title='Все задачи' img={listSvg} isRemovable={false} onClick={() => { }} isHoverOpacityEffect={false} />
				<List onRemove={setIsNewLists} lists={lists} title='' img='' isRemovable={true} onClick={() => { }} isHoverOpacityEffect={false} />
				<AddList lists={lists} colors={colors} onAddList={setIsNewLists} />
			</div>
			<div className="todo__tasks">
				{lists && <Tasks list={lists[0]} />}
			</div>
		</div>
	);
}

export default App;
