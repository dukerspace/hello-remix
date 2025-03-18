export interface IResponsePaginate<T> {
	success: boolean
	data: T
	currentPage: number
	perPage: number
	total: number
}

export interface IResponseData<T> {
	success: boolean
	data?: T | null
	message?: T | null
}

export interface IErrorMessage {
	type?: string
	field?: string
	tag?: string
	message: string
}

export interface IErrorDto {
	message?: string
	success: boolean
	errors: IErrorMessage[]
}
