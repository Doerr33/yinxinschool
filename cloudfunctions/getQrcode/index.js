// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const log = cloud.logger()

const uploadFile = async function(arrayBuffer,path){
    let {fileID} = await cloud.uploadFile({
        cloudPath: path,
        fileContent: arrayBuffer,
    })
    return fileID
}

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const type = event.type
    let userInfo = event.userInfo
    console.log(userInfo);
    log.info({type})

    let result
    switch (type) {
        case "qr":
            try{
                let {
                    buffer 
                } = await cloud.openapi.wxacode.createQRCode({
                    path: 'page/index/index?userInfo=' + userInfo,
                    width: 430
                })
                fileID = await uploadFile(buffer,'qr.jpg')
                return fileID
            }catch(err){
                log.error({
                    err
                })
                return err
            }
            break;
        case 'miniapp':
            try{
                let {
                    buffer 
                } = await cloud.openapi.wxacode.get({
                    path: 'page/index/index?userInfo=' + userInfo,
                    width: 430
                })
                fileID = await uploadFile(buffer,'miniapp.jpg')
                return fileID
            }catch(err){
                log.error({
                    err
                })
                return err
            }
            break;
        case 'unlimited':
            try{
                let {
                    buffer 
                } = await cloud.openapi.wxacode.getUnlimited({
                    scene:userInfo,
                    path: 'page/index/index',
                    width: 430
                })
                fileID = await uploadFile(buffer,'unlimited.jpg')
                return fileID
            }catch(err){
                log.error({
                    err
                })
                return err
            }
            break;
    }
    
}