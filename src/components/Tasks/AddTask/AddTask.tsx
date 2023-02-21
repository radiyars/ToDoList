import axios from 'axios';
import { useEffect, useState } from 'react';
import { ListType } from '../../../App';
import { ReactComponent as AddSvg } from '../../../assets/img/add.svg';
import styles from './AddTask.module.scss';


type PropsType = {
	list: ListType | null
	onUpdateLists: (bool: boolean) => void
}

const AddTask = (props: PropsType) => {

	const [hiddenAddTaskForm, setHiddenAddTaskForm] = useState(true)
	const [inputValue, setInputValue] = useState('')
	const [isLoading, setIsLoading] = useState(false) // ожидание завершения запроса


	// Прячем форму создания новой задачи
	useEffect(() => {
		setHiddenAddTaskForm(true)
	}, [props.list && props.list.id])

	const toggleFormVisible = () => {
		setHiddenAddTaskForm(!hiddenAddTaskForm)
		setInputValue('')
	}

	// Добавляем новую задачу
	const AddTask = () => {
		if (!inputValue) {
			alert('Введите название списка!')
			return
		}
		if (props.list) {
			setIsLoading(true)
			axios
				.post('http://localhost:3001/tasks/',
					{
						'listId': props.list.id,
						'text': inputValue,
						'completed': false
					}
				)
				.then(() => {
					toggleFormVisible()
					props.onUpdateLists(true)

				})
				.catch(() => {
					alert('Ошибка при добавлении задачи!')
				})
				.finally(() => {
					setIsLoading(false)
				})
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
