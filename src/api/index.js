const API_URL = 'https://test.youbaobao.xyz:18081'
const APP_ID = 'wx0ee5d63783572b27'
const APP_SECRET = 'd0ddc9c3869b56a71b0f062c72b0bd6c'
import { get,post } from './../utils/request.js'

export function getRecommend(){
	return get(`${API_URL}/book/home/recommend/v2`)
}
export function getFreeRead(){
	return get(`${API_URL}/book/home/freeRead/v2`)
}
export function gethotBook(){
	return get(`${API_URL}/book/home/hotBook/v2`)
}
export function getDetailBook(params){
	return get(`${API_URL}/book/detail`,params)
}

export function getBookRankSave(params){
	return get(`${API_URL}/book/rank/save`,params)
}

export function getBookContents(params){
	return get(`${API_URL}/book/contents`,params)
}

export function getBookShelf(params){
  return get(`${API_URL}/book/shelf/get`,params)
}

export function getBookShelfSave(params){
  return get(`${API_URL}/book/shelf/save`,{
    shelf:JSON.stringify(params)
  })
}

export function getBookShelfRemoveSave(params){
  return get(`${API_URL}/book/shelf/remove`,{
    shelf:JSON.stringify(params)
  })
}

export function getUserDay(params){
  return get(`${API_URL}/user/day` ,params)
}

export function getCategory(){
  return get(`${API_URL}/book/category/list/v2`)
}

export function getOpenId(code){
	return get(`${API_URL}/openId/get`,
	{
		appId:APP_ID,
		secret:APP_SECRET,
		code
	})
}

export function getHomeData(params){
	return get(`${API_URL}/book/home/v2`,params)
}

export function register(openId , userInfo){
	return post(`${API_URL}/user/register`,{
		openId,
		platform:mpvuePlatform,
		...userInfo
	})
}
