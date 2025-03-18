import * as z from 'zod'

export const CreateUserSchema = z
	.object({
		first_name: z.string().nonempty({ message: 'First name is required' }),
		last_name: z.string().nonempty({ message: 'Last name is required' }),
		username: z.string().nonempty({ message: 'Username is required' }),
		email: z.string().email({ message: 'Invalid email address' }),
		password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
		confirm_password: z
			.string()
			.min(6, { message: 'Confirm Password must be at least 6 characters' })
	})
	.refine((data) => data.password === data.confirm_password, {
		message: 'Passwords do not match',
		path: ['confirm_password']
	})

export type CreateUserError = z.infer<typeof CreateUserSchema>
