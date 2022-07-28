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
    fileID:''
  },
  // 生命周期函数
  onLoad(options){
    this.getBackground();
  },
  // 获取index页面背景
  getBackground(e){
    console.log(e);
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