import { ListType } from "../../../App"
import { ReactComponent as CloseSvg } from '../../../assets/img/close2.svg'
import Badge from "../../Badge/Badge"
import styles from './AddListForm.module.scss'
import DB from '../../../assets/db.json'
import { useState } from 'react';

type ColorType = {
	id: number
	hex: string
	name: string
}

type PropsType = {
	lists: Array<ListType>
	colors: Array<ColorType>
	setVisibleAddListForm: (visibleAddListForm: boolean) => void
	setLists: (lists: Array<ListType>) => void

}


const AddListForm = (props: PropsType) => {

	const [selectedColor, setSelectedColor] = useState(DB.colors[0].id)
	const [listName, setListName] = useState('')


	const clearAddListForm = () => {
		setListName('')
		setSelectedColor(DB.colors[0].id)
		props.setVisibleAddListForm(false)
	}

	const addNewList = () => {
		clearAddListForm()
		if (!!listName) {
			props.setLists([...props.lists, {
				id: props.lists[props.lists.length - 1].id + 1,
				name: listName,
				colorId: selectedColor,
				colorHex: DB.colors.filter(c => c.id === selectedColor)[0].hex,
			}])
		}
	}

	return (
		<div className={styles.addListForm}>
			<CloseSvg onClick={clearAddListForm} className={styles.addListForm__closeSvg} />
			<input className={styles.addListForm__field} type="text" value={listName} placeholder="Название списка" onChange={(e) => setListName(e.target.value)} />
			<div className={styles.addListForm__colors}>
				{
					props.colors.map(item => (
						< Badge
							className={`${selectedColor === item.id && styles.active} ${styles.bigBadge}`}
							onClick={() => { setSelectedColor(item.id) }}
							color={item.hex}
							key={item.id} />
					))
				}
			</div>
			<button className={`button ${styles.addListForm__button}`} onClick={addNewList}>Добавить</button>
		</div >
	)
}

export default AddListForm