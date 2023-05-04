import { ListType } from '../../types/types'
import AddTask from './AddTask/AddTask'
import ListName from './ListName/ListName'
import Task from './Task/Task'
import styles from './Tasks.module.scss'


type PropsType = {
	list: ListType | null
	withoutEmpty: boolean
}

const Tasks = (props: PropsType) => {

	return (

		<div className={styles.tasks}>

			<ListName list={props.list} />

			<div className={styles.tasks__items}>
				{!props.withoutEmpty && props.list && !props.list.tasks &&
					<h2>Задачи отсутствуют</h2>}

				{props.list && props.list.tasks &&
					props.list.tasks.map(
						(task, index) => (
							<Task key={index} task={task} index={index} list={props.list} />
						)
					)}
				<div className={styles.tasks__form}>
					<AddTask list={props.list} />
				</div>
			</div >
		</div >
	)
}

export default Tasks;
