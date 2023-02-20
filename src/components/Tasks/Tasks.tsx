import axios from 'axios';
import { useEffect, useState } from 'react';
import { ListType } from '../../App';
import { ReactComponent as CheckSvg } from '../../assets/img/check.svg';
import AddTask from './AddTask/AddTask';
import Task from './Task/Task';
import styles from './Tasks.module.scss';


type PropsType = {
	list: ListType | null
	onUpdateLists: (bool: boolean) => void
	withoutEmpty: boolean
	key: number
}

const Tasks = (props: PropsType) => {

	const [editMode, setEditMode] = useState(false)
	const [newListName, setNewListName] = useState('')

	// Обновляем название листа для нового листа
	useEffect(() => {
		if (props.list) {
			setNewListName(props.list.name)
		}
	}, [props.list])

	const EditListName = () => {
		setEditMode(false)
		if (newListName) {
			if (props.list) {
				axios
					.patch('http://localhost:3001/lists/' + props.list.id, {
						name: newListName
					})
					.then(() => {
						props.onUpdateLists(true)
					})
					.catch(() => { alert('Не удалось изменить название списка!') })
			}
		}
	}


	return (

		<div className={styles.tasks}>

			{!editMode &&
				<span className={styles.tasks__title} style={{ color: props.list ? props.list.color.hex : 'black' }} onClick={() => setEditMode(true)} >
					{props.list && props.list.name}
				</span>
			}

			{editMode &&
				<input className={styles.tasks__title}
					autoFocus={true}
					value={newListName}
					placeholder="Название списка"
					onChange={(e) => setNewListName(e.target.value)}
					onBlur={EditListName} />
			}

			<div className={styles.tasks__items}>
				{!props.withoutEmpty && props.list && !props.list.tasks.length && <h2>Задачи отсутствуют</h2>}
				{props.list && props.list.tasks.map(
					task => (
						<Task task={task} key={task.id} onUpdateLists={props.onUpdateLists} />
					)
				)}
				<div className={styles.tasks__form}>
					<AddTask list={props.list} onUpdateLists={props.onUpdateLists} />
				</div>
			</div >
		</div >
	)
}

export default Tasks;
