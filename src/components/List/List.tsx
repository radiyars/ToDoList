import Badge from "../Badge/Badge"

import styles from "./List.module.scss"


export type ItemsType = {
	color: string
	title: string
	active: boolean
	img: string
}

type PropsType = {
	items: Array<ItemsType>
	isRemovable: boolean
	onClick: () => void
}


const List = (props: PropsType) => {
	return (
		< ul className={styles.list} onClick={props.onClick}>
			{props.items.map((item, index) => {
				return (
					<li key={index} className={item.active ? styles.active : ''}>
						<i>
							{!item.color
								? <img src={item.img} alt='Меню'></img>
								: <div className={styles.badge}>
									<Badge onClick={() => { }} color={item.color} className='' />
								</div>}
						</i>
						<span>{item.title}</span>
					</li>
				)
			}
			)}
		</ ul >
	)
}

export default List