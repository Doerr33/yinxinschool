// pages/addlife/addlife.js
const checkUserInfo = require("../../utils/checkUserInfo.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    images: [],
    // picker组件
    pickerIndex: 0,
    plate: "信息板块",
    pickerArray: ['学习', '活动', '讨论'],
    database:'schoollife'
  },
  imagesChange(e) {
    const {
      images
    } = e.detail;
    console.log(e);
    this.setData({
      images
    })
  },
  // 获取pickerIndex
  getPickerIndex(e) {
    console.log("父组件接受picker", e);
    const {
      index
    } = e.detail;
    console.log(index);
    this.setData({
      pickerIndex: index
    })
  },
  onLoad(){
    let userInfo = checkUserInfo.checkUserInfo();
    if(userInfo != null){
      this.setData({
        userInfo:userInfo
      })
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  onShow(){
    this.setData({
      userInfo:getApp().globalData.userInfo
    })
  }
})