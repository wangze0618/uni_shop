import request from '@/utils/request.js'

// 因为后台的登录接口的问题，在登录后无法获取真正的token字符串，当时是用fastmock模
// 拟的token字符串，在订单业务和支付业务方面无能为力... Orz 
// 2022年7月14日 17:27:59 星期四 

// 创建订单API
export const createrOrderAPI = (data) => {
	return request('/api/public/v1/my/orders/create', 'post', data)
}

// 查看订单状态API
export const checkOrderAPI = (orderId) => {
	return request('/api/public/v1/my/orders/chkOrder', 'post', orderId)
}

// 查看历史订单API
export const allOrderAPI = (type) => {
	return request(`/api/public/v1/my/orders/all?type=${type}`, 'get')
}
