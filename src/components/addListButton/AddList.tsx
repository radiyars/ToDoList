import { useState } from "react";
import addSvg from '../../assets/img/add.svg';
import List, { ItemsType } from "../List/List";
import AddListForm from './AddListForm/AddListForm';
import s from './AddList.module.scss'

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
	const [visibleAddListForm, setVisibleAddListForm] = useState(true);

	return (
		<div>
			<List items={buttonAdd} isRemovable={false} onClick={() => { setVisibleAddListForm(true) }} />
			{visibleAddListForm && <AddListForm colors={props.colors} />}
		</div >
	)
}

export default AddList