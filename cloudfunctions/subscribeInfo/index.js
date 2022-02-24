const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        "touser": 'oivb85QVaalr1xq0RfKDvwcST2yA',
        "page": 'index',
        "lang": 'zh_CN',
        "data": {
          "thing1": {
            "value": '点赞消息提醒'
          },
          "thing2": {
            "value": '20'
          },
          "thing3": {
            "value": '银杏校园'
          },
        },
        "templateId": 'Er4q6nVn9QW2F1i6XF7kuSeDY8KStAg89mVBJ1DNxPg',
        "miniprogramState": 'developer'
      })
    return result
  } catch (err) {
    return err
  }
}