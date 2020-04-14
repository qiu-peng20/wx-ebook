import { getOpenId } from './index.js'

//判断用户是否授权
export function getSetting(auth,onSuccess,onFail){
	mpvue.getSetting({
		success(res){
			//判断是否拿到用户的id或者手机等
			if(res.authSetting[`scope.${auth}`]){
				onSuccess(res)
			}else{
				onFail(res)
			}
		},
		fail(res){
		}
	})
}

//判断在用户授权之后，是否取得对应的值（用户名等）
export function getUserInfo(onSuccess,onFail){
	mpvue.getUserInfo({
		success(res){
			const {userInfo} = res
			if(userInfo){
				onSuccess(userInfo)
			}else{
				onFail(res)
			}
		},
		fail(res){
		}
	})
}

//存储用户信息
export function setStorageSync(key,data){
	mpvue.setStorageSync(key , data)
}

//获取用户信息
export function getStorageSync(key){
	return mpvue.getStorageSync(key)
}

//获取openId
export function getUserOpenId(callBack){
	mpvue.login({
		success(res){
			if(res.code){
				const {code} = res
				getOpenId(code).then(response =>{
					const openId = response.data.data.openid
					setStorageSync('openId',openId)
					callBack && callBack(openId)
				})
			}else{
			}
		},
		fail(res){
		}
	})
}

//调用loading的提示框
export function showLoading(title){
	mpvue.showLoading({
		title,
		mask:true
	})
	
}

//隐藏提示框
export function hideLoading(){
	mpvue.hideLoading()
}
