import { useState } from "react";
import addSvg from '../../assets/img/add.svg';
import List from "../List/List";
import { ListType } from "../../redux/lists-reducer";
import AddListForm from './AddListForm/AddListForm';
import { ColorType } from "../../redux/color-reducer";



type PropsType = {
	lists: Array<ListType> | null
	colors: Array<ColorType> | null
	onAddList: (bool: boolean) => void

}


const AddList = (props: PropsType) => {
	const [visibleAddListForm, setVisibleAddListForm] = useState(false)

	return (
		<div>
			<List
				lists={null}
				title={'Добавить список'}
				img={addSvg}
				isRemovableItem={false}
				selectedListId={null}
				active={false}
				onClick={() => setVisibleAddListForm(true)}
				onClickItem={() => { }}
				onUpdateLists={() => { }}
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

