export interface IUserCreateDto {
	first_name: string
	last_name: string
	username: string
	email: string
	password: string
	confirm_password: string
}

export interface IUserViewDto {
	id: string
	username: string
	email: string
}

export interface IUserErrorDto {
	first_name?: string
	last_name?: string
	username?: string
	email?: string
	password?: string
	confirm_password?: string
}
