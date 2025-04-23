import queryString from 'query-string'
import api from '~/services/api'
import { IUserSession } from '~/types/auth'
import {
	ITransactionCreateDto,
	ITransactionUpdateDto,
	ITransactionViewDto
} from '~/types/transaction'
import { IResponseData, IResponsePaginate } from '~/utils/response'

export const createTransaction = async (walletId: string, data: ITransactionCreateDto) => {
	return await api.post(`/v1/wallets/${walletId}/transactions`, data)
}

export const getTransactionByWalletId = async (
	session: IUserSession,
	walletId: string,
	date: string
): Promise<IResponsePaginate<ITransactionViewDto[]>> => {
	const params = {
		date: date
	}

	const query = queryString.stringify(params, {
		skipNull: true
	})
	const res = await api.get(`/v1/wallets/${walletId}/transactions?${query}`, {
		headers: {
			Authorization: `Bearer ${session.token}`
		}
	})
	return res.data
}

export const getTransactionById = async (
	walletId: string,
	transactionId: string
): Promise<IResponseData<ITransactionViewDto>> => {
	const res = await api.get(`/v1/wallets/${walletId}/transactions/${transactionId}`)
	return res.data
}

export const updateTransactionById = async (
	walletId: string,
	transactionId: string,
	data: ITransactionUpdateDto
) => {
	return await api.put(`/v1/wallets/${walletId}/transactions/${transactionId}`, data)
}

export const deleteTransactionById = async (walletId: string, transactionId: string) => {
	return await api.delete(`/v1/wallets/${walletId}/transactions/${transactionId}`)
}
