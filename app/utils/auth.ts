import { redirect } from '@remix-run/node'
import { getSession } from '~/session.server'
import { IUserSession } from '~/types/auth'

export const requireUserSession = async (request: Request) => {
	const session = await getSession(request.headers.get('Cookie'))
	const user: IUserSession = session.get('user')

	if (!user) {
		throw redirect('/auth/login')
	}

	return user
}
