/**
 * RNTemplate - 系统常量 - 系统默认
 * http://menger.me
 * @大梦
 */

'use strict';

const VERSION_DATA = require('../../../app.json');

export default {
    /**
     * @开发测试账号
     */
    DEV_ACCOUNT: [
        '001',
        'asd',
        'dev',
    ],

    /**
     * @版本
     */
    APP_PLATFORM: 1,
    VERSION_CODE: VERSION_DATA.version_code,
    VERSION_NAME: VERSION_DATA.version_name,

    /**
     * @七牛云图片裁剪
     */
    IMAGE_CROP_OPTIONS: '?imageView2/2/w/100/h/100',

    /**
     * @首次打开APP
     */
    FIRST_OPEN: 'FIRSTOPEN',

    /**
     * @存储用户信息
     */
    USER_INFO_KEY: 'USERINFOKEY',

    /**
     * @数据类型
     */
    DATE: 'date',
    TIME: 'time',
    TEXT: 'text',
    ARRAY: 'array',
    IMAGE: 'image',
    INPUT: 'input',
    SELECT: 'select',
    TEXTAREA: 'textArea',
    DATE_TIME: 'datetime',

    /**
     * @分享参数
     */
    // 微信好友
    SHARE_WE_CHAT: 1,
    // 微信朋友圈
    SHARE_TIME_LIME: 2,
    // QQ好友
    SHARE_QQ: 3,
    // QQ空间
    SHARE_QQ_ZONE: 4,
    // 复制链接
    SHARE_LINK: 5,

    /**
     * @地区选择插件
     */
    // 热门城市
    HOT_CITY: '热门城市',

    /**
     * @Button Icon 定位
     */
    POSITION_TOP: 'top',
    POSITION_LEFT: 'left',
    POSITION_RIGHT: 'right',
    POSITION_BOTTOM: 'bottom',


};