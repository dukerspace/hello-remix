import { Header } from '~/components/header/header'
import { IUserSession } from '~/types/user'

type Props = {
	children: React.ReactNode
	session: IUserSession
}

export const Layout: React.FC<Props> = ({ children, session }) => {
	return (
		<>
			<Header session={session} />
			<div className="container mx-auto mt-4">{children}</div>
		</>
	)
}
