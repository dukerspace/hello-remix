import { useQuery } from '@tanstack/react-query'
import { getAllCategory } from '~/services/category'
import { ICategoryViewDto } from '~/types/category'
import { IResponsePaginate } from '~/utils/response'

export const useGetAllCategory = () => {
	return useQuery<IResponsePaginate<ICategoryViewDto[]>>({
		queryKey: ['categories'],
		queryFn: () => getAllCategory()
	})
}
