import request from '@/utils/request.js'

// 获取轮播图数据
export const getSwiperArray = () => {
	return request('/api/public/v1/home/swiperdata', 'get')
}

// 获取分类列表数据
export const getNavListData = () => {
	return request('/api/public/v1/home/catitems', 'get')
}

// 获取楼层数据
export const getFloorData = () => {
	return request('/api/public/v1/home/floordata', 'get')
}
