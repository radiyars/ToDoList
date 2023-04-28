import classNames from "classnames"
import { useNavigate } from 'react-router-dom'
import { ReactComponent as RemoveSvg } from "../../assets/img/close.svg"
import { useActions } from '../../hooks/useAction'
import { ListType } from '../../redux/lists-reducer'
import Badge from "../Badge/Badge"
import styles from "./List.module.scss"



type PropsType = {
	lists: Array<ListType> | null
	title?: string
	img?: string
	isRemovableItem: boolean
	selectedListId: string | null
	active: boolean
	onClick: () => void
	onClickItem: (item: string | null) => void
	onUpdateLists: (bool: boolean) => void
}


const List = (props: PropsType) => {

	const { deleteList } = useActions()

	let navigate = useNavigate()

	//  Удаляем лист из списка
	const removeList = async (id: string | null) => {
		if (id) {
			await deleteList(id)
			navigate('/')
		}
	}


	return (
		< ul className={styles.list} onClick={props.onClick}>
			{!!props.lists ? props.lists.map((item, index) => {
				return (
					<li key={index}
						onClick={() => props.onClickItem(item._id)}
						className={classNames({ [styles.active]: props.active ? '' : props.selectedListId === item._id })}>
						<i>
							{<div className={styles.list__badge}>
								<Badge onClick={() => { }} color={!!item.color ? item.color.hex : ''} className='' />
							</div>}
						</i>
						<span>{item.name}{item.tasks.length > 0 && ` (${item.tasks.length})`}</span>
						{props.isRemovableItem && <RemoveSvg className={styles.list__remove} onClick={() => { removeList(item._id) }} />}
					</li>
				)
			}
			) :
				<li onClick={() => props.onClickItem('')}
					className={props.active ? styles.active : ''}>
					<i>	{<img src={props.img} alt='Список'></img>}</i>
					<span>{props.title}</span>
				</li>
			}
		</ ul >
	)
}

export default List
