// components/swiper/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接收父组件传过来的swiper信息
    // 是一个对象
    swiperList:{
      // 数据类型
      type:Array,
      // 默认值,不传递就是空数组
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 轮播图index
    cardCur: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // cardSwiper
    cardSwiper(e) {
      // 只是判断一下index，方便改变样式
      this.setData({
        cardCur: e.detail.current
      })
    },
    viewImages(e){
      console.log(e);
      let src = e.currentTarget.dataset.src;
      let swiperList = this.properties.swiperList;
      let urls = []
      Object.values(swiperList).forEach(values => {
        urls.push(values.url);
      });
      console.log(urls);
      wx.previewImage({
        current: src,
        urls: urls,
      })
    }
  }
})
