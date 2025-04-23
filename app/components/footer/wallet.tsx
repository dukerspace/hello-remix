import { useNavigate } from '@remix-run/react'
import { Calculator, ChartColumnDecreasing, CirclePlus, House, Settings } from 'lucide-react'

type Props = {
	walletId: string
}

export const FooterWallet: React.FC<Props> = ({ walletId }) => {
	const navigate = useNavigate()

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-lg border-t border-gray-200">
			<div className="flex justify-center p-4">
				<div className="p-2">
					<button onClick={() => navigate('/')}>
						<div className="flex justify-center items-center">
							<House />
						</div>
						<p>Dashboard</p>
					</button>
				</div>

				<div className="p-2">
					<button
						// variant="outline"
						// size="icon"
						className="rounded-full"
						onClick={() => navigate(`/wallets/${walletId}`)}
					>
						<div className="flex justify-center items-center">
							<Calculator />
						</div>
						<div className="text-center">Transaction</div>
						{/* <CalcIcon className="h-5 w-5" /> */}
					</button>
				</div>

				<div className="p-2">
					<button
						// variant="outline"
						// size="icon"
						className="rounded-full"
						onClick={() => navigate(`/wallets/${walletId}/transactions/add`)}
					>
						<div className="flex justify-center items-center">
							<CirclePlus />
						</div>
					</button>
				</div>

				<div className="p-2">
					<div className="flex justify-center items-center">
						<ChartColumnDecreasing />
					</div>
					<div className="text-center">Overview</div>
				</div>

				<div className="p-2">
					<div className="flex justify-center items-center">
						<Settings />
					</div>
					<div className="text-center">setting</div>
				</div>
			</div>
		</div>
	)
}
