import axios from 'axios';
import { useEffect, useState } from 'react';
import { ListType } from '../../App';
import { ReactComponent as CheckSvg } from '../../assets/img/check.svg';
import styles from './Tasks.module.scss';
import AddTask from './AddTask/AddTask';


type PropsType = {
	list: ListType | null
	onUpdateLists: (bool: boolean) => void
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
				<span className={styles.tasks__title} onClick={() => setEditMode(true)} >
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
				{props.list && !props.list.tasks.length && <h2>Задачи отсутствуют</h2>}
				{props.list && props.list.tasks.map(
					task => (
						<div key={task.id} className={styles.tasks__items_row}>
							<div className={styles.checkbox}>
								<input id={`task-${task.id}`} type='checkbox' />
								<label htmlFor={`task-${task.id}`}><CheckSvg className={styles.checkSvg} /></label>
							</div>
							<input readOnly value={task.text}></input>
						</div>
					)
				)}
				<div className={styles.tasks__form}>
					<AddTask list={props.list} onUpdateLists={props.onUpdateLists} />
				</div>
			</div>
		</div >
	)
}

export default Tasks;
