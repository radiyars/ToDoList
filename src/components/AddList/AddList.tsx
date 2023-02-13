import { useState } from "react";
import addSvg from '../../assets/img/add.svg';
import List from "../List/List";
import AddListForm from './AddListForm/AddListForm';

import { ListType } from "../../App";
import DB from '../../assets/db.json';

type PropsType = {
	lists: Array<ListType>
	setLists: (lists: Array<ListType>) => void
}



const AddList = (props: PropsType) => {
	const [visibleAddListForm, setVisibleAddListForm] = useState(false)

	return (
		<div>
			<List
				lists={null}
				title={'Добавить список'}
				img={addSvg}
				isRemovable={false}
				onClick={() => {
					setVisibleAddListForm(true)
				}}
				isHoverOpacityEffect={true}
			/>
			{visibleAddListForm &&
				<AddListForm
					lists={props.lists}
					setLists={props.setLists}
					setVisibleAddListForm={setVisibleAddListForm}
					colors={DB.colors}
				/>}
		</div >
	)
}

export default AddList