type Props = {
	children: React.ReactNode
}

export const AuthLayout: React.FC<Props> = ({ children }) => {
	return (
		<div className="container mx-auto max-w-96">
			<div className="bg-white dark:bg-slate-800 p-4 m-4 rounded-md max-w-xl">
				<>{children}</>
			</div>
		</div>
	)
}
