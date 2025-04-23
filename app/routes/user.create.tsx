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
import { Separator } from '~/components/ui/separator'
import { CreateUserSchema } from '~/schema/user'
import { createUser } from '~/services/user'
import { IUserCreateDto } from '~/types/user'
import { IErrorDto, IErrorMessage } from '~/utils/response'

export async function action({ request }: ActionFunctionArgs) {
	try {
		const formData = await request.formData()
		const payload: IUserCreateDto = {
			first_name: formData.get('first_name') as string,
			last_name: formData.get('last_name') as string,
			username: formData.get('username') as string,
			email: formData.get('email') as string,
			password: formData.get('password') as string,
			confirm_password: formData.get('confirm_password') as string
		}

		const response = await createUser(payload)

		return redirect('/auth/login')
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

export default function UserCreatePage() {
	const { t } = useTranslation()
	const submit = useSubmit()
	const actionData = useActionData<typeof action>()
	const error = actionData?.error as IErrorMessage[]
	const [errMsg, setErrMsg] = useState<IErrorMessage[]>([])

	useEffect(() => {
		setErrMsg(error)
	}, [error])

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IUserCreateDto>({
		resolver: zodResolver(CreateUserSchema)
	})

	const onSubmit = (data: IUserCreateDto) => {
		setErrMsg([])
		submit(Object.entries(data), { method: 'post' })
	}

	return (
		<AuthLayout>
			<div className="bg-white dark:bg-slate-800 m-4 rounded-md">
				<div>
					<p className="text-lg text-center">{t('common.sign_up')}</p>
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
								placeholder={t('common.first_name')}
								className={`dark:border-slate-600  w-full ${
									errors.first_name ? 'border-rose-500' : null
								}`}
								{...register('first_name')}
							/>
						</div>

						<div>
							<Input
								type="text"
								placeholder={t('common.last_name')}
								className={`dark:border-slate-600  w-full ${
									errors.last_name ? 'border-rose-500' : null
								}`}
								{...register('last_name')}
							/>
						</div>

						<div>
							<Input
								type="text"
								placeholder={t('common.username')}
								className={`dark:border-slate-600  w-full ${
									errors.username ? 'border-rose-500' : null
								}`}
								{...register('username')}
							/>
						</div>

						<div>
							<Input
								type="email"
								placeholder={t('common.email')}
								className={`dark:border-slate-600  w-full ${errors.email ? 'border-rose-500' : null}`}
								{...register('email')}
							/>
						</div>

						<div>
							<Input
								className={`dark:border-slate-600  w-full ${
									errors.password ? 'border-rose-500' : null
								}`}
								type="password"
								placeholder={t('common.password')}
								{...register('password')}
							/>
						</div>

						<div>
							<Input
								className={`dark:border-slate-600  w-full ${
									errors.confirm_password ? 'border-rose-500' : null
								}`}
								type="password"
								placeholder={t('common.confirm_password')}
								{...register('confirm_password')}
							/>
						</div>

						<div>
							<Button type="submit" className="w-full text-white">
								{t('common.sign_up')}
							</Button>
						</div>
					</div>
				</form>

				<div className="pt-5">
					<Separator />
				</div>

				<div className="text-center pt-4">
					<Link to={'/auth/login'}>{t('common.sign_in')}</Link>
				</div>
			</div>
		</AuthLayout>
	)
}
