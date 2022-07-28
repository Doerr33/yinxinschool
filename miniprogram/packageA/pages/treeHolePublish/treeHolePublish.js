// pages/publish-tree/publish-tree.js
var that;
const db = wx.cloud.database().collection("mineTree");
const js_date_time = require("../../../utils/js_date_time");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        time: null,
        context: null,
    },

    textareaAInput(e) {
        that.setData({
            context: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
        // 获取用户信息，登录界面存储到本地
        that.setData({
            userInfo: getApp().globalData.userInfo,
        })
    },
    publishNews() {
        var time = js_date_time.js_date_time(new Date())
        console.log("当前时间", time);
        // 表单验证也可以这么做
        // 如果文字填写内容为空 并且 没有添加图片 给用户提示
        if (that.data.context == null) {
            wx.showToast({
                icon: 'none',
                title: '内容不能为空',
            })
            // 直接返回,不进行操作
            return;
        }
        wx.showLoading({
            title: '发布中',
        })
        db.add({
            data: {
                userInfo: that.data.userInfo,
                content: that.data.context,
                time: time,
            },
            success: function (res) {
                console.log("news publish success:", res);
                wx.hideLoading()
                wx.showToast({
                    title: '发表成功',
                })
                wx.navigateBack({
                    delta: 1,
                })
            }
        })
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