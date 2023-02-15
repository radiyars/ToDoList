import { useState } from "react";
import { ColorTypeArray, ListTypeArray } from "../../App";
import addSvg from '../../assets/img/add.svg';
import List from "../List/List";
import AddListForm from './AddListForm/AddListForm';



type PropsType = {
	lists: ListTypeArray | null
	colors: ColorTypeArray | null
	onAddList: (bool: boolean) => void

}


const AddList = (props: PropsType) => {
	const [visibleAddListForm, setVisibleAddListForm] = useState(false)

	return (
		<div>
			<List
				onRemove={() => { }}
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
					onAddList={props.onAddList}
					setVisibleAddListForm={setVisibleAddListForm}
					colors={props.colors}
				/>}
		</div >
	)
}

export default AddList