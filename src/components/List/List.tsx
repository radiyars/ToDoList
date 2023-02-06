import s from "./List.module.scss"
import listSvg from '../../assets/img/list2.svg'

export type ItemsType = {
	color: string
	title: string
	active: boolean
}

type PropsType = {
	items: Array<ItemsType>
}


const List = (props: PropsType) => {
	return (
		< ul className={s.list} >
			{props.items.map((e) => {
				return (
					<li className={e.active ? s.active : ''}>
						<i>
							{!e.color
								? <img src={listSvg} alt='Меню'></img>
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