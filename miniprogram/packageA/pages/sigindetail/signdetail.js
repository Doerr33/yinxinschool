// packageA/pages/sigindetail/signdetail.js
const checkUserInfo = require("../../../utils/checkUserInfo");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:null,
        fileID:''
    },
    createQR(e) {
        this.getQR('qr');
    },
    getMiniapp() {
        this.getQR("miniapp");
    },
    getUnlimited() {
        this.getQR("unlimited");
    },

    getQR(type) {
        let userInfo = this.data.userInfo;
        console.log(userInfo);
        wx.cloud.callFunction({
            name: 'getQrcode',
            data: {
                type,
                userInfo
            }
        }).then(res => {
            console.log(res);
            let fileID = res.result;
            this.setData({
                fileID
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
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
        let userInfo = checkUserInfo.checkUserInfo();
        if (userInfo != null) {
            this.setData({
                userInfo: userInfo
            })
        } else {
            wx.navigateTo({
                url: '/pages/login/login',
            })
        }
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