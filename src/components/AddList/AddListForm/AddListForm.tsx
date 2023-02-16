import axios from 'axios';
import { useEffect, useState } from 'react';
import { ColorTypeArray, ListType } from "../../../App";
import { ReactComponent as CloseSvg } from '../../../assets/img/close2.svg';
import Badge from "../../Badge/Badge";
import styles from './AddListForm.module.scss';



type PropsType = {
	colors: ColorTypeArray | null
	setVisibleAddListForm: (visibleAddListForm: boolean) => void
	onAddList: (bool: boolean) => void

}


const AddListForm = (props: PropsType) => {

	const [selectedColor, setSelectedColor] = useState(1) // выбранный цвет
	const [inputValue, setListName] = useState('') // имя нового листа
	const [isLoading, setIsLoading] = useState(false) // ожидание завершения запроса


	// При первом рендеринге пока данные не пришли мы не можем отобразить выбранный цвет.
	// После рендеринга при получении массива цветов получаем цвет выбранного элемента
	useEffect(() => {
		if (!!props.colors) {
			setSelectedColor(props.colors[0].id)
		}
	}, [props.colors])


	// Действия при закрытии формы создания нового листа
	const onClose = () => {
		setListName('')
		setSelectedColor(Array.isArray(props.colors) ? props.colors[0].id : 1)
		props.setVisibleAddListForm(false)
	}

	// Добавляем новый лист
	const addNewList = () => {
		if (!inputValue) {
			alert('Введите название списка!')
			return
		}

		setIsLoading(true)
		axios
			.post('http://localhost:3001/lists',
				// Id добавляется автотомаически в json-server
				{ name: inputValue, colorId: selectedColor })
			.then(() => { // после удачного запроса выполняем следующие операции:
				// После того, как добавили в БД новый лист,
				// обновляем наш lists
				props.onAddList(true)
				onClose()

			})
			.finally(() => { // При любом (удачном или неудачном) завершении запроса считаем что "Добавление завершено"
				setIsLoading(false)
			})

	}

	return (
		<div className={styles.addListForm}>
			<CloseSvg onClick={onClose} className={styles.addListForm__closeSvg} />
			<input className={styles.addListForm__field} type="text" value={inputValue} placeholder="Название списка" onChange={(e) => setListName(e.target.value)} />
			<div className={styles.addListForm__colors}>
				{!!props.colors &&
					props.colors.map(item => (
						< Badge
							className={`${selectedColor === item.id && styles.active} ${styles.bigBadge}`}
							onClick={() => { setSelectedColor(item.id) }}
							color={item.hex}
							key={item.id} />
					))
				}
			</div>
			<button className={`button ${styles.addListForm__button}`} onClick={addNewList}>
				{isLoading ? 'Добавление...' : 'Добавить'}
			</button>
		</div >
	)
}

export default AddListForm