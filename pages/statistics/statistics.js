// pages/statistics/statistics.js
var Charts = require('./../../utils/wxcharts');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 'alllist',
    todolist:[],
    searchType: ['ALL'],
    searchValue:['0'],
    index:0,
    LOB:[],
    CANVASID:'columnCanvas',
    RENEWNING:[],
    TORENEW:[],
       
    
  },
  
  onLoad: function () {
    this.getallstatistcs();

    this.getcerType()

  },
  //搜索所有的数据
  getallstatistcs:function(){
    var page = this;
    var list
    let CANVASID = 'columnCanvas0'    
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: getApp().globalData.host + "/countforall",
      method: "POST",
      header: {
        'content-type': 'application/json; charset=utf-8"'
      },
      success: res => {
        console.log(res.data.ret)
        list = res.data.ret;           
        wx.hideLoading()
        page.setData({
          todolist: list,
          LOB:list.LOB,
          RENEWNING:list.RENEWNING,
          TORENEW: list.TORENEW,
        })
      }
    })
      setTimeout(function () {
      page.drawBar(list.LOB, list.RENEWNING, list.TORENEW)
    }, 3000)
  },
 // 获取证书的类型的
  getcerType:function(){
    var page = this
    wx.request({
      url: getApp().globalData.host + "/getcerType",
      method: "POST",
      header: {
        'content-type': 'application/json; charset=utf-8"'
      },
      success: res => {
        console.log(res.data.ret)
        var data = res.data.ret
        for(var i=0;i<data.length;i++){
          page.data.searchType.push(data[i][0])
          page.data.searchValue.push(data[i][1])
        }      
        wx.hideLoading()
        page.setData({
          searchType: page.data.searchType,
          searchValue: page.data.searchValue          
        })
        }
    })

  },
 




//画柱状图
  drawBar: function (LOB, RENEWNING, TORENEW)
  {
   var seidesArr  =[]; 
    var page = this;  
    new Charts({
      canvasId: 'columnCanvas',
      type: 'column',
      categories: LOB,
      series: [{
        name: '正在renew',
        data: RENEWNING }, 
        {
        name: '需要renew',
        data: TORENEW
      }],
      yAxis: {
        format: function (val) {
          return val + '个';
        }
      },
      width: 340,
      height: 340
    });
  },
    //picker的变动函数 
  searchOptionChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.index)
    
    console.log('columnCanvas'+this.data.index)
    if (this.data.index=='0'){
      this.getallstatistcs()
    }
    else{
    this.getcerMountbycerTypes()
    }
  },
  //根据证书搜索数据
  getcerMountbycerTypes: function () {
    var page = this;
    var list
    var cerType = this.data.searchValue[this.data.index];
    console.log(cerType)
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: getApp().globalData.host + "/getcerMountbycerTypes",
      method: "POST",
      data: {
        cerType: cerType
      },
      header: {
        'content-type': 'application/json; charset=utf-8"'
      },
      success: res => {
        console.log(res.data.ret)
        list = res.data.ret;
        wx.hideLoading()
        page.setData({          
          LOB: list.LOB,
          RENEWNING: list.RENEWNING,
          TORENEW: list.TORENEW,
        })
      }
    })
    setTimeout(function () {
      page.drawBar(list.LOB, list.RENEWNING, list.TORENEW)
    }, 3000)
  },


  /**
   * 生命周期函数--监听页面显示
   */
 
  changeViewType: function (e) {
    var data = e.currentTarget.dataset
    this.setData({
      show: data.type
    })
   
  },
 draw:function(){
   
 }
  /**
   * 生命周期函数--监听页面隐藏
   */

  

  
})