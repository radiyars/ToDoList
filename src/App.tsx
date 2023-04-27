import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import listSvg from './assets/img/list2.svg';
import AddList from './components/AddList/AddList';
import List from './components/List/List';
// import { ListType } from './redux';
import Tasks from './components/Tasks/Tasks';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useAction';
import { ColorType } from './redux/color-reducer';


function App() {

	const [isListsChanged, setIsListsChanged] = useState(false)  // Новый список листов
	// const [lists, setLists] = useState<Array<ListType> | null>(null) // Список листов
	// const [colors, setColors] = useState<Array<ColorType> | null>(null) // список цветов
	const [selectedListId, setSelectedListId] = useState<string | null>(null) // Выбранный лист
	const [active, setActive] = useState(false) // Активный пункт sidebar "Все" или нет
	let navigate = useNavigate()

	// -------------

	const { getLists, getColors } = useActions()

	const lists = useTypedSelector(state => state.lists)
	const colors = useTypedSelector(state => state.colors)



	useEffect(() => {
		getLists()
		getColors()
	}, [])


	// // Получаем данные о цветах только при первом рендеринге
	// useEffect(() => {
	// 	axios.get('http://localhost:3001/colors').then(({ data }) => {
	// 		setColors(data)
	// 	})
	// 		.catch(() => {
	// 			if (!lists) {
	// 				alert("Для полноценной работы приложения необходимо запустить json-server. Для этого выполните 'npm run fake-server' или 'yarn fake-server'")
	// 			}
	// 		})
	// }, [])


	// // Следим за изменением листов
	// useEffect(() => {
	// 	axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
	// 		setLists(data)
	// 	})
	// 	setIsListsChanged(false)

	// }, [isListsChanged])


	// // Определяем выбранный лист
	// let pathname = useLocation().pathname;
	// useEffect(() => {
	// 	let listId = pathname.split('lists/')[1]
	// 	if (listId) {
	// 		setSelectedListId(+listId)
	// 	} else if (pathname === '/') {
	// 		setActive(true)

	// 	}
	// }, [pathname, lists])


	// Делаем выбранный лист активным
	const chooseActive = (id: string | null) => {
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
					onUpdateLists={() => { }}
				/>
				{lists &&
					<List
						lists={lists}
						isRemovableItem={true}
						selectedListId={selectedListId}
						active={active}
						onClick={() => { }}
						onClickItem={chooseActive}
						onUpdateLists={setIsListsChanged}
					/>
				}
				<AddList
					lists={lists}
					colors={colors}
					onAddList={setIsListsChanged}
				/>
			</div>
			{/* <div className="todo__tasks">
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
			</div> */}
		</div>
	);
}

export default App;
