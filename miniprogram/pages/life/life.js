// pages/life/life.js
const checkUserInfo = require("../../utils/checkUserInfo.js");
const db = wx.cloud.database().collection('schoollife');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    swiperList: [],
    msgList: [],
    tabs: [],
    // 获取信息列表
    lifeList:[],
    // 显示点赞评论面板
    showLoveCommPannel: false,
    // 点赞列表
    likeList: [],
  },

  // tabs自定义事件
  tabsChange(e) {
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    // 最严谨的写法
    // let tabs = JSON.parse(JSON.stringify(this.data.tabs))
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  // 跳转添加页面
  toAddLife(e) {
    wx.navigateTo({
      url: '/pages/addlife/addlife',
    })
  },
  getNeed() {
    wx.cloud.database().collection("background").get()
      .then(res => {
        console.log(res);
        this.setData({
          swiperList: res.data[1].lifeSwiperList,
          msgList: res.data[1].lifeMsgList,
          tabs: res.data[1].tabs
        })
      })
  },
  // 显示点赞评论面板
  showLikeCommentPannel(e) {
    this.setData({
      showLoveCommPannel: this.data.showLoveCommPannel ? false : true
    })
  },

  onLoad(e) {
    this.getNeed();
    this.getLifeList();
  },
  getLifeList(e){
    db.get().then(res=>{
      console.log("获取生活信息",res);
      res.data.forEach((v,i)=>{
        console.log("picker",v);
        switch(v.pickerIndex){
          case 0:
            this.setData({
              lifeList:this.data.lifeList.concat(v)
            })
        }
      })
    })
  }
})