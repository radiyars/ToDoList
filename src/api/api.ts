import axios from "axios"

export const instance = axios.create({
	// withCredentials: true,
	baseURL: 'https://todo-list-server-silk.vercel.app/api/',
});


export type ResponseType<D = {}> = {
	data: D
}

