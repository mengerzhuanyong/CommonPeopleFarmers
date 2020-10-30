/**
 * RNTemplate - App
 * http://menger.me
 * @大梦
 */

'use strict';

import React, {useState, useEffect} from 'react'
import {AppState, BackHandler, Linking, StyleSheet, ToastAndroid, View, Text} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import RouterContainer from '../routers/RouterContainer'
import XPay from 'react-native-puti-pay'
import JShareModule from 'jshare-react-native'
// import CheckVersion from '../utils/CheckVersion'
import {inject, observer} from 'mobx-react'

@inject('loginStore')
@observer
export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // 初始化设置，先调用
        this._initSetting();
        // 检查系统版本
        this._checkVersion();
        // 处理登陆状态
        this._handleLoginState();
        // 获取当前位置
        this._getCurrentPosition();


        // 通知,先调用
        // this._addPushListener();
        // 设备信息
        // this._addDeviceInfo();
        // 处理外部跳转链接
        // this._addLinkingListener();
        // 网络状态
        // this._addNetworkListener();
        // app前台还是后台
        // this._addAppStateListener();
    };

    // 初始化设置
    _initSetting = () => {
        if (__IOS__) {
            // 启动极光分享 ios需要
            JShareModule.setup()
        } else {
            // 仅仅在安卓调用
            // JPushModule.initPush();
            // JPushModule.notifyJSDidLoad(resultCode => {
            //     if (resultCode === StatusCode.SUCCESS_CODE) {
            //     }
            // })
        }
        // debug模式
        JShareModule.setDebug({enable: __DEV__});
        //设置微信ID
        XPay.setWxId(Constants.WECHAT_APPID);
        //设置支付宝URL Schemes
        XPay.setAlipayScheme(Constants.ALIPAY_SCHME);
        // 显示竖屏
        // Orientation.lockToPortrait()
    };

    // 检查系统版本
    _checkVersion = async () => {
        // CheckVersion();
    };

    // 获取当前位置
    _getCurrentPosition = async () => {
        let {loginStore} = this.props;
        let _locationInfo = await loginStore.getCurrentPosition();
        // console.log('_locationInfo---->', _locationInfo);
    };

    // 处理登陆状态
    _handleLoginState = async () => {
        const firstOpen = await StorageManager.load(Constants.FIRST_OPEN);
        const localRes = await StorageManager.load(Constants.USER_INFO_KEY);
        // console.log('localRes---->', localRes);
        if (firstOpen.code === StatusCode.SUCCESS_CODE && !firstOpen.data) {
            if (localRes.code === StatusCode.SUCCESS_CODE && localRes.data) {
                if (localRes.data.token === undefined || localRes.data.token === '') {
                    // 未登录
                    this.timer1 = setTimeout(() => {
                        // RouterHelper.reset('', 'Login');
                        SplashScreen.hide();
                    }, 500);
                } else {
                    // 已经登录
                    // console.log('111---->', 111);
                    global.token = localRes.data.token;
                    this._checkTokenStatus(localRes);
                }
            } else {
                this.timer2 = setTimeout(() => {
                    // RouterHelper.reset('', 'Login');
                    SplashScreen.hide();
                }, 500);
            }
        } else {
            // 第一次安装app
            this.timer3 = setTimeout(() => {
                    // RouterHelper.reset('', 'Welcome', {
                //     onCallBack: () => this._clearTimeout(),
                // });
                SplashScreen.hide();
            }, 500);
        }
    };

    _checkTokenStatus = async (localRes) => {
        let {loginStore} = this.props;
        try {
            let result = await loginStore.getLatestUserInfo();
            if (result) {
                // console.log('result---->', StatusCode.TOKEN_EXPIRED_CODE, result);
                if (result.code === StatusCode.SUCCESS_CODE) {
                    this.timer4_1 = setTimeout(() => {
                        RouterHelper.reset('', 'Tab');
                    }, 10);
                } else if (result.code === StatusCode.TOKEN_EXPIRED_CODE) {
                    this.timer5_1 = setTimeout(() => {
                        RouterHelper.navigate('', 'Login');
                    }, 10);
                }
                this.timer4_2 = setTimeout(() => {
                    SplashScreen.hide();
                }, 500);
            } else {
                SplashScreen.hide();
            }
        } catch (e) {
            // console.log(e);
            // loginStore.cleanUserInfo();
            SplashScreen.hide();
        }
    };

    _clearTimeout = () => {
        let times = [this.timer1, this.timer2, this.timer3, this.timer4_1, this.timer4_2];
        ClearTimer(times);
    };

    render() {
        return (
            <RouterContainer />
        );
    }
}