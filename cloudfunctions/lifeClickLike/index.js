// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// Command.pull(value: any): Command
// 数组更新操作符。给定一个值或一个查询条件，将数组中所有匹配给定值或查询条件的元素都移除掉。

const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    const {
        type, //是点赞1， 还是取消赞 0
        circleId, //当前操作的circle id
        nickName, // 昵称
        
      } = event;
      const wxContext = cloud.getWXContext()
      if (type == 0) {
        // 取消赞用更新方法
        return db.collection('schoollife').doc(circleId).update({
            data: {
              // 删除_openid
              likeList: _.pull({
                openid: wxContext.OPENID
              })
            }
          })
          .then(res => {
            return {
              code : 200,
              errMsg:'取消赞成功'
            }
          })
          .catch(err => {
            return {
              code : 300,
              errMsg:'取消赞失败'
            }
          })
      } else if (type == 1) {
        return db.collection('schoollife').doc(circleId).update({
            data: {
              // 点赞
              likeList: _.push({
                openid: wxContext.OPENID,
                nickName:nickName
              })
            }
          })
          .then(res => {
            return {
              code : 200,
              errMsg:'点赞成功'
            }
          })
          .catch(err => {
            return {
              code : 300,
              errMsg:'点赞失败'
            }
          })
      }
}