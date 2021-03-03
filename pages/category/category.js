import { getMovies } from '../../api/api'

const app = getApp()
var list = {};
Page({
  data: {
    nodata: false,
    loading: false,
    activeMenu: {
      category: '电影',
      genre: '全部',
      country: '全部',
      year: '全部'
    },
    
    menus: [{
        type: 'category',
        list: ['电影',  '动漫', '电视剧', '综艺']
      },
      {
        type: 'genre',
        list: ['全部', '爱情', '科幻', '动画', '战争', '恐怖', '喜剧', '动作', '灾难', '剧情', '悬疑', '犯罪', '冒险', '传记', '情色', '音乐', '家庭']
      },
      {
        type: 'country',
        list: ['全部', '大陆', '美国', '英国', '法国', '香港', '日本', '德国', '韩国', '意大利', '加拿大', '台湾', '西班牙', '印度']
      },
      {
        type: 'year',
        list: ['全部', 2021,2020,2019,2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, '2010-2005', '2004-2000', '90年代', '80年代', '更早']
      },
    ],
    
    movies: [],
    page: 1
  },

  onLoad() {
    
    let page = this.data.page
    let params = {
      page,
      ...this.data.activeMenu
    }
    this.getCurrentVideo(params);
  },
  getCurrentVideo(params){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
     });
    if(params.category=="电影"){
      params.category="1";
    }else if(params.category=="电视剧"){
      params.category="2";
    }else if(params.category=="综艺"){
      params.category="3";
    }else{
      params.category="4";
    }
    var  videoId = params.country+"," +params.genre+","+params.page+","+params.category+","+params.year;
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
    url:"https://xmyy.xingmengwenzhang.com/wxApi/public/?service=App.Mov.GetCategory&type="+params.category+"&classid="+params.genre+"&area="+params.country+"&year="+params.year+"&sort=0&page="+params.page+"&limit=18&sign="+sign,
     //url:"https://xmyy.xingmengwenzhang.com/wxApi/public/?service=App.Mov.SearchVod&key="+videoId+"&sign="+sign,
     success(res){
       
    // list.push(res.data.Data)
    var  k = (params.page-1)*18-1
      for(var i in res.data.Data){
        k++;
        list[k]=res.data.Data[i];
    }
      //console.log(list)
       if(res.statusCode==200){
        wx.hideToast();
         that.setData({
           videoinfo:list,
         });
       }
     }
   })
       }
                           
    
   },
  // 点击菜单
  ontapMenuHandle(e) {
    //当前页面赋初始值
    this.data.page = 1;
    //储存资源清空
    list = {};
     let menuType = 'activeMenu.' + e.currentTarget.dataset.type
     let word = e.currentTarget.dataset.word

    this.setData({

      [menuType]: word
    })
    let page = this.data.page

    let params = {
      page,
      ...this.data.activeMenu
    }
    this.getCurrentVideo(params)
  },
//暂时没用
  getQuery() {
    // this.setData({
    //   page: 1,
    //   nodata: false,
    //   movies: []
    // })

    // this.getMovies()
  },

  // 暂时没用
  async getMovies() {
    if (this.data.nodata || this.data.loading) return  // 无更多数据

    this.setData({ loading: true })

    let page = this.data.page

    let params = {
      page,
      ...this.data.activeMenu
    }

    // 删除‘全部’菜单类别
    for(let key in params) {
      if(params[key] === '全部') delete params[key]
    }

    let res = await getMovies(params)

    if (page === 1) wx.stopPullDownRefresh()  // 关闭下拉刷新

    if (res.data.length === 0 && page === 1) { // 无数据
      this.setData({
        nodata: true,
        loading: false
      })
      return
    }

    this.data.movies.push(...res.data)

    this.setData({
      page: ++page,
      movies: this.data.movies
    }, _ => {
      this.setData({
        loading: false
      })
    })
  },

  //暂时没用  下拉刷新，重置所有参数
  onPullDownRefresh() {
    this.getQuery()
  },

  // 上拉加载更多
  onReachBottom() {
    let page = this.data.page
     page = page +1 ;
     this.data.page = page;
     let params = {
      page,
      ...this.data.activeMenu
    }
    this.getCurrentVideo(params)
    //this.getMovies()
  },

  // 路由跳转
  navigateTo(e) {
    wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.dataset.id,
    })

    //app.navigateTo(e)
  },

  onShareAppMessage(res) {
    return {
      title: '遇见好电影',
      imageUrl: app.config.shareImg || '',
      path: '/pages/category/category'
    }
  },
})