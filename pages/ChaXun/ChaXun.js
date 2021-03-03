// pages/ChaXun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
   // let videoId=getApp().globalData.id;
    //getApp().globalData.id=null;
     let videoId=options.id;
    this.getCurrentVideo(videoId);

  },
  getCurrentVideo(videoId){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
     });
    one(videoId);
    
     let that=this;
     function one(videoId){
       wx.request({  
           url: "http://xcblogla.51vip.biz:11780/api/Values/HuoQu?videoId="+videoId,  
           //data:{"videoId":videoId},  
           method:'post',  
           async:false,
           header: {  
              'content-type': 'application/x-www-form-urlencoded'  
          },  
             success: function (res) {  
               if(res.data[0].sign!=""&&res.data[0].id!=0){
                var sign =  res.data[0].sign
                 two(sign)
               }else{
                 setTimeout(function(){
                   one(videoId);
            },2000);
               }
            }  
        }) ; 
                           }   
     function two(sign){
 
   wx.request({
    
     url:"https://xmyy.xingmengwenzhang.com/wxApi/public/?service=App.Mov.SearchVod&key="+videoId+"&sign="+sign,
     success(res){

      console.log(res.data.Data)
       if(res.statusCode==200){
        wx.hideToast();
         that.setData({
           videoinfo:res.data.Data,
         });
         
       }
     }
   })
 
                           }
                           
    
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