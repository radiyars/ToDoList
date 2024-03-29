import { useEffect, useState } from 'react'
import { ReactComponent as CheckSvg } from '../../../assets/img/check.svg'
import { ReactComponent as CloseSvg } from '../../../assets/img/close.svg'
import { useActions } from '../../../hooks/useAction'
import styles from './Task.module.scss'
import { ListType, TaskType } from '../../../types/types'


type PropsType = {
	list: ListType | null
	task: TaskType | null
	index: number
}

const Task = (props: PropsType) => {

	const [editTaskMode, setEditTaskMode] = useState(false)
	const [newTaskText, setNewTaskText] = useState('')

	const { patchListsTasks } = useActions()


	useEffect(() => {
		if (props.task) {
			setNewTaskText(props.task.text)
		}
	}, [props.task])


	// Меняем название задачи
	const editTaskName = () => {
		setEditTaskMode(false)
		if (newTaskText) {
			if (props.task && props.list && props.list.tasks) {
				let tasks = [...props.list.tasks]
				tasks[props.index].text = newTaskText
				patchListsTasks(props.list._id, tasks)
			}
		}
	}


	// Удаляем задачу
	const removeTask = () => {
		if (props.task && props.list && props.list.tasks) {
			let tasks = [...props.list.tasks]
			tasks.splice(props.index, 1)
			patchListsTasks(props.list._id, tasks)
		}
	}


	// Выполняем задачу (checkbox)
	const check = () => {
		if (props.task && props.list && props.list.tasks) {
			let tasks = [...props.list.tasks]
			tasks[props.index].completed = !props.task.completed
			patchListsTasks(props.list._id, tasks)
		}
	}


	return (
		<div className={styles.task} >
			{props.task &&
				<div className={styles.task__checkbox}>
					<input
						id={`task-${props.index}`}
						// id={`task-${props.task._id}`}
						type='checkbox'
						checked={props.task.completed}
						onChange={check} />
					{/* <label htmlFor={`task-${props.task._id}`}> */}
					<label htmlFor={`task-${props.index}`}>
						<CheckSvg className={styles.checkSvg} />
					</label>
				</div>}


			{!editTaskMode && props.task &&
				<span className={props.task.completed ? styles.task__form_completed : styles.task__form} onClick={() => setEditTaskMode(true)}>
					{props.task.text}
				</span>
			}

			{editTaskMode &&
				<input
					autoFocus={true}
					value={newTaskText}
					placeholder="Название задачи"
					onChange={(e) => setNewTaskText(e.target.value)}
					onBlur={editTaskName}
					className={styles.task__form} />
			}

			<CloseSvg className={styles.task__closeSvg} onClick={removeTask} />
		</div>
	)
}


export default Task;
