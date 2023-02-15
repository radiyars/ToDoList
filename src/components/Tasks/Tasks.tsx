import styles from './Tasks.module.scss'
import penSvg from '../../assets/img/pen.svg'
import { ReactComponent as CheckSvg } from '../../assets/img/check.svg'
import { ListType } from '../../App'

type PropsType = {
	list: ListType
}

const Tasks = (props: PropsType) => {

	return (
		<div className={styles.tasks}>
			<h2 className={styles.tasks__title}>{props.list.name}<img src={penSvg} alt='edit' className={styles.tasks__pen} /></h2>

			<div className={styles.tasks__items}>
				{
					props.list.tasks.map(task => (
						<div key={task.id} className={styles.tasks__items_row}>
							<div className={styles.checkbox}>
								<input id={`task-${task.id}`} type='checkbox' />
								<label htmlFor={`task-${task.id}`}><CheckSvg className={styles.checkSvg} /></label>
							</div>
							<input readOnly value={task.text}></input>
						</div>
					)
					)
				}








			</div>
		</div >
	)
}

export default Tasks;
