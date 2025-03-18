import { AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { IErrorMessage } from '~/utils/response'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

export default function ErrorAlertBox({ messages }: { messages: IErrorMessage[] }) {
	const { t } = useTranslation()
	return messages?.length > 0 ? (
		<Alert variant="destructive">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>
				<h2 className="text-lg">{t('common.error')}</h2>
			</AlertTitle>
			<AlertDescription>
				{messages?.map((message: IErrorMessage) => <div className="flex">{message.message}</div>)}
			</AlertDescription>
		</Alert>
	) : null
}
