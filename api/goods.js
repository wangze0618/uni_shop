import request from '@/utils/request.js'

// 商品列表搜索
export const getGoodsListData = (params) => {
	return request('/api/public/v1/goods/search', params)
}
