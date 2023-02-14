import styles from './Tasks.module.scss'
import penSvg from '../../assets/img/pen.svg'
import { ReactComponent as CheckSvg } from '../../assets/img/check.svg'

const Tasks = () => {

	return (
		<div className={styles.tasks}>
			<h2 className={styles.tasks__title}>Radiiiiy<img src={penSvg} alt='edit' className={styles.tasks__pen} /></h2>

			<div className={styles.tasks__items}>
				<div className={styles.tasks__items_row}>
					<div className={styles.checkbox}>
						<input id='chek' type='checkbox' />
						<label htmlFor="chek"><CheckSvg className={styles.checkSvg} /></label>
					</div>
					<input value={'Учииитьсяяяяя!!!!!!!'}></input>
				</div>
			</div>
		</div >
	)
}

export default Tasks;
