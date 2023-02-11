
import styles from './Badge.module.scss'
import classNames from 'classnames'

type PropsType = {
	color: string
	onClick: () => void
	className: string
}

const Badge = (props: PropsType) => <i
	onClick={props.onClick}
	className={classNames(styles.badge, props.className)}
	// className={`${styles.badge} ${props.bigSize && styles.bigSize} ${props.active && styles.active}`}
	style={{ backgroundColor: props.color }}></i>

export default Badge