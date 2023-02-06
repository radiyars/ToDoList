import List, { ItemsType } from './components/List/List';
import { getRandomColor } from './commonFunctions/getRandomColor';

function App() {

	let a: Array<ItemsType> = [
		{ active: false, color: '', title: 'Все задачи' },
		{ active: true, color: getRandomColor(), title: 'Почистить зубы' },
		{ active: false, color: getRandomColor(), title: 'Помыть посуду' },
		{ active: false, color: getRandomColor(), title: 'Поиграть с детьми' }
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
