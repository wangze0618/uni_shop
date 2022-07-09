import request from '@/utils/request.js'

// 商品列表搜索
export const getGoodsListData = (params) => {
	return request(`/api/public/v1/goods/search`, 'get', params)
}

// 获取商品详情
export const getGoodsDetailData = (id) => {
	return request(`/api/public/v1/goods/detail?goods_id=${id}`, 'get')
}
