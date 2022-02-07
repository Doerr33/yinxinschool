const MAX_IMG_NUM = 9;
const db = wx.cloud.database();
const js_date_time = require('../../utils/js_date_time.js')
const checkUserInfo = require("../../utils/checkUserInfo.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object,
      value: null
    },
    images: {
      type: Array,
      value: []
    },
    // pickerid
    pickerIndex: {
      type: Number,
      value: 0
    },
    // 传过来的数据库
    database: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // chooseMedia设置对象
    chooseImgSetting: {
      // 可选数量
      count: 9,
      // 文件类型
      mediaType: ['image'],
      // 文件来源
      sourceType: ['album', 'camera'],
      // 是否压缩
      sizeType:['original', 'compressed'],
      // 拍摄时长
      maxDuration: 60,
      // 摄像头选择
      camera: 'back',
    },
    imagesID:[],
    images: [],
    // 输入内容
    content: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 添加图片
    chooseMedias(e) {
      // 自定义事件：子向父传递信息
      this.chooseMediasAPI();
    },
    chooseMediasAPI() {
      // 设置最多还能选择多少张
      let max = MAX_IMG_NUM - this.properties.images.length;
      let chooseImgSetting = this.data.chooseImgSetting;
      chooseImgSetting.count = max;
      wx.chooseMedia(chooseImgSetting)
        .then(res => {
          // 获取临时链接
          const {
            tempFiles
          } = res;
          this.dealTempFilePath(tempFiles);
        }).catch(err => {
          console.error(err);
        })
    },
    // 处理临时链接
    dealTempFilePath(tempFiles) {
      // 提取出临时链接方便传递给父组件
      let imagesList = [];
      // 遍历提取images
      tempFiles.forEach((v, i) => {
        imagesList.push(v.tempFilePath)
      })
      console.log("提取images", imagesList);
      this.setData({
        images: this.properties.images.concat(imagesList)
      })
      let images = this.data.images;
      console.log(images);
      // 定义自定义事件向父组件传递数据
      this.triggerEvent("imagesChange", {
        images
      });
    },
    uploadImages(index) {
      return new Promise((resolve,reject)=>{
        wx.cloud.uploadFile({
          cloudPath: 'schoolLife/' + new Date().getTime() + "_" + Math.floor(Math.random() * 1000) + ".jpg",
          filePath: this.properties.images[index], // 文件路径
        }).then(res => {
          resolve(res)
          console.log("上传成功",res);
          this.data.imagesID.push(res.fileID)
        }).catch(err => {
          this.setData({
            imagesID:[]
          })
          wx.showToast({
            icon:"none",
            title: '图片上传失败···',
          })
          reject(err)
        })
      })
    },
    // 预览图片
    viewImages(e) {
      let index = e.currentTarget.dataset.index;
      wx.previewImage({
        current: this.properties.images[index],
        urls: this.properties.images,
      })
    },
    // 删除图片
    delImages(e) {
      console.log(e);
      let index = e.currentTarget.dataset.index;
      wx.showModal({
        title: '删除',
        content: '是否删除',
        cancelText: '否',
        confirmText: '是',
        success: res => {
          if (res.confirm) {
            // 删除指定索引位置的元素
            this.properties.images.splice(index, 1);
            let images = this.properties.images;
            // 定义自定义事件向父组件传递数据
            this.triggerEvent("imagesChange", {
              images
            });
          }
        }
      })
    },
    inputContent(e) {
      console.log(e.detail.value);
      this.setData({
        content: e.detail.value
      })
    },
    async publishInfo(e) {
      // 表单验证
      if (!this.checkForm()) {return;}
      wx.showLoading({
        title: '图片上传中···',
      })
      for(let i = 0; i < this.data.images.length; i++){
         await this.uploadImages(i);
      }
      await console.log("imageID",this.data.imagesID);
      await this.publish();
      wx.navigateBack({
        delta: 1,
      })
    },
    publish(e){
      db.collection(this.properties.database).add({
        data: {
          content:this.data.content,
          images:this.data.imagesID,
          pickerIndex:this.data.pickerIndex,
          userInfo:this.data.userInfo,
          likeList:[],
          commentList:[],
          time:js_date_time.js_date_time(new Date())
        }
      }).then(res => {
        wx.showLoading({
          title: '发布中···',
        })
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })
        console.log(res);
      })
    },
    checkForm() {
      if (this.data.content == '') {
        wx.showToast({
          icon: 'none',
          title: '内容不能为空',
        })
        return false;
      }
      return true
    },
  }
})