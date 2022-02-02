// index.js
// const app = getApp()
const {
  envList
} = require('../../envList.js');

Page({
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    swiperListSubject: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, ],
    iconMenuList: [{
      id: 0,
      classIfy: '校园生活',
      path: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
      iconUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"
    }, {
      id: 1,
      classIfy: '校园工具',
      path: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      iconUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"
    }, {
      id: 2,
      classIfy: '校园空间',
      path: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
      iconUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"

    }, {
      id: 3,
      classIfy: '后勤服务',
      path: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
      iconUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"
    }, {
      id: 4,
      classIfy: '与我相关',
      path: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
      iconUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"
    }],
    workStudyProgramList:[{
      id: 0,
      workStudyName: '方便速食',
      Introduction:`
      1.负责银杏所合作的驾校市场宣传，招生
      2.组建和管理校园驾校代理
      3.积极参与银杏校园市场培训
      4.收入2500-4000/月
      5.报名联系微信:17202015403
      `,
      imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
    }, {
      id: 1,
      workStudyName: '校园生活',
      Introduction:`
      1.负责银杏所合作的驾校市场宣传，招生
      2.组建和管理校园驾校代理
      3.积极参与银杏校园市场培训
      4.收入2500-4000/月
      5.报名联系微信:17202015403
      `,
      imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    },]
  },
});