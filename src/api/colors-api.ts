import { ColorType } from '../redux/color-reducer'
import { instance } from './api'


export const colorsAPI = {

	getColors() {
		return instance.get<Array<ColorType>>(`/colors`)
			.then(response => response.data);
	},

}

