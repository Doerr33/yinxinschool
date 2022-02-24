// components/scrollview_y/scrollview_y.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabContent: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        changeSchool:true,
        TabCur: 0,
        tabContentComponents: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeTabs(e) {
            let index = e.currentTarget.dataset.index;
            this.setData({
                TabCur:index
            })
            // 子向父传递数据：自定义事件
            this.triggerEvent("tabsChange", { index });
        },
        changeSchool(e){
            console.log("切换学校",e);
            let school = this.data.changeSchool;
            school = !school;
            this.setData({
                changeSchool:school
            })
            this.triggerEvent('schoolChange',{ school })
        }
    }
})