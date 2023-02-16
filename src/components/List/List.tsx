import { ListType, ListTypeArray } from "../../App";
import { ReactComponent as RemoveSvg } from "../../assets/img/close.svg";
import Badge from "../Badge/Badge";
import styles from "./List.module.scss";
import axios from 'axios';
import classNames from "classnames";



type PropsType = {

	lists: ListTypeArray | null
	title: string
	img: string
	isRemovableItem: boolean
	selectedListId: number | null
	onClick: () => void
	onClickItem: (item: number | null) => void
	onUpdateLists: (bool: boolean) => void
}


const List = (props: PropsType) => {

	//  Удаляем лист из списка
	const removeList = (id: number) => {
		if (window.confirm('Вы действительно хотите удалить список?')) {
			axios
				.delete('http://localhost:3001/lists/' + id)
				.then(() => {
					props.onUpdateLists(true)
				})
		}
	}


	return (
		< ul className={styles.list} onClick={props.onClick}>
			{!!props.lists ? props.lists.map((item, index) => {
				return (
					<li key={index}
						onClick={() => props.onClickItem(item.id)}
						className={classNames({ [styles.list_active]: props.selectedListId && props.selectedListId === item.id })}>
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
				<li key={0}
					className={``}>
					<i>	{<img src={props.img} alt='Меню'></img>}</i>
					<span>{props.title}</span>
				</li>
			}
		</ ul >
	)
}

export default List