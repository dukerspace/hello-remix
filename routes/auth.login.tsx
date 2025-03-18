import { zodResolver } from '@hookform/resolvers/zod'
import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { Link, useActionData, useSubmit } from '@remix-run/react'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ErrorAlertBox from '~/components/alertbox/error'
import { AuthLayout } from '~/components/layouts/auth'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { PasswordInput } from '~/components/ui/password'
import { Separator } from '~/components/ui/separator'
import { AuthSchema } from '~/schema/auth'
import { signIn } from '~/services/auth'
import { commitSession, getSession } from '~/session.server'
import { ILogin } from '~/types/auth'
import { IErrorDto, IErrorMessage } from '~/utils/response'

export async function action({ request }: ActionFunctionArgs) {
	try {
		const formData = await request.formData()
		const username = String(formData.get('username'))
		const password = String(formData.get('password'))

		const payload: ILogin = {
			username,
			password
		}

		const response = await signIn(payload)
		const session = await getSession()

		session.set('user', response.data.data)
		return redirect('/wallets', {
			headers: {
				'Set-Cookie': await commitSession(session)
			}
		})
	} catch (error) {
		const err = error as AxiosError
		const msg = err?.response?.data as IErrorDto
		return Response.json(
			{
				success: false,
				error: msg?.errors,
				message: msg?.message
			},
			{
				status: 500
			}
		)
	}
}

export default function LoginPage() {
	const { t } = useTranslation()
	const submit = useSubmit()
	const actionData = useActionData<typeof action>()
	const error = actionData?.error as IErrorMessage[]
	const [errMsg, setErrMsg] = useState<IErrorMessage[]>([])

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ILogin>({
		resolver: zodResolver(AuthSchema)
	})

	useEffect(() => {
		setErrMsg(error)
	}, [error])

	// const onSubmit = (data: ILogin) => {
	// 	setErrMsg([])
	// 	submit(Object.entries(data), { method: 'post' })
	// }


	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log("xx",e.target)
	}

	return (
		<AuthLayout>
			<div className="bg-white dark:bg-slate-800 m-4 rounded-md text-black">
				<div>
					<p className="text-lg text-center">{t('common.sign_in')}</p>
				</div>

				{errMsg?.length > 0 && (
					<div className="my-4">
						<ErrorAlertBox messages={errMsg} />
					</div>
				)}

				<form onSubmit={handleSubmit(onSubmit)} method="post">
					<div className="grid grid-cols-1 gap-4">
						<div>
							<Input
								type="text"
								placeholder={t('common.username')}
								className={`dark:border-slate-600 w-full ${
									errors.username ? 'border-rose-500' : null
								}`}
								{...register('username')}
							/>
						</div>

						<div>
							<PasswordInput
								placeholder={t('common.password')}
								className={`dark:border-slate-600 w-full ${
									errors.password ? 'border-rose-500' : null
								}`}
								{...register('password')}
							/>
						</div>

						<div>
							<Button className="w-full btn btn-primary">{t('common.sign_in')}</Button>
						</div>
					</div>
				</form>

				<div className="pt-5">
					<Separator />
				</div>

				<div className="text-center pt-4 text-sm">
					<Link to={'/user/create'}>{t('common.sign_up')}</Link>
				</div>
			</div>
		</AuthLayout>
	)
}
