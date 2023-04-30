import { useState } from 'react'
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
	const [checked, setChecked] = useState(false)

	const { patchListsTasks } = useActions()


	// useEffect(() => {
	// 	if (props.task) {
	// 		setNewTaskText(props.task.text)
	// 		setChecked(props.task.completed)
	// 	}
	// }, [props.task])


	// Меняем название задачи
	const EditTaskName = () => {
		setEditTaskMode(false)
		if (newTaskText) {
			if (props.task && props.list) {
				props.list.tasks[props.index].text = newTaskText
				patchListsTasks(props.list._id, props.list.tasks)
			}
		}
	}


	// Удаляем задачу
	const RemoveTask = () => {
		if (props.task && props.list) {
			props.list.tasks.splice(props.index, 1)
			patchListsTasks(props.list._id, props.list.tasks)
		}
	}


	// Выполняем задачу (checkbox)
	const onChecked = () => {
		if (props.task && props.list) {
			props.list.tasks[props.index].completed = !props.list.tasks[props.index].completed
			patchListsTasks(props.list._id, props.list.tasks)
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
					value={newTaskText}
					placeholder="Название задачи"
					onChange={(e) => setNewTaskText(e.target.value)}
					onBlur={EditTaskName}
					className={styles.task__form} />
			}

			<CloseSvg className={styles.task__closeSvg} onClick={RemoveTask} />
		</div>
	)
}


export default Task;
