import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { redirect, useLoaderData } from '@remix-run/react'
import { requireUserSession } from '~/utils/auth'

export const meta: MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export async function loader({ request }: LoaderFunctionArgs) {
	// const session = await requireUserSession(request)
	// if (session.user) {
	// 	return redirect('/wallets')
	// }

	// return { session }
}

export default function Index() {
	// const { session } = useLoaderData<typeof loader>()

	return (
		// <div className="flex h-screen items-center justify-center">
		// </div>
		<div>home page</div>
	)
}
