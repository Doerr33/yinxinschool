// components/icon_menu/icon_menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconMenuList:{
      type:Array,
      value:[]
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
    toDetail(e){
      let index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url:"/" +  this.properties.iconMenuList[index].path
      })
    }
  }
})