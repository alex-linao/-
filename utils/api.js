
// 普通get请求
function http(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: this.HOST + '/' + url,
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        console.log(err)
      }
    })
  })
}

// get 可认证可不认证
function mixHttp(url) {

  let header = {}

  let token = wx.getStorageSync('token')
  let expiredAt = wx.getStorageSync('expired_at')

  // 如果 token 过期了，则调用刷新方法
  if (token && Date.parse(new Date()) / 1000 < expiredAt) {
    header = { Authorization: 'Bearer ' + token }
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: this.HOST + '/' + url,
      header: header,
      success: res => {
        resolve(res.data)
      }
    })
  })
}


// 需要认证的请求
function authHttp(options) {

  return new Promise((resolve, reject) => {

    resolve(getToken(this.HOST))

  }).then(token => {

    return authHttpData(options, token, this.HOST)

  })
}

function authHttpData(options, token, HOST) {
  return new Promise((resolve, reject) => {
    let method = options.method !== undefined ? options.method.toUpperCase() : 'GET'
    wx.request({
      method: method,
      url: HOST + '/' + (typeof options === 'string' ? options : options.url),
      header: { Authorization: 'Bearer ' + token },
      data: options.data !== undefined ? options.data : {},

      success: res => {
        if (method == "GET" && res.statusCode === 200) {
          resolve(res.data)
        } else {
          resolve(res)
        }
      }

    })
  })
}

function getToken(HOST) {

  return new Promise((resolve, reject) => {

    let token = wx.getStorageSync('token')
    let expiredAt = wx.getStorageSync('expired_at')

    if (!token) {
      wx.navigateTo({
        url: '/pages/account/login/login'
      })
      return
    }

    // 如果 token 过期了，则调用刷新方法
    if (token && Date.parse(new Date()) / 1000 > expiredAt) {

      wx.request({
        method: 'put',
        url: HOST + '/refresh',
        header: { Authorization: 'Bearer ' + token },
        success: res => {

          if (res.statusCode === 200) {

            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('expired_at', res.data.expired_at)

            resolve(res.data.token)

          } else {
            // 已过期，请重新登录
            // wx.showToast({
            //   title: '账号已过期，请重新登录',
            //   icon: 'none',
            //   duration: 2000
            // })
            // 清除 token
            wx.removeStorageSync('token')
            wx.removeStorageSync('expired_at')

            this.loggedIn = false
            this.user = {}

            wx.navigateTo({
              url: '/pages/account/login/login'
            })
          }
        }
      })
    } else {
      resolve(token)
    }
  })
}


module.exports = {
  http: http,
  authHttp: authHttp,
  mixHttp: mixHttp
}