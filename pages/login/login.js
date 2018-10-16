Page({
  data: {
    hiddenModalMessage:true,
    modalMessage: '',
    EID: '',
    pwd: '',
    loginType:''
  },

  // 获取输入账号  
  EIDInput: function (e) {
    this.setData({
      EID: e.detail.value
    })
  },

  // 获取输入密码  
  pwdInput: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },

  // 登录  
  login: function () 
  {   
    var obj = this;
    if (obj.data.EID.length == 0 || obj.data.pwd.length == 0) 
    {
      this.showTheModal("帐号或密码不能为空！")
      return false
    } 
    if (obj.data.EID.length != 7) {
      this.showTheModal("EID长度不正确，请重新输入！")
      return false
    }
    if (obj.data.pwd.length < 6) {
      this.showTheModal("密码不得小于6位！")
      return false;
    }
    wx.showLoading({
      title: '登录中...',
      mask:true
    })
    this.getlogin()
  
  },
  //调用后台login
  getlogin: function () {
    wx.request({
      url: getApp().globalData.host + '/login',
      data: {
        "EID": this.data.EID,
        "pwd": this.data.pwd,
      },
      method: "POST",
      header: {
        'content-type': "application/json"
      },
      success: data => {
        wx.hideLoading()
        if (data.data.ret == '400006') {
          this.showTheModal("用户名不正确！")
        }
        else if (data.data.ret == '400007') {
          this.showTheModal("密码不正确！")
        }
        else if (data.data.ret == '400010') {
          this.showTheModal('用户已登录！')
        }
        else {
          getApp().globalData.UserInfo = data.data.ret;
          this.loginSuccessAction()
        }
      }
    })
  },


  loginSuccessAction: function () {
    var page =this
    wx.showToast({
      title: '登录成功！',
      icon: 'success',
      duration: 1000,
      success: function (res) {
        page.bindingWX()
      }
    })
    setTimeout(function () {
   
    }, 1000)
  },
  //绑定微信功能
  bindingWX: function () {  
    console.log(getApp().globalData.openID)
    wx.showLoading({
      title: 'Loading...',
      mask: true
    })
    wx.request({
      url: getApp().globalData.host + '/bindWXaccount',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        EID: this.data.EID,
        openID: getApp().globalData.openID,
      },
      success: res => {
        wx.hideLoading()
        console.log(res)
        //string 0：已经绑定；1：成功；2：绑定了别人；-1：异常
        this.bindWXResult(res.data.ret)
      }
    })
  },
  bindWXResult: function (resultCode) {
    if (resultCode[0] == '0') {
      this.showTheModal('此EID和微信已经绑定过了！')
    } else if (resultCode[0] == '1') {
      this.showTheModal('绑定成功！您现在可以使用微信号登录了！')

    } else if (resultCode[0] == '2') {
      this.showTheModal('此微信已经绑定了用户 ' + resultCode[1] + '\n请联系管理员！')
    } else {
      this.showTheModal('未知错误，请联系管理员！')
    }
  },
  //根据变量弹出提示框
  showTheModal: function (title) {
    this.setData({
      modalMessage: title,
      hiddenModalMessage: false,
    })
  },
  //取消/隐藏模态框
  hideModal: function () {
    this.setData({
      hiddenModalMessage: true
    })
    console.log(this.data.modalMessage)
    if (this.data.modalMessage == '绑定成功！您现在可以使用微信号登录了！')
    {wx.reLaunch({
      url: '../../pages/home/home',
    })}
  },
  //页面显示函数
  onShow: function () {
    console.log(getApp().globalData.userInfo)
    console.log(getApp().globalData.openID)
  }
})  