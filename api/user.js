import request from '@/utils/request.js'

// 获取用户token
export const getToken = (data) => {
	return request('/api/public/v1/users/wxlogin', 'post', data)
}
