import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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

export type TaskType = {
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

	const [isListsChanged, setIsListsChanged] = useState(false)  // Новый список листов
	const [lists, setLists] = useState<ListTypeArray | null>(null) // Список листов
	const [colors, setColors] = useState<ColorTypeArray | null>(null) // список цветов
	const [selectedListId, setSelectedListId] = useState<number | null>(null) // Выбранный лист
	const [active, setActive] = useState(false) // Активный пункт sidebar "Все" или нет
	let navigate = useNavigate()


	// Получаем данные о цветах только при первом рендеринге
	useEffect(() => {
		axios.get('http://localhost:3001/colors').then(({ data }) => {
			setColors(data)
		})
	}, [])


	// Следим за изменением листов
	useEffect(() => {
		axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
			setLists(data)
		})
		setIsListsChanged(false)

	}, [isListsChanged])


	// Определяем выбранный лист
	let pathname = useLocation().pathname;
	useEffect(() => {
		let listId = pathname.split('lists/')[1]
		if (listId) {
			setSelectedListId(+listId)
		} else if (pathname === '/') {
			setActive(true)

		}
	}, [pathname, lists])


	// Делаем выбранный лист активным
	const chooseActive = (id: number | null) => {
		setSelectedListId(id)
		setActive(false)
		navigate(`/lists/${id}`)
	}


	return (
		<div className="todo">
			<div className="todo__sidebar">
				<List
					lists={null}
					title='Все задачи'
					img={listSvg}
					isRemovableItem={false}
					selectedListId={selectedListId}
					active={active}
					onClick={() => { setActive(true) }}
					onClickItem={(id) => { navigate(`/`) }}
					onUpdateLists={() => { }} />
				<List
					lists={lists}
					isRemovableItem={true}
					selectedListId={selectedListId}
					active={active}
					onClick={() => { }}
					onClickItem={chooseActive}
					onUpdateLists={setIsListsChanged} />
				<AddList
					lists={lists}
					colors={colors}
					onAddList={setIsListsChanged} />
			</div>
			<div className="todo__tasks">
				<Routes >
					<Route path='/' element=
						{lists &&
							lists.map(list => (
								<Tasks
									key={list.id}
									list={list}
									onUpdateLists={setIsListsChanged}
									withoutEmpty={true} />
							))
						}
					/>

					<Route path='/lists/:id' element=
						{lists && selectedListId &&
							<Tasks
								key={0}
								list={lists.find(i => i.id === selectedListId) || null}
								onUpdateLists={setIsListsChanged}
								withoutEmpty={false} />}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
