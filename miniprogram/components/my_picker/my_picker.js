// components/my_picker/my_picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    plate:{
      type:String,
      value:''
    },
    pickerArray: {
      type:Array,
      value:[]
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    index:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindChangePicker(e){
      const index = e.detail.value;
      this.setData({
        index
      })
      this.triggerEvent("PickerIndex",{index});
    }
  }
})
