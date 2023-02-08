import Badge from "../Badge/Badge"

import s from "./List.module.scss"


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
		< ul className={s.list} onClick={props.onClick}>
			{props.items.map((e, index) => {
				return (
					<li key={index} className={e.active ? s.active : ''}>
						<i>
							{!e.color
								? <img src={e.img} alt='Меню'></img>
								: <Badge color={e.color} />}
						</i>
						<span>{e.title}</span>
					</li>
				)
			}
			)}
		</ ul >
	)
}

export default List