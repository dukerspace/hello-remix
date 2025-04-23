'use client'

import { useNavigate } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingSpinner } from '~/components/loading/loading'
import TransactionCalculator from '~/components/transaction/calculator'
import TransactionCalendar from '~/components/transaction/calendar'
import TransactionCategory from '~/components/transaction/category'
import { Button } from '~/components/ui/button'
import { useGetAllCategory } from '~/hooks/useCategory'
import { useCreateTransaction } from '~/hooks/useTransaction'
import { ICategoryViewDto } from '~/types/category'
import { ITransactionCreateDto } from '~/types/transaction'

type Props = {
	walletId: string
}

const TransactionCreate: React.FC<Props> = ({ walletId }: { walletId: string }) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const createTransaction = useCreateTransaction()
	const { data: dataCategory, isLoading } = useGetAllCategory()

	const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false)
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
	const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
	const [data, setData] = useState<ITransactionCreateDto>({
		type: null,
		categoryId: null,
		date: new Date(),
		amount: 0
	})

	const [categories, setCategories] = useState<ICategoryViewDto[]>([])
	const [category, setCategory] = useState<ICategoryViewDto | null>(null)
	const [selectedDate, setSelectedDate] = useState<Date>(new Date())
	const [amount, setAmount] = useState<number>()
	const [disabled, setDisable] = useState(true)

	useEffect(() => {
		if (selectedDate && category && amount) {
			setDisable(false)
		} else {
			setDisable(true)
		}
	}, [selectedDate, category, amount])

	useEffect(() => {
		setCategories(dataCategory?.data || [])
	}, [dataCategory, isLoading])

	const onSelectCategory = (category: ICategoryViewDto) => {
		setCategory(category)
		setIsCategoryOpen(false)
		setData({
			...data!,
			type: category.type,
			categoryId: category.id
		})
	}

	const onSelectDate = (date: Date) => {
		setSelectedDate(date)
		setData({
			...data!,
			date: date
		})
		setIsDatePickerOpen(false)
	}

	const onSetAmount = (amount: number) => {
		setAmount(amount)
		setData({
			...data!,
			amount: amount
		})
	}

	const handleAddTransaction = async () => {
		createTransaction.mutate(
			{
				walletId: walletId,
				data: data
			},
			{
				onSuccess: () => {
					return navigate(`/wallets/${walletId}`)
				}
			}
		)
	}

	return isLoading ? (
		<>
			<LoadingSpinner />
		</>
	) : (
		<div className="p-4">
			<h2>{t('transaction.add')}</h2>
			<div>
				<TransactionCategory
					category={category!}
					categories={categories}
					isOpen={isCategoryOpen}
					onOpen={setIsCategoryOpen}
					onSelectCategory={onSelectCategory}
				/>

				<TransactionCalendar
					open={isDatePickerOpen}
					onOpen={setIsDatePickerOpen}
					selectedDate={selectedDate}
					onSelect={(date) => {
						if (date) {
							onSelectDate(date)
						}
					}}
				/>

				<TransactionCalculator
					data={data!}
					isOpen={isCalculatorOpen}
					onOpen={setIsCalculatorOpen}
					onSetAmount={onSetAmount}
				/>

				<div className="flex">
					<Button
						onClick={handleAddTransaction}
						className="w-full"
						variant={'green'}
						disabled={disabled}
					>
						{t('transaction.add')}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default TransactionCreate
