function createFly() {
    if (mpvuePlatform === 'wx') {
      const Fly = require('flyio/dist/npm/wx')
      return new Fly()
    } else {
      return null
    }
}

export function get(url, params = {}) {
    const fly = createFly()
    if (fly) {
      return new Promise((resolve, reject) => {
        fly.get(url, params).then(response => {
			if(response && response.data && response.data.error_code === 0){
				resolve(response)
			}else{
				reject(response)
			}
        }).catch(err => {
          reject(err)
        })
      })
    }
}

export function post(url, params = {}) {
    const fly = createFly()
    if (fly) {
      return new Promise((resolve, reject) => {
        fly.post(url, params).then(response => {
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }

