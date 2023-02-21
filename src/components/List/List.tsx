import axios from 'axios';
import classNames from "classnames";
import { useNavigate } from 'react-router-dom';
import { ListTypeArray } from "../../App";
import { ReactComponent as RemoveSvg } from "../../assets/img/close.svg";
import Badge from "../Badge/Badge";
import styles from "./List.module.scss";



type PropsType = {
	lists: ListTypeArray | null
	title?: string
	img?: string
	isRemovableItem: boolean
	selectedListId: number | null
	active: boolean
	onClick: () => void
	onClickItem: (item: number | null) => void
	onUpdateLists: (bool: boolean) => void
}


const List = (props: PropsType) => {
	let navigate = useNavigate()


	//  Удаляем лист из списка
	const removeList = (id: number) => {
		axios
			.delete('http://localhost:3001/lists/' + id)
			.then(() => {
				navigate('/')
				props.onUpdateLists(true)
			})
	}


	return (
		< ul className={styles.list} onClick={props.onClick}>
			{!!props.lists ? props.lists.map((item, index) => {
				return (
					<li key={index}
						onClick={() => props.onClickItem(item.id)}
						className={classNames({ [styles.active]: props.active ? '' : props.selectedListId === item.id })}>
						<i>
							{<div className={styles.list__badge}>
								<Badge onClick={() => { }} color={!!item.color ? item.color.hex : ''} className='' />
							</div>}
						</i>
						<span>{item.name}{item.tasks.length > 0 && ` (${item.tasks.length})`}</span>
						{props.isRemovableItem && <RemoveSvg className={styles.list__remove} onClick={() => { removeList(item.id) }} />}
					</li>
				)
			}
			) :
				<li onClick={() => props.onClickItem(0)}
					className={props.active ? styles.active : ''}>
					<i>	{<img src={props.img} alt='Список'></img>}</i>
					<span>{props.title}</span>
				</li>
			}
		</ ul >
	)
}

export default List