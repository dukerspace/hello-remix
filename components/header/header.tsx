import { Link } from '@remix-run/react'
import { UserPen, WalletCards } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// import { ThemeSwitch } from '~/components/theme-switch/theme-switch'
import { Avatar, AvatarImage } from '~/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { IUserSession } from '~/types/auth'

type Props = {
	session: IUserSession
}

export const Header: React.FC<Props> = ({ session }) => {
	const { t } = useTranslation()

	return (
		<>
			<div className="navbar border-b bg-white dark:bg-slate-800 py-2 px-4 h-18">
				<div className="container mx-auto">
					<div className="flex">
						<div className="flex-1 flex items-center">
							<Link to={'/'} className="btn btn-ghost text-xl">
								Budgmate
							</Link>
						</div>

						{!session.user.id ? (
							<Link to={'/auth/login'}>{t('common.sign_in')}</Link>
						) : (
							<>
								<div className="flex items-center">
									<div className="p-2">
										<DropdownMenu>
											<DropdownMenuTrigger>
												<Avatar>
													<AvatarImage
														alt="profile"
														width={50}
														height={50}
														src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
													/>
												</Avatar>
											</DropdownMenuTrigger>

											<DropdownMenuContent className="bg-white dark:bg-slate-800">
												<DropdownMenuItem>
													<WalletCards />
													<Link to={'/wallets'}>{t('common.wallets')}</Link>
												</DropdownMenuItem>

												<DropdownMenuSeparator />
												<DropdownMenuItem>
													<UserPen />
													<Link to={'/accounts/profile'}>{t('common.profile')}</Link>
												</DropdownMenuItem>

												<DropdownMenuSeparator />

												<DropdownMenuItem>
													<Link to={'/accounts/settings'}>{t('common.settings')}</Link>
												</DropdownMenuItem>

												<DropdownMenuSeparator />

												<DropdownMenuItem>
													<Link to={'/auth/logout'}>{t('common.sign_out')}</Link>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
