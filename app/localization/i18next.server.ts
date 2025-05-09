import { createCookie } from '@remix-run/node'
import Backend from 'i18next-fs-backend'
import path from 'node:path'
import { RemixI18Next } from 'remix-i18next/server'
import i18n from './i18n'

export const localeCookie = createCookie('lng', {
	path: '/',
	sameSite: 'lax',
	secure: process.env.NODE_ENV === 'production',
	httpOnly: true
})

const i18next = new RemixI18Next({
	detection: {
		supportedLanguages: i18n.supportedLngs,
		fallbackLanguage: i18n.fallbackLng
	},
	i18next: {
		...i18n,
		backend: {
			loadPath: path.resolve('./locales/{{lng}}/{{ns}}.json')
		}
	},
	plugins: [Backend]
})

export default i18next
