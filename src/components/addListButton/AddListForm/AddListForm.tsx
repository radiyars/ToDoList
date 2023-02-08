import Badge from "../../Badge/Badge"
import s from "./AddListForm.module.scss"

type ColorType = {
	id: number
	hex: string
	name: string
}

type PropsType = {
	colors: Array<ColorType>
}

const AddListForm = (props: PropsType) => {
	return (
		<div className={s.addListForm}>
			<input className="field" type="text" placeholder="Название списка" />
			<div className="colors">
				<Badge color={props.colors[0].hex} />
			</div>
			<button className={`button ${s.button}`}>Добавить</button>
		</div >
	)
}

export default AddListForm