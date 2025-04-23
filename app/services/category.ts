import api from '~/services/api'

export const getAllCategory = async () => {
	const res = await api.get(`/v1/categories`)
	return res.data
}
