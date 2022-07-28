// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()
const db = cloud.database().collection("mineCamera")

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return db.orderBy('time', 'desc').get()
}