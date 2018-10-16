// pages/prelogin/prelogin.js
Page({

  data: {
    hiddenModalMessage:true,
     
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var self = this;
    wx.login({
      success: function (res) {
        if (res.code) {    
          wx.request({
            url: getApp().globalData.host_openid +'/getOpenID',
            method: "POST",
            header: {
              'content-type': 'application/json'
            },
            data: {
              code: res.code,
              appname:"hardware"
            },
            success: function (res) {
             if (res.statusCode == '200') {
                getApp().globalData.openID = res.data.ret
                self.setData({
                  openid: res.data.ret
                })
                console.log(res.data.ret)

                setTimeout(function () {
                  self.getWXlogin(res.data.ret) 
                }, 1000) //
              }
              else {
                wx.hideLoading()
                self.showTheModal('获取用户登录态失败！')}

              
            },
            fail: function (res) {
              wx.hideLoading()
              console.log(res)
              self.showTheModal('网络加载失败')
            }
          })
        } else {
          wx.hideLoading()
          console.log('获取用户登录态失败！' + res.errMsg)
          self.showTheModal('获取用户登录态失败！')
        }
      }
    });
  },

  //调用后台wxlogin
  getWXlogin: function (openID) {
    var page = this   
    wx.request({
      url: getApp().globalData.host +'/wxlogin',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        openID: openID,
      },
      success: res => {
        wx.hideLoading()
        console.log(res)
        if (res.data.ret != -1) {  
          getApp().globalData.UserInfo = res.data.ret;       
          page.loginSuccessAction()
        } else {
          page.showTheModal("该微信号没有绑定任何账户！\n请先绑定EID登录！")      

        }
      }
    })
  },
  loginSuccessAction: function () {
    wx.showToast({
      title: '登录成功！',
      icon: 'success',
      duration: 1000,
     
    })
    setTimeout(function () {
      wx.reLaunch({
        url: '../../pages/home/home'
      })
    }, 1000)
  },
  bindaction:function(){
    wx.redirectTo({
      url: "/pages/login/login",
    })
    this.setData({
      hiddenModalMessage: true
    })
  },
  //根据变量弹出提示框
  showTheModal: function (title) {
    this.setData({
      modalMessage: title,
      hiddenModalMessage: false,
    })
  },
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})