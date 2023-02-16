
import styles from './AddTasks.module.scss'
import { ReactComponent as AddSvg } from '../../../assets/img/add.svg'

type PropsType = {

}

const AddTasks = (props: PropsType) => {


	return (
		<div className={styles.addTask}>
			<div className={styles.addTask__new}>
				<AddSvg className={styles.addTask__addSvg} />
				<span>Новая задача</span>
			</div>
			<div className={styles.addTask__form}>
				<button className={styles.addTask__button}>Добавить</button>
				<button className={styles.addTask__button_gray}>отмена</button>
			</div>
		</div>
	)
}

export default AddTasks;
