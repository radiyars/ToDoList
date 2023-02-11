import { useState } from "react";
import addSvg from '../../assets/img/add.svg';
import List, { ItemsType } from "../List/List";
import AddListForm from './AddListForm/AddListForm';

type ColorType = {
	id: number
	hex: string
	name: string
}

type PropsType = {
	colors: Array<ColorType>
}

const buttonAdd: Array<ItemsType> = [
	{ active: false, color: '', img: addSvg, title: 'Добавить список' },
]

const AddList = (props: PropsType) => {
	const [visibleAddListForm, setVisibleAddListForm] = useState(false)
	const [selectedColor, setSelectedColor] = useState(props.colors[0].id)

	return (
		<div>
			<List items={buttonAdd} isRemovable={false} onClick={() => { setVisibleAddListForm(true) }} />
			{visibleAddListForm && <AddListForm selectedColor={selectedColor} setSelectedColor={setSelectedColor} setVisibleAddListForm={setVisibleAddListForm} colors={props.colors} />}
		</div >
	)
}

export default AddList