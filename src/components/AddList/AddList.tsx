import { useState } from "react"
import addSvg from '../../assets/img/add.svg'
import List from "../List/List"
import AddListForm from './AddListForm/AddListForm'



type PropsType = {
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
					setVisibleAddListForm={setVisibleAddListForm}
				/>}
		</div >
	)
}

export default AddList

