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
    lifeList: [],
    // 显示点赞评论面板,当index和获取到的信息的index一致时显示
    showOperationPannelIndex: -1,
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
    console.log("showOperationPannel", e)
    var index = e.currentTarget.dataset.index;
    if (this.data.showOperationPannelIndex == index) {
      this.setData({
        showOperationPannelIndex: -1
      })
    } else {
      this.setData({
        showOperationPannelIndex: index
      })
    }
  },
  // 获取life信息
  getLifeList(e) {
    db.get().then(res => {
      console.log("获取生活信息", res);
      res.data.forEach((v, i) => {
        console.log("picker", v);
        switch (v.pickerIndex) {
          case 0:
            this.setData({
              lifeList: this.data.lifeList.concat(v)
            })
          
        }
      })
    })
  },
  // 点赞函数
  async clickLearnLike(e) {
    console.log("点赞函数", e.currentTarget.dataset.index);
    await this.checkUserInfo();
    await this.clickLike(e.currentTarget.dataset.index)
  },
  // 判断用户是否登录
  checkUserInfo() {
    return new Promise((resolve, reject) => {
      let userInfo = checkUserInfo.checkUserInfo();
      if (userInfo != null) {
        this.setData({
          userInfo: userInfo
        })
        resolve(userInfo);
      } else {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        reject("未登录");
      }
      console.log("检查1");
    })
  },
  clickLike(index) {
    return new Promise(resolve => {
      let lifeLearnData = this.data.lifeList[index];
      let likeList = lifeLearnData.likeList;
      var isHaveLove = false;
      likeList.forEach((v, i) => {
        if (this.data.userInfo.openid == v.openid) {
          isHaveLove = true;
          likeList.splice(i, 1);
          console.log(likeList);
          wx.cloud.callFunction({
            name: 'lifeClickLike',
            data: {
              type: 0,
              circleId: lifeLearnData._id
            }
          }).then(res => {
            console.log("取消赞成功", res);
          }).catch(err => {
            console.error("取消赞失败", err);
          })
          // 取消赞
          lifeLearnData.isLove = false;
        }
      })
      if (!isHaveLove) {
        // 本地点赞
        likeList.push({
          nickName: this.data.userInfo.nickName,
          openid: this.data.userInfo.openid
        });
        wx.cloud.callFunction({
          name: 'lifeClickLike',
          data: {
            type: 1,
            circleId: lifeLearnData._id,
            nickName: this.data.userInfo.nickName
          }
        }).then(res => {
          console.log("点赞成功", res);
        }).catch(err => {
          console.error("点赞失败", err);
        })
        // 点赞
        lifeLearnData.isLove = true;
      }

      this.setData({
        lifeList: this.data.lifeList,
        showOperationPannelIndex: -1
      })
      console.log("调用函数2");
    })
  },

  // 预览图片
  viewImages(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let src = e.currentTarget.dataset.src["url"];
    let urls = [];
    let images = this.data.lifeList[index].images;
    for(let i = 0; i < images.length; i++){
      urls.push(images[i].url);
    }
    wx.previewImage({
      current:src,
      urls: urls,
    })
  },
  onLoad(e) {
    this.getNeed();
    this.getLifeList();
    console.log();
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
  },
  onShow() {
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
  }
})