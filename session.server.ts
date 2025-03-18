import { createCookieSessionStorage } from '@remix-run/node'
import { IUserSession } from './types/auth'

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '__session',
		secure: process.env.NODE_ENV === 'production',
		secrets: ['your-secret'], // Replace with an environment variable
		sameSite: 'lax',
		path: '/',
		httpOnly: true
	}
})

export const { getSession, commitSession, destroySession } = sessionStorage

export async function checkSession(request: Request) {
	const session = await getSession(request.headers.get('Cookie'))
	const user: IUserSession = session.get('user')

	if (!user) {
		throw new Response('Unauthorized', {
			status: 401
		})
	}

	return user
}
