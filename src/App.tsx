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
	const [selectedListId, setSelectedListId] = useState<string | null>(null) // Выбранный лист
	const [active, setActive] = useState(false) // Активный пункт sidebar "Все" или нет
	let navigate = useNavigate()


	const { getLists, getColors } = useActions()

	const lists = useTypedSelector(state => state.lists)


	useEffect(() => {
		getLists()
		getColors()
	}, [])


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
				/>
			</div>
			<div className="todo__tasks">
				<Routes >
					<Route path='/' element=
						{lists &&
							lists.map(list => (
								<Tasks
									key={list._id}
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
								list={lists.find(i => i._id === selectedListId) || null}
								onUpdateLists={setIsListsChanged}
								withoutEmpty={false} />}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
