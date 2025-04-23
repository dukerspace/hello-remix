import { useMutation } from '@tanstack/react-query'
import { createUser } from '~/services/user'

export const useCreateUser = () => {
	return useMutation({
		mutationFn: createUser
	})
}
