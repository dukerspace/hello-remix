import { useNavigate } from '@remix-run/react'
import { signOut } from 'next-auth/react'

export default function Setting() {
	const navigate = useNavigate()

	const onDelete = async () => {
		const response = await fetch(`/api/users/me`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (response.ok) {
			await signOut()
			return navigate('/')
		}
	}

	return (
		<>
			<button onClick={() => onDelete()}>delete</button>
		</>
	)
}
