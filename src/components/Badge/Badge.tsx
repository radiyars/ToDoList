
import styles from './Badge.module.scss'

type PropsType = {
	color: string
	onClick: () => void
	className: string
}

const Badge = (props: PropsType) => <i
	onClick={props.onClick}
	className={`${styles.badge} ${props.className}`}
	style={{ backgroundColor: props.color }}></i>

export default Badge