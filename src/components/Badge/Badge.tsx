
import s from './Badge.module.scss'

type PropsType = {
	color: string
}

const Badge = (props: PropsType) => <i className={s.badge} style={{ backgroundColor: props.color }}></i>

export default Badge