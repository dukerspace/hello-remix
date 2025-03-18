import { ILogin } from '~/types/user'
import api from './api'

export const signIn = async (data: ILogin) => {
	return await api.post(`/v1/auth/login`, data)
}
