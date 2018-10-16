// pages/todotask/todotask.js
var app = getApp()
var that = this;
Page({

  data: {
    todolist: [],
    renewingList: [],
    threeMonthList:[],
    sixMonthList:[],
    searchType: ["LOB", "证书类别", "Modle", "cerType"],
    searchOption: '',
    searchInput: '',
    searchList: '',
    index: 0,
    userInput: '',
    show: 'todolist',
    showSearchAmount: true
  },

  onShow: function () {
    var page = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: getApp().globalData.host + "/selectalltask",
      data: {

      },
      method: "POST",
      header: {
        'content-type': 'application/json; charset=utf-8"'
      },
      success: res => {
        console.log(res.data.ret)
        var list = res.data.ret;

        wx.hideLoading()
        page.setData({
          todolist: list
        })
      }
    })

  },

  changeViewType: function (e) {
    var data = e.currentTarget.dataset
    this.setData({
      show: data.type
    })
  },
  //picker的变动函数 
  searchOptionChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  //输入框实时赋值
  searchBindInput: function (e) {
    this.setData({
      searchInput: e.detail.value
    })
  },
  cancleSearch: function () {
    this.setData({
      searchOption: '',
      searchInput: '',
      userInput: ''
    })
  },

  isSuccess: function () {
    var that = this;
    that.setData({

    })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 900
    })
    setTimeout(function () {
    }, 800)
  },

})