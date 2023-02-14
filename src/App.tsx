import List from './components/List/List';
import listSvg from './assets/img/list2.svg';
import AddList from './components/AddList/AddList';
import { useState } from 'react';
import DB from './assets/db.json';
import Tasks from './components/Tasks/Tasks';


export type ListType = {
	id: number
	name: string
	colorId: number
	colorHex?: string
}
type TaskType = {
	id: number
	listId: number
	text: string
	completed: boolean
}
type ColorType = {
	id: number
	hex: string
	name: string
}
export type StateType = {
	lists: Array<ListType>
	tasks: Array<TaskType>
	colors: Array<ColorType>
}


function App() {

	const state: StateType = DB
	state.lists.map((i) => {
		i.colorHex = state.colors.filter(color => color.id === i.colorId)[0].hex;
	})

	const [lists, setLists] = useState(state.lists);

	return (
		<div className="todo">
			<div className="todo__sidebar">
				<List setLists={() => { }} lists={null} title='Все задачи' img={listSvg} isRemovable={false} onClick={() => { }} isHoverOpacityEffect={false} />
				<List setLists={setLists} lists={lists} title='' img='' isRemovable={true} onClick={() => { }} isHoverOpacityEffect={false} />
				<AddList lists={lists} setLists={setLists} />
			</div>
			<div className="todo__tasks">
				<Tasks />
			</div>
		</div>
	);
}

export default App;
