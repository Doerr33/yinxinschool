// pages/addlife/addlife.js
const checkUserInfo = require("../../../utils/checkUserInfo");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        locationConfig:{},
        phone:'',
        location:'',
        userInfo: null,
        images: [],
        // picker组件
        pickerIndex: 0,
        pickerIndex1: 0,
        plate: "3.选择标记点分类",
        pickerArray: ['快递', '学院', '篮球场', '教学楼', '行政楼', '食堂', '学生宿舍', '体育场所', '生活服务'],
        plate1: "4.选择校区",
        pickerArray1: ['崇山校区', '蒲河校区'],
        database: 'location'
    },
    textareaAInput(e){
        this.setData({
            location:e.detail.value
        })
    },
    textareaBInput(e){
        this.setData({
            phone:e.detail.value
        })
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
    getPickerIndex1(e) {
        console.log("父组件接受picker", e);
        const {
            index
        } = e.detail;
        console.log(index);
        this.setData({
            pickerIndex1: index
        })
    },
    choosePosition(e) {
        var that = this;
        var timestamp = Date.parse(new Date());
        console.log("选择位置");
        wx.chooseLocation({

        }).then(res => {
            console.log("选择位置成功", res);
            let locationConfig = {};
            // 配置标记点
            locationConfig.address = res.address;
            locationConfig.id = timestamp;
            locationConfig.latitude = res.latitude;
            locationConfig.longitude = res.longitude;
            locationConfig.iconPath = "/images/mini-location.png";
            locationConfig.height = 30;
            locationConfig.width = 30;
            locationConfig.phone = this.data.phone;
            locationConfig.callout =  {
                "bgColor": "#ffffff",
                "borderColor": "gray",
                "borderRadius": 5,
                "borderWidth": 1,
                "content": this.data.location,
                "display": "ALWAYS",
                "fontSize": 13,
                "padding": 2
            };
            
            that.setData({
                locationConfig
            })
        })
    },
    onLoad() {
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
})