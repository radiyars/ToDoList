import s from "./List.module.scss"

export type ItemsType = {
	color: string
	title: string
	active: boolean
	img: string
	isRemovable: boolean
}

type PropsType = {
	items: Array<ItemsType>
}


const List = (props: PropsType) => {
	return (
		< ul className={s.list} >
			{props.items.map((e, index) => {
				return (
					<li key={index} className={e.active ? s.active : ''}>
						<i>
							{!e.color
								? <img src={e.img} alt='Меню'></img>
								: <i className={s.badge} style={{ backgroundColor: e.color }}></i>}
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