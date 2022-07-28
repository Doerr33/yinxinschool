// pages/map/map.js
var that = this;
const db = wx.cloud.database('loaction');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        changeSchool: 0,
        tabCur: 0,
        // 缩放视野，包含标记点
        points: [{
                latitude: 41.8313281021969,
                longitude: 123.41337203979492
            },
            {
                latitude: 41.8369557564654,
                longitude: 123.40152740478516
            }
        ],
        // tab里面的内容
        tabContent: ['快递', '学院', '篮球场', '教学楼', '行政楼', '食堂', '学生宿舍', '体育场所', '生活服务'],
        // 地图标记点
        // 保存一个副本
        markers: [],
        markerss: [],
        latitude: null,
        longitude: null,
    },
    // *******************************导航栏选择获取id和导航栏的位置**************************************
    changeTabs(e) {
        console.log("父组件接受", e.detail.index);
        let index = e.detail.index;
        this.setData({
            tabCur: index
        })
        let tabCur = this.data.index;
        let schoolChange = this.data.changeSchool;
        this.changeMarkersData(tabCur, schoolChange);
    },
    changeSchool(e) {
        let school = !e.detail.school ? 1 : 0;
        console.log("切换学校", school);
        this.setData({
            changeSchool: school
        })
        if (school == 1) {
            this.setData({
                latitude: 41.926563,
                longitude: 123.38693,
            })
        } else {
            this.setData({
                latitude: 41.833904,
                longitude: 123.40555,
            })
        }
        let tabCur = this.data.index;
        let schoolChange = this.data.changeSchool;
        this.changeMarkersData(tabCur, schoolChange);
    },
    changeMarkersData(tabCur, school) {
        let markersData = this.data.markers;
        let markers = [];
        for (let i = 0; i < markersData.length; i++) {
            if (markersData[i].classify == this.data.tabCur && markersData[i].school == this.data.changeSchool) {
                markers.push(markersData[i]);
            }
        }
        for (let i = 0; i < markers.length; i++) {
            markers[i].id = i;
        }
        console.log("切换的数据", markers);
        this.setData({
            markerss: markers
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    // 获取标记点
    getLocation() {
        let that = this;
        wx.cloud.callFunction({
                name: 'getMapToolList'
            })
            .then(res => {
                console.log("获取map成功", res);
                let locationData = {};
                let locaTionArray = [];
                for(let i = 0; i < res.result.data.length; i++){
                    console.log(i);
                    locationData.location = res.result.data[i].location;
                    locationData.classify = res.result.data[i].pickerIndex;
                    locationData.school = res.result.data[i].pickerIndex1;
                    locationData.latitude = res.result.data[i].locationConfig.latitude;
                    locationData.longitude = res.result.data[i].locationConfig.longitude;
                    locationData.address = res.result.data[i].locationConfig.address;
                    locationData.iconPath = res.result.data[i].locationConfig.iconPath;
                    locationData.height = res.result.data[i].locationConfig.height;
                    locationData.width = res.result.data[i].locationConfig.width;
                    locationData.callout = res.result.data[i].locationConfig.callout; 
                    locationData.id = i; 
                    locationData.phone = res.result.data[i].locationConfig.phone; 
                    // detail
                    locationData.images = res.result.data[i].images;
                    locationData.content = res.result.data[i].content;
                    locaTionArray.push(locationData);
                    locationData = {};
                }
                
                
                that.setData({
                    markers: locaTionArray,
                    markerss: locaTionArray
                })
            })
            .catch(err => {
                console.error("获取map失败", err);
            })
    },
    addLocation(e) {
        wx.navigateTo({
            url: '../maptooladd/maptooladd',
        })
    },
    bindMarkerTap(e) {
        this.bindCalloutTap(e);
    },

    bindCalloutTap(e) {
        let markerId = e.markerId;
        let markerIndex = this.data.markerss.findIndex((element) => {
            return element.id == markerId;
        })
        console.log("标记点index",markerIndex);
        let marker = this.data.markerss[markerIndex];
        console.log("标记点信息",marker);
        marker = encodeURIComponent(JSON.stringify(marker));
        wx.navigateTo({
            url: `../maptooldetail/maptooldetail?markerId=${markerId}&markerContent=${marker}`,
        })
    },
    onLoad: function (options) {
        // 获取map列表
        this.getLocation();
        this.setData({
            latitude: 41.83355044524474,
            longitude: 123.40609788894653,
        })
    },
    onShow() {
        // // 显示页面获取map列表
        // this.getLocation();
        // this.setData({
        //     latitude: 41.83355044524474,
        //     longitude: 123.40609788894653
        // })
    },
    onReady() {

    },
    onShareAppMessage: function () {
        return {
            title: '校园导览'
        }
    },
    onShareTimeline: function (res) {
        return {
            title: '校园导览',
            query: '校园导览'
        }
    }
})