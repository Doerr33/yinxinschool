// components/schooltool/schooltool.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        toolConfig:{
            type:Object,
            value:{}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        navToDetail(e){
            console.log(e);
            wx.navigateTo({
              url: this.properties.toolConfig.toolPath,
            })
        }
    }
})
