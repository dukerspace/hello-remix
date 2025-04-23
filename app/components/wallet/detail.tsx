import { TopCategory } from '~/components/category/top-category'
import { FooterWallet } from '~/components/footer/wallet'
import TransactionList from '~/components/transaction/transaction-list'
import { ITransactionViewDto } from '~/types/transaction'

type Props = {
	walletId: string
	transactions: ITransactionViewDto[]
}

const WalletDetail: React.FC<Props> = ({ walletId, transactions }) => {
	return (
		<>
			<div>
				<TopCategory walletId={walletId} />
				<TransactionList walletId={walletId} data={transactions} />
			</div>
			<FooterWallet walletId={walletId} />
		</>
	)
}

export default WalletDetail
