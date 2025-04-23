import { IUserViewDto } from './user'

export type ILogin = {
	username: string
	password: string
}

export interface IUserSession {
	token: string
	user: IUserViewDto
}
