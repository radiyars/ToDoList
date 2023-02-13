import { ListType } from "../../App"
import Badge from "../Badge/Badge"
import styles from "./List.module.scss"




type PropsType = {

	lists: Array<ListType> | null
	title: string
	img: string
	isRemovable: boolean
	isHoverOpacityEffect: boolean // opacity <> 1 при наведении на элемент
	onClick: () => void
}


const List = (props: PropsType) => {
	return (
		< ul className={styles.list} onClick={props.onClick}>
			{!!props.lists ? props.lists.map((item, index) => {
				return (
					<li key={index}
						// className={`${item.active && styles.list_active} ${props.isHoverOpacityEffect && styles.list_opacityEffect}`}>
						className={`${props.isHoverOpacityEffect && styles.list_opacityEffect}`}>
						<i>
							{<div className={styles.list__badge}>
								<Badge onClick={() => { }} color={!!item.colorHex ? item.colorHex : ''} className='' />
							</div>}
						</i>
						<span>{item.name}</span>
					</li>
				)
			}
			) :
				<li key={0}
					// className={`${item.active && styles.list_active} ${props.isHoverOpacityEffect && styles.list_opacityEffect}`}>
					className={`${props.isHoverOpacityEffect && styles.list_opacityEffect}`}>
					<i>	{<img src={props.img} alt='Меню'></img>}</i>
					<span>{props.title}</span>
				</li>
			}
		</ ul >
	)
}

export default List