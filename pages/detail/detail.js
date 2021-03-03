// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
   // videoInfo:null,
   // othersList:[],
   // commentData:null
  },
  bindtimeupdate: function (res){ //播放中函数，查看当前播放时间等
    my()
    
    function my(){
     
      wx.hideToast();
    }
    //console.log(res) //查看正在播放相关变量
    //console.log( "播放到第" +res.detail.currentTime+ "秒" ) //查看正在播放时间，以秒为单位
  },
  goToPage1: function () {
    wx.navigateTo({
      url: '../../pages/Index/Index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 20000
     });
    let videoId=options.id;
    this.getCurrentVideo(videoId);
  },

  getCurrentVideo(videoId){
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
              //console.log(res)
             
           }  
       }) ; 
                          }   
    function two(sign){

  wx.request({
    url:"https://xmyy.xingmengwenzhang.com/wxApi/public/?service=App.Mov.GetOnlineMvById&vodid="+videoId+"&mark=xm123&sign="+sign,
    success(res){
      
      //var aa = res.data.Data.items[0].vod_play_url.split('$');
      var str = res.data.Data.items[0].vod_play_url;
      
      //区分播放来源  “$$$”播放来源 “#”各个视频信息  "$"区别视频src 以及视频名称
      var str1 = str.split('$$$');
      //存放各个来源所有信息(所有集数全部信息)
      var videoinfo1 = [];
      var videoinfo2 = [];
      var videoinfo3 = [];
      for (var index in str1){
        var reg = RegExp(/.html/);
        if(str1.length==1){
          var bs =  reg.test(str1[0].split('#'))
          if(!bs){videoinfo1=  str1[0].split('#');}
        }else if(str1.length==2){
          var bs =  reg.test(str1[0].split('#'))
          var bs1 =  reg.test(str1[1].split('#'))
          if(!bs){videoinfo1=  str1[0].split('#');}
          if(!bs1){videoinfo2=  str1[1].split('#');}
        }else{
          var bs =  reg.test(str1[0].split('#'))
          var bs1 =  reg.test(str1[1].split('#'))
          var bs2 =  reg.test(str1[2].split('#'))
          if(!bs){videoinfo1=  str1[0].split('#');}
          if(!bs1){videoinfo2=  str1[1].split('#');}
          if(!bs2){videoinfo3=  str1[2].split('#');}
          

        }
       
       }
      
    
    //   var reg = /https:\/\/(.+?).m3u8/ig
    //   var list = []
    //   var list1 = []
    //   var result = null
    //   do {
    //     result = reg.exec(str)
    //     result && list.push(result[1])
    //   } while (result)
 
    //  for (var index in list){
    //    var str1 =""; 
    //    str1 = "https://"+list[index]+".m3u8"
    //   list1.push(str1)
    //   }
      if(res.statusCode==200){
        
       var url =videoinfo1.length>0?videoinfo1[0].split('$')[1]:"";
       
        that.setData({
         
          //videoInfo:res.data.data.videoInfo,
          //首次打开加载第一集
          url:url,
          image:res.data.Data.items[0].vod_pic,
          //urllist:list1,
          //设置播放来源1
          videoinfo1:videoinfo1,
          //设置播放来源2
          videoinfo2:videoinfo2,
          //设置播放来源3
          videoinfo3:videoinfo3,
        });
        
      }
    }
  })

                          }
   
  },
 
  //选集
  changeName: function (e) {

    this.setData({
      url:e.currentTarget.dataset.name.split('$')[1],
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 20000
     });
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
} )