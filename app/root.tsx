import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useRouteLoaderData
} from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next/react'
import { ReactQueryClientProvider } from '~/providers/query-client'
import i18next, { localeCookie } from './localization/i18next.server'
import './tailwind.scss'

export const links: LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous'
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
	}
]

export const handle = { i18n: ['translation'] }

export async function loader({ request }: LoaderFunctionArgs) {
	const locale = await i18next.getLocale(request)
	return Response.json(
		{
			locale,
			ENV: {
				API_URL: process.env.API_URL
			}
		},
		{ headers: { 'Set-Cookie': await localeCookie.serialize(locale) } }
	)
}

export function Layout({ children }: { children: React.ReactNode }) {
	// const loaderData = useRouteLoaderData<typeof loader>('root')
	// let { locale } = useLoaderData<typeof loader>()
	const loaderData = useRouteLoaderData<typeof loader>('root')
	const data = useLoaderData<typeof loader>()

	let { i18n } = useTranslation()

	return (
		// <html lang={loaderData?.locale ?? 'en'}>
		<html lang={loaderData?.locale} dir={i18n.dir()}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<ReactQueryClientProvider>
				<body>
					{children}
					<script
						dangerouslySetInnerHTML={{
							__html: `window.ENV = ${JSON.stringify(data.ENV.API_URL)}`
						}}
					/>
					<ScrollRestoration />
					<Scripts />
					{/* <LiveReload /> */}
				</body>
			</ReactQueryClientProvider>
		</html>
	)
}

export default function App() {
	const { locale } = useLoaderData<typeof loader>()
	useChangeLanguage(locale)
	return <Outlet />
}
