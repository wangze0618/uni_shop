import request from '@/utils/request.js'

// 获取分类列表数据
export const getCateListData = () => {
	return request('/api/public/v1/categories', 'get')
}
