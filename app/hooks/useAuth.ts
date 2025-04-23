import { useMutation } from '@tanstack/react-query'
import { signIn } from '~/services/auth'

export const useAuth = () => {
	return useMutation({
		mutationFn: signIn
	})
}
