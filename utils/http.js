import {
  HOST
} from '../config'

export default {
  get(url, data) {
    return request(url, data)
  },

  post(url, data) {
    return request(url, data, 'POST')
  },

  put(url, data) {
    return request(url, data, 'PUT')
  },

  delete(url, data) {
    return request(url, data, 'DELETE')
  },

  upload(url, filePath, name, formData) {
    return upload(url, filePath, name, formData)
  }
}

function checkStatus(res) {
  if (res.statusCode > 100 && res.statusCode < 400) {
    return res
  } else {

  }
}

function upload(url, filePath, name = 'file', formData = {}) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: HOST + url,
      filePath,
      name,
      formData,
      success(res) {
        // return checkStatus(res)
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data)
        }
        resolve(res.data)
      }
    })
  })
}


function request(url, data = {}, method = 'GET') {
  let header = {}

  try {
    let token = wx.getStorageSync('token')
    let expiredAt = wx.getStorageSync('expired_at')

    // 如果 token 过期了，则调用刷新方法
    if (token && expiredAt && Date.parse(new Date()) < (new Date(expiredAt)).getTime()) {
      header = {
        Authorization: 'Bearer ' + token
      }
    }
  } catch (e) {

  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: HOST + url,
      data,
      method,
      header,
      success: res => {
        if (res.statusCode > 399) {
          if (res.statusCode === 401) return
          // wx.showToast({
          //   title: String(res.data.message || 'system error'),
          //   icon: 'none',
          //   duration: 2000
          // })
        } else {
          if (res.data.code) {
            resolve(res.data)
          } else {
            try {
              res.data.code = 200
            } catch (e) {

            }

            resolve(res.data)
          }
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  })
}