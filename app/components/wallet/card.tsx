import { Link } from '@remix-run/react'
import { Wallet } from 'lucide-react'

import { IWalletViewDto } from '~/types/wallet'

type Props = {
	data: IWalletViewDto
}

const WalletCard: React.FC<Props> = ({ data }) => {
	return (
		<>
			<Link to={`/wallets/${data.id}`}>
				<div className="card lg:card-side bg-white dark:bg-slate-800 rounded-md shadow-xl p-4">
					<Wallet />
					<div className="card-body">
						<h2 className="card-title">{data.name}</h2>
					</div>
				</div>
			</Link>
		</>
	)
}

export default WalletCard
