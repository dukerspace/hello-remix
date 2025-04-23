import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useParams } from '@remix-run/react'
import dayjs from 'dayjs'
import { Layout } from '~/components/layouts/main'
import WalletDetail from '~/components/wallet/detail'
import { getTransactionByWalletId } from '~/services/transaction'
import { checkSession } from '~/session.server'
import { IUserSession } from '~/types/auth'
import { ITransactionViewDto } from '~/types/transaction'
import { IWalletViewDto } from '~/types/wallet'

interface IWallet {
	session: IUserSession
	wallet: IWalletViewDto
	meta: {
		title: string
	}
}

export async function loader({ request, params }: LoaderFunctionArgs) {
	const session = await checkSession(request)
	const formattedDate = dayjs().format('YYYY-MM')
	const getTransactions = await getTransactionByWalletId(session, params.walletId!, formattedDate)
	const transactions = getTransactions.data as ITransactionViewDto[]
	console.log('transactionstransactionstransactions', transactions)
	return {
		session,
		transactions
	}
}

// export const meta: MetaFunction = ({ data }) => {
// 	const walletData = data as IWallet
// 	return [
// 		{
// 			title: `Wallet : ${walletData.meta.title}`
// 		}
// 	]
// }

export default function WalletIdPage() {
	const { session, transactions } = useLoaderData<{
		session: IUserSession
		transactions: ITransactionViewDto[]
	}>()
	const { walletId } = useParams()

	return (
		<Layout session={session}>
			<div className="min-h-screen bg-background">
				<WalletDetail walletId={walletId!} transactions={transactions} />
			</div>
		</Layout>
	)
}
