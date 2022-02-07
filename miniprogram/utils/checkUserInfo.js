let userInfo = null;
function checkUserInfo() {
  if (getApp().globalData.userInfo) {
    userInfo = getApp().globalData.userInfo
  } else if(wx.getStorageSync('userInfo')){
    userInfo = JSON.parse(wx.getStorageSync('userInfo'))
  } else{
    userInfo = null;
  }
  return userInfo
}
module.exports = {
  checkUserInfo
}