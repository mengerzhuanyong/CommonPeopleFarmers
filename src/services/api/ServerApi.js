/**
 * RNTemplate - ServerApi
 * http://menger.me
 * @大梦
 */

'use strict';

const HOST = 'http://todo.3todo.com';
const API_HOST = HOST + '/api/';
const API_HOST_V1 = API_HOST + 'v1/';
const H5_HOST = HOST + '/wap/';

const QI_NIU_HOST = 'http://qiniu-todo.3todo.com/';
const QI_NIU_UPLOAD_HOST = 'http://up-z0.qiniup.com';

export default {
    /**
     * @系统 [HOST]
     */
    HOST: HOST,
    API_HOST: API_HOST,
    API_HOST_V1: API_HOST_V1,

    /**
     * @资源 [APP图标]
     */
    ICON_APP: API_HOST_V1 + '/icon_app.png',

    /**
     * @七牛云
     */
    // 七牛主域名
    QI_NIU_HOST,
    // 上传地址
    QI_NIU_UPLOAD_HOST,
    // 获取token
    GET_OSS_TOKEN: API_HOST_V1 + 'Qiniu/up_token',

    /**
     * @百度云
     */
    // AccessToken
    BAIDU_ACCESS_TOKEN: API_HOST_V1 + 'Consumer/baiduToken',
    // 公安验证
    PERSON_VERIFY: 'https://aip.baidubce.com/rest/2.0/face/v3/person/verify',

    /**
     * @公共API
     */
    // 短信验证码
    SEND_SMS: API_HOST_V1 + 'Util/send_sms',
    
    /**
     * @Login
     **/
    // 注册/忘记密码
    REGISTER: API_HOST_V1 + 'Register/index',
    // 登录
    LOGIN: API_HOST_V1 + 'Login/index',

    /**
     * @首页
     **/
};