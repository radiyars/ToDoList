import List, { ItemsType } from './components/List/List';
import { getRandomColor } from './commonFunctions/getRandomColor';

import listSvg from './assets/img/list2.svg'
import addSvg from './assets/img/add.svg'

function App() {

	let a: Array<ItemsType> = [
		{ active: false, color: '', img: listSvg, title: 'Все задачи', isRemovable: false },
		{ active: true, color: getRandomColor(), img: '', title: 'Почистить зубы', isRemovable: false },
		{ active: false, color: getRandomColor(), img: '', title: 'Помыть посуду', isRemovable: false },
		{ active: false, color: getRandomColor(), img: '', title: 'Поиграть с детьми', isRemovable: false },
		{ active: false, color: '', img: addSvg, title: 'Добавить список', isRemovable: false },
	]

	return (
		<div className="todo">
			<div className="todo__sidebar">
				<List items={a} />
			</div>
			<div className="todo__tasks">

			</div>
		</div>
	);
}

export default App;
