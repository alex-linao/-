Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndexNav:0,
    navList:[],
    swiperList:[],
    videosList:[]
    
  },
// 查询搜索的接口方法
a: function (e) {
  var aa =  this.data.serch;
  //getApp().globalData.id=aa;
  wx.navigateTo({
    url: '../ChaXun/ChaXun?id='+aa,
  //   success: function(e) {
  //     var page = getCurrentPages().pop();
  //     if (page == undefined || page == null) return;
  //     page.onLoad();
  // }
  })
},
// 拿到手机号
getval: function (e) {
  
  var val = e.detail.value;
  this.setData({
      serch: val
  });
},
  activeNav(e){
    // console.log(123);
    this.setData({
      currentIndexNav:e.target.dataset.index
    })
  },

  getNavList(){

    let that=this;
    wx.request({
      url:"https://xmyy.xingmengwenzhang.com/wxApi/public/?service=App.Mov.GetSyLevelAll&mark=xm123&sign=e01c781168ec7dd199737193ae51e77e",
      success(res){
       
       //console.log(res);
        if(res.data.code===0)
        {
          that.setData({
            navList:res.data.data.navList
          })
        }
      }
    })
  },
//轮播
  getSwiperList(){
    let that=this;
    wx.request({
      url:"http://www.feyu.vip/api/Tvplay/fenplay?usersid=123456",
      //url:"https://xmyy.xingmengwenzhang.com/wxApi/public/?service=App.Mov.GetSyLevelAll&mark=xm123&sign=e01c781168ec7dd199737193ae51e77e",
      success(res){
        // console.log(res);
        // if(res.data.Code==200){
        //   that.setData({
        //     swiperList:res.data.Data.lunbo,
        //   })
        // }

        if(res.statusCode==200){
          that.setData({
  swiperList:res.data.list.lunbo,
})

        }
      }
    })


  },

  getVideosList(){
    let that=this
    
    wx.request({
      url:"https://xmyy.xingmengwenzhang.com/wxApi/public/?service=App.Mov.GetSyLevelAll&mark=xm123&sign=e01c781168ec7dd199737193ae51e77e",
      success(res){
        //console.log(res.data);
        if(res.data.Code==200){
          that.setData({
            //标签
            videotype:res.data.Data.item,
            //热门电影
            videosList:res.data.Data.item[0].list,
            //好剧推荐
            videosList2:res.data.Data.item[1].list,
            //热门综艺
            videosList3:res.data.Data.item[2].list,
            //动画动漫
            videosList4:res.data.Data.item[3].list,

          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getNavList();
    this.getSwiperList();
    this.getVideosList();
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