import { useEffect, useState } from 'react'
import { useActions } from '../../../hooks/useAction'
import styles from './ListName.module.scss'
import { ListType } from '../../../types/types'


type PropsType = {
	list: ListType | null
}

const ListName = (props: PropsType) => {

	const [editMode, setEditMode] = useState(false)
	const [newListName, setNewListName] = useState<string | null>('')
	const { renameList } = useActions()


	useEffect(() => {
		if (props.list) {
			setNewListName(props.list.name)
		}
	}, [props.list])


	// Меняем название листа
	const EditListName = () => {
		setEditMode(false)

		if (newListName) {
			if (props.list) {
				renameList(props.list._id, newListName)
			}
		}
	}


	return (
		<div className='list'>

			{!editMode &&

				< span className={styles.list__name} style={{ color: props.list ? props.list.color.hex : 'black' }} onClick={() => setEditMode(true)} >
					{props.list && props.list.name}
				</span >
			}

			{
				editMode &&
				<input className={styles.list__name}
					autoFocus={true}
					value={newListName ? newListName : ''}
					placeholder="Название списка"
					onChange={(e) => setNewListName(e.target.value)}
					onBlur={EditListName} />
			}
		</div>
	)
}

export default ListName
