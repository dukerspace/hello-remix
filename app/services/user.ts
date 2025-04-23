import api from '~/services/api'
import { IUserCreateDto } from '~/types/user'

export const createUser = async (data: IUserCreateDto) => {
	return await api.post(`/v1/users`, data)
}
