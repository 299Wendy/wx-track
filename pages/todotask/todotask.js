// pages/todotask/todotask.js
var app = getApp()
var that = this;
Page({

  data: {
    todolist: [],
    todoTrolleyList: [],
    renewingList: [],
    searchType: ["LOB", "证书类别", "Modle", "cerType"],
    searchOption: '',
    searchInput:'',
    searchList:'',
    index: 0,
    imgURL:"../../images/null.jpg",
    userInput:'',
    show: 'todolist',
    showSearchAmount:true,
    heart: "../../images/heart.png",
    empty_heart: "../../images/empty_heart.png",
    trolleyImage: "../../images/trolley_delete.png",
    scanImage: "../../images/add.png",
  },

  onShow: function () {  
    var page = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: getApp().globalData.host + "/selectTodotask",
      data: {
      
      },
      method: "POST",
      header: {
        'content-type': 'application/json; charset=utf-8"'
      },
      success: res => {
        var list = res.data.ret;
        
        wx.hideLoading()
        page.setData({
          todolist:list, 
                   
        })
        console.log(this.data.todolist)
   
      }
    })
      
  },
  //

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
  //取消搜索
  cancleSearch:function(){    
    this.setData({
      searchOption:'',
      searchInput:'',
      userInput:''
    })
  },
  
  changeImage:function(e){
    var temlist = this.data.todolist
    console.log(this.data.todoTrolleyList.length)
    var index = e.target.dataset.index   
    if (this.data.todolist[index].ImgFlag) {
      var index1 = this.getIndexFromTrolleyByID(this.data.todolist[e.target.dataset.index].ID)
      this.data.todoTrolleyList.splice(index1, 1)
      console.log(this.data.todoTrolleyList.length)
      temlist[index1].ImgFlag = false
      this.setData({
        todolist: temlist,
        todoTrolleyList: this.data.todoTrolleyList
      })
    } else { //加入购物车
      this.data.todoTrolleyList.push(this.data.todolist[index])
      temlist[index].ImgFlag = "true"
      this.setData({
        todolist: temlist,
        todoTrolleyList: this.data.todoTrolleyList
      })
    }
   // this.setTrolleyNum();
    //this.judgeTrolleyNumber();
  },


  //根据ID返回购物车的INDEX
  getIndexFromTrolleyByID:function (ID) {
    for (var i = 0; i < this.data.todoTrolleyList.length; i++) {
      if (this.data.todoTrolleyList[i].barcode == barcode) {
        return i;
        break;
      }
    }
  },

  })