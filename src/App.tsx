import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import listSvg from './assets/img/list2.svg'
import AddList from './components/AddList/AddList'
import List from './components/List/List'
import Tasks from './components/Tasks/Tasks'
import { useActions } from './hooks/useAction'
import { useTypedSelector } from './hooks/useTypedSelector'


function App() {

	const [selectedListId, setSelectedListId] = useState<string | null>(null) // Выбранный лист
	const [active, setActive] = useState(false) // Активный пункт sidebar "Все" или нет
	const [listsChanged, setListsChanged] = useState(false)
	const [menuActive, setMenuActive] = useState(false)

	let navigate = useNavigate()


	const { getLists, getColors } = useActions()

	const lists = useTypedSelector(state => state.lists)


	useEffect(() => {
		getLists()
		getColors()
	}, [])


	// Редирект при удалении листа
	useEffect(() => {
		if (listsChanged) {
			if (lists.length) {
				chooseActive(lists[lists.length - 1]._id)
			}
			else {
				navigate('/')
			}
			setListsChanged(false)
		}
	}, [listsChanged])


	// Определяем выбранный лист
	let pathname = useLocation().pathname;
	useEffect(() => {
		let listId = pathname.split('lists/')[1]
		if (listId) {
			setSelectedListId(listId)
		} else if (pathname === '/') {
			setActive(true)

		}
	}, [pathname, lists])


	// Делаем выбранный лист активным
	const chooseActive = (id: string | null) => {
		setSelectedListId(id)
		setActive(false)
		navigate(`/lists/${id}`)
		// if (menuActive) {
		// 	setMenuActive(false)
		// }
	}

	let activeMenuStyle = menuActive ? 'active' : ''

	return (
		<div className='container' >
			<div className={`todo ${activeMenuStyle}`} >
				<div className={`todo__sidebar sidebar  ${activeMenuStyle}`}>
					<div className={`sidebar__burger ${activeMenuStyle}`} onClick={() => { setMenuActive(!menuActive) }}>
						<span></span>
					</div>

					<div className={`sidebar__body ${menuActive ? 'active' : ''}`} >
						<List
							lists={null}
							title='Все задачи'
							img={listSvg}
							isRemovableItem={false}
							selectedListId={selectedListId}
							active={active}
							onClick={() => { setActive(true) }}
							onClickItem={(id) => { navigate(`/`) }}
						/>

						{lists &&
							<List
								lists={lists}
								isRemovableItem={true}
								selectedListId={selectedListId}
								active={active}
								onClick={() => { }}
								onClickItem={chooseActive}
								setListsChanged={setListsChanged}
							/>
						}

						<AddList setListsChanged={setListsChanged} />
					</div>
				</div>
				<div className={`todo__tasks ${activeMenuStyle}`}>

					<Routes >
						<Route path='/' element=
							{lists &&
								lists.map(list => (
									<Tasks
										key={list._id}
										list={list}
										withoutEmpty={true} />
								))
							}
						/>

						<Route path='/lists/:id' element=
							{lists && selectedListId &&
								<Tasks
									key={0}
									list={lists.find(i => i._id === selectedListId) || null}
									withoutEmpty={false} />}
						/>
					</Routes>

				</div>
			</div >
		</div>
	);
}

export default App;
