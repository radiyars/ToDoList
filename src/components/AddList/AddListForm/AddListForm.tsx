import { useState } from 'react'
import { ReactComponent as CloseSvg } from '../../../assets/img/close2.svg'
import { useActions } from '../../../hooks/useAction'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Badge from "../../Badge/Badge"
import styles from './AddListForm.module.scss'


type PropsType = {
	setListsChanged: (listsChanged: boolean) => void
	setVisibleAddListForm: (visibleAddListForm: boolean) => void
}

const AddListForm = (props: PropsType) => {

	const [selectedColor, setSelectedColor] = useState(1) // выбранный цвет
	const [inputValue, setListName] = useState('') // имя нового списка
	const [isLoading, setIsLoading] = useState(false) // ожидание завершения запроса

	const colors = useTypedSelector(state => state.colors)
	const { postList } = useActions()


	// Действия при закрытии формы создания нового листа
	const onClose = () => {
		setListName('')
		setSelectedColor(1)
		props.setVisibleAddListForm(false)
	}


	// Добавляем новый лист
	const addNewList = async () => {
		if (!inputValue) {
			alert('Введите название списка!')
			return
		}
		setIsLoading(true)
		await postList(inputValue, colors[selectedColor - 1])
		props.setListsChanged(true)
		setIsLoading(false)
		onClose()
	}


	return (
		<div className={styles.addListForm}>
			<CloseSvg onClick={onClose} className={styles.addListForm__closeSvg} />
			<input className={`field`} type="text" value={inputValue} placeholder="Название списка" onChange={(e) => setListName(e.target.value)} />
			<div className={styles.addListForm__colors}>
				{!!colors &&
					colors.map(item => (
						< Badge
							className={`${selectedColor === item.colorId && styles.active} ${styles.bigBadge}`}
							onClick={() => { setSelectedColor(item.colorId) }}
							color={item.hex}
							key={item.colorId} />
					))
				}
			</div>
			<button
				className={`button`}
				disabled={isLoading}
				onClick={addNewList}>
				{isLoading ? 'Добавление...' : 'Добавить'}
			</button>
		</div >
	)
}

export default AddListForm