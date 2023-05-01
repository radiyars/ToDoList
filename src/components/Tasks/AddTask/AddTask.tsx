import { useEffect, useState } from 'react'
import { ReactComponent as AddSvg } from '../../../assets/img/add.svg'
import { useActions } from '../../../hooks/useAction'
import styles from './AddTask.module.scss'
import { ListType } from '../../../types/types'


type PropsType = {
	list: ListType | null
}

const AddTask = (props: PropsType) => {

	const [hiddenAddTaskForm, setHiddenAddTaskForm] = useState(true)
	const [inputValue, setInputValue] = useState('')
	const [isLoading, setIsLoading] = useState(false) // ожидание завершения запроса

	const { patchListsTasks } = useActions()


	// Прячем форму создания новой задачи
	useEffect(() => {
		setHiddenAddTaskForm(true)
	}, [props.list && props.list._id])

	const toggleFormVisible = () => {
		setHiddenAddTaskForm(!hiddenAddTaskForm)
		setInputValue('')
	}

	// Добавляем новую задачу
	const AddTask = async () => {
		if (!inputValue) {
			alert('Введите название задачи!')
			return
		}

		if (props.list && props.list.tasks) {
			setIsLoading(true)
			await patchListsTasks(props.list._id,
				[...props.list.tasks, {
					'text': inputValue,
					'completed': false
				}]
			)
			setIsLoading(false)
			toggleFormVisible()
		}
	}



	return (
		<div className={styles.addTask}>
			{hiddenAddTaskForm
				?
				<div className={styles.addTask__new} onClick={toggleFormVisible} >
					<AddSvg className={styles.addTask__addSvg} />
					<span>Новая задача</span>
				</div>
				:
				<div className={styles.addTask__form}>
					<input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						className={`field`}
						placeholder='Название задачи' />
					<button
						onClick={AddTask}
						disabled={isLoading}
						className={`button ${styles.addTask__buttonAdd}`}>
						{isLoading ? 'Добавление' : 'Добавить'}</button>
					<button
						onClick={toggleFormVisible}
						className={`button ${styles.addTask__buttonCansel}`}>Отмена</button>
				</div>}
		</div>
	)
}

export default AddTask;
