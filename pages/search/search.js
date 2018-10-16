// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchType: ["LOB", "证书类别", "Modle", "cerType"],
    searchOption: '',
    searchInput: '',
    searchList: '',
    index: 0, nav_indexData: [],


    /**
     * 商铺展示信息
     */
    shop_List: [],

    /**
     * 距离假数据
     */
    dis_list: ['500', '800', '1000', '1500', '2000'],

    /**
     * 距离排序
     */
    soft_list: [
      {
        text: "距离排序"
      }, {
        text: "口味排序"
      }, {
        text: "环境排序"
      }, {
        text: "服务排序"
      }
    ],

    /**
     * 附近遮罩层是否显示
     */
    markNearby: false,
    /**
     * 全部美食弹窗
     */
    markAllFood: false,
    /**
     * 距离排序弹窗
     */
    markSoft: false,
    /**
     * 当前选择Tab
     * 0:全部美食 1：附近 2：距离排序
     */
    curTab: 1,

    /**
     * 选中结果 附近弹窗左侧选中结果 city字段
     */
    nearbyLeftTab: -1,

    // /**
    //  * 附近弹窗 左侧临时选中
    //  */
    // nearbyMockLeftTab:0,

    /**
     * 附近弹窗  是否进行了选中 
     */
    isNearbySelect: false,

    /** 
     *当前选中结果 附近弹窗中选项卡 对应county字段
     * 
     */
    nearbyTab: -1,


    /**
     * 当前选中结果 全部美食选项卡 对应字段type 
     */
    allFoodTab: 0,
    /**
     * 当前选中结果 距离排序选项卡
     */
    softListTab: 0,
    /**
     * 图片选择
     */
    pics: [],

    /**
     * 当前页码
     */
    page: 1,

    /**
     * 总条数
     */
    count: 1,
  },








  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})