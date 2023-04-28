import axios from 'axios';
import { useEffect, useState } from 'react';
import { ReactComponent as CheckSvg } from '../../../assets/img/check.svg';
import { ReactComponent as CloseSvg } from '../../../assets/img/close.svg';
import { TaskType } from '../../../redux/lists-reducer';
import styles from './Task.module.scss';


type PropsType = {
	task: TaskType | null
	onUpdateLists: (bool: boolean) => void
}

const Task = (props: PropsType) => {

	const [editTaskMode, setEditTaskMode] = useState(false)
	const [newTaskName, setNewTaskName] = useState('')
	const [checked, setChecked] = useState(false)


	// Обновляем название задачи
	useEffect(() => {
		if (props.task) {
			setNewTaskName(props.task.text)
			setChecked(props.task.completed)
		}
	}, [props.task])


	// Меняем название задачи
	const EditTaskName = () => {
		setEditTaskMode(false)
		if (newTaskName) {
			if (props.task) {
				axios
					.patch('http://localhost:3001/tasks/' + props.task._id, {
						text: newTaskName
					})
					.then(() => {
						props.onUpdateLists(true)
					})
					.catch(() => { alert('Не удалось изменить название задачи!') })
			}
		}
	}


	// Удаляем задачу
	const RemoveTask = () => {
		if (props.task) {
			axios
				.delete('http://localhost:3001/tasks/' + props.task._id)
				.then(() => {
					props.onUpdateLists(true)

				})
				.catch(() => {
					alert('Не удалось удалить задачу!')
				})
		}
	}


	// Выполняем задачу (checkbox)
	const onChecked = () => {
		if (props.task) {
			axios
				.patch('http://localhost:3001/tasks/' + props.task._id, {
					completed: !checked
				})
				.then(() => {
					props.onUpdateLists(true)
					console.log('update!');
				})
				.catch(() => {
					alert('Не удалось выполнить задачу!')
				})
		}
	}


	return (
		<div className={styles.task} >
			{props.task &&
				<div className={styles.task__checkbox}>
					<input
						id={`task-${props.task._id}`}
						type='checkbox'
						checked={props.task.completed}
						onChange={onChecked} />
					<label htmlFor={`task-${props.task._id}`}>
						<CheckSvg className={styles.checkSvg} />
					</label>
				</div>}


			{!editTaskMode && props.task &&
				<span className={styles.task__form} onClick={() => setEditTaskMode(true)}>
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

			<CloseSvg className={styles.task__closeSvg} onClick={RemoveTask} />
		</div>
	)
}


export default Task;
