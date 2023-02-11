import Badge from "../../Badge/Badge"
import closeSvg from '../../../assets/img/close2.svg'

import styles from './AddListForm.module.scss'


type ColorType = {
	id: number
	hex: string
	name: string
}

type PropsType = {
	colors: Array<ColorType>
	selectedColor: number
	setSelectedColor: (selectedColor: number) => void
	setVisibleAddListForm: (visibleAddListForm: boolean) => void
}

const AddListForm = (props: PropsType) => {
	return (
		<div className={styles.addListForm}>
			<img onClick={() => { props.setVisibleAddListForm(false) }} src={closeSvg} alt="Закрыть" className={styles.closeSvg} />
			<input className={styles.field} type="text" placeholder="Название списка" />
			<div className={styles.colors}>
				{
					props.colors.map(item => (
						< Badge
							className={`${props.selectedColor === item.id && styles.active} ${styles.bigSize}`}
							onClick={() => { props.setSelectedColor(item.id) }}
							color={item.hex}
							key={item.id} />
					))
				}
			</div>
			<button className={`button ${styles.button}`}>Добавить</button>
		</div >
	)
}

export default AddListForm