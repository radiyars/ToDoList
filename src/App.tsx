import List, { ItemsType } from './components/List/List';
import { getRandomColor } from './commonFunctions/getRandomColor';

import listSvg from './assets/img/list2.svg'
import AddList from './components/addListButton/AddList';

import DB from './assets/db.json'

function App() {

	const sidebarHead: Array<ItemsType> = [
		{ active: false, color: '', img: listSvg, title: 'Все задачи' },
	]



	const state: Array<ItemsType> = [
		{ active: true, color: getRandomColor(), img: '', title: 'Почистить зубы' },
		{ active: false, color: getRandomColor(), img: '', title: 'Помыть посуду' },
		{ active: false, color: getRandomColor(), img: '', title: 'Поиграть с детьми' },
	]

	return (
		<div className="todo">
			<div className="todo__sidebar">
				<List items={sidebarHead} isRemovable={false} onClick={() => { }} />
				<List items={state} isRemovable={true} onClick={() => { }} />
				<AddList colors={DB.colors} />
			</div>
			<div className="todo__tasks">

			</div>
		</div>
	);
}

export default App;
