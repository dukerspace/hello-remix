import queryString from 'query-string'
import api from '~/services/api'
import { IUserSession } from '~/types/auth'
import { IWalletViewDto } from '~/types/wallet'
import { IResponseData, IResponsePaginate } from '~/utils/response'

export const getWallets = async (
	session: IUserSession,
	page: number,
	limit: number
): Promise<IResponsePaginate<IWalletViewDto[]>> => {
	const params = {
		page: page,
		limit: limit
	}

	const query = queryString.stringify(params, {
		skipNull: true
	})
	const res = await api.get(`/v1/wallets?${query}`, {
		headers: {
			Authorization: `Bearer ${session.token}`
		}
	})
	return res.data
}

export const getWalletById = async (
	session: IUserSession,
	walletId: string
): Promise<IResponseData<IWalletViewDto>> => {
	const res = await api.get(`/v1/wallets/${walletId}`, {
		headers: {
			Authorization: `Bearer ${session.token}`
		}
	})
	return res.data
}

export const getTopCategory = async (session: IUserSession, walletId: string) => {
	const res = await api.get(`/v1/wallets/${walletId}/categories/top`, {
		headers: {
			Authorization: `Bearer ${session.token}`
		}
	})
	return res.data
}
