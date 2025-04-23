import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Key } from 'react'
import { Layout } from '~/components/layouts/main'
import WalletCard from '~/components/wallet/card'
import { getWallets } from '~/services/wallet'
import { checkSession } from '~/session.server'
import { IWalletViewDto } from '~/types/wallet'

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await checkSession(request)

	const wallets = await getWallets(session, 1, 15)
	return { session, wallets: wallets?.data }
}

export const meta = () => {
	return [
		{
			title: 'My Wallets'
		}
	]
}

export default function WalletIndexPage() {
	const { session, wallets } = useLoaderData<typeof loader>()

	return (
		<Layout session={session}>
			<>
				{wallets?.map((wallet: IWalletViewDto, i: Key) => {
					return (
						<div key={i}>
							<WalletCard data={wallet} />
						</div>
					)
				})}
			</>
		</Layout>
	)
}
