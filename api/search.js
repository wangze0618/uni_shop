import request from '@/utils/request.js'

// 搜索建议查询
export const getSearchListData = (query) => {
	return request(`/api/public/v1/goods/qsearch?query=${query}`)
}
