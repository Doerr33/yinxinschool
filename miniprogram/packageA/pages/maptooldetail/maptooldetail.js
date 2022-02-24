// pages/jianjie/jianjie.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        marker: null,
    },
    navigatorToMap(e) {
        wx.openLocation({ // 打开微信内置地图，实现导航功能（在内置地图里面打开地图软件）
            latitude: this.data.marker.latitude,
            longitude: this.data.marker.longitude,
            name: this.data.marker.location,
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("标记点ID", options.markerId);
        console.log("标记信息", options.markerContent);
        this.setData({
            marker: JSON.parse(decodeURIComponent(options.markerContent))
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
        return {
            title: '辽大简介'
        }
    },
    onShareTimeline: function (res) {
        return {
            title: '辽大简介',
            query: '辽大简介'
        }
    }
})