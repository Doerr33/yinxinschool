// index.js
// const app = getApp()
const {
  envList
} = require('../../envList.js');
// // 1. 获取数据库引用
const db = wx.cloud.database().collection("background");
Page({
  data: {
    backGround:[],
    
  },
  // 生命周期函数
  onLoad(){
    this.getBackground();
  },
  // 获取index页面背景
  getBackground(){
    db.get()
    .then(res=>{
      this.setData({
        backGround:res.data[0]
      })
    })
    .catch(err=>{
      throw err;
    })
  }
});