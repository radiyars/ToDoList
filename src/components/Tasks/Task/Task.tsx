import axios from 'axios';
import { useEffect, useState } from 'react';
import { TaskType } from '../../../App';
import { ReactComponent as CheckSvg } from '../../../assets/img/check.svg';
import { ReactComponent as CloseSvg } from '../../../assets/img/close.svg';
import styles from './Task.module.scss';


type PropsType = {
	task: TaskType | null
	onUpdateLists: (bool: boolean) => void
	key: number
}

const Task = (props: PropsType) => {

	const [editTaskMode, setEditTaskMode] = useState(false)
	const [newTaskName, setNewTaskName] = useState('')


	// Обновляем название задачи
	useEffect(() => {
		if (props.task) {
			setNewTaskName(props.task.text)
		}
	}, [props.task])


	const EditTaskName = () => {
		setEditTaskMode(false)
		if (newTaskName) {
			if (props.task) {
				axios
					.patch('http://localhost:3001/tasks/' + props.task.id, {
						text: newTaskName
					})
					.then(() => {
						props.onUpdateLists(true)
					})
					.catch(() => { alert('Не удалось изменить название задачи!') })
			}
		}
	}


	return (
		<div key={props.key} className={styles.task}>
			{props.task &&
				<div className={styles.task__checkbox}>
					<input id={`task-${props.task.id}`} type='checkbox' />
					<label htmlFor={`task-${props.task.id}`}><CheckSvg className={styles.checkSvg} /></label>
				</div>}


			{!editTaskMode && props.task &&
				<span onClick={() => setEditTaskMode(true)} className={styles.task__form}>
					{props.task.text}
				</span>
			}

			{editTaskMode &&
				<input
					autoFocus={true}
					value={newTaskName}
					placeholder="Название задачи"
					onChange={(e) => setNewTaskName(e.target.value)}
					onBlur={EditTaskName}
					className={styles.task__form} />
			}

			<CloseSvg className={styles.task__closeSvg} />
		</div>
	)
}


export default Task;
