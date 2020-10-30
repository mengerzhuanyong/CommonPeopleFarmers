/**
 * RNTemplate - SendSMS
 * http://menger.me
 * @大梦
 */

'use strict';

import React, {PureComponent} from 'react'
import {Keyboard, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import {VerticalLine} from "../index"
import Constants from '../../../config/constant'
import { Predefine } from '../../../config/predefine';

export default class SendSMS extends PureComponent {

    static defaultProps = {
        type: Constants.SMS_NORMAL,
        mobile: '',
        style: null,
        titleStyle: null,
        lineStyle: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            seconds: 60,
            mobile: props.mobile,
            secureTextEntry: true,
            codeAlreadySend: false,
        };
        this.lastActionTime = 0;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            mobile: nextProps.mobile
        })
    }

    componentWillUnmount() {
        this.timerInterval && clearInterval(this.timerInterval);
    }

    getVerificationCode = async (mobile, type) => {
        Keyboard.dismiss();
        let url = ServicesApi.UTIL_SEND_SMS;
        let data = {
            mobile,
            type,
        };
        if (!mobile) {
            ToastManager.message('请输入手机号');
            return;
        }
        try {
            let result = await Services.post(url, data);
            if (result.code === StatusCode.SUCCESS_CODE) {
                this.countDownTimer();
                ToastManager.message('验证码已发送，请注意查收！');
            } else {
                console.log('result---->', result);
                ToastManager.message(result.msg);
            }
        } catch (e) {
            // console.log('e---->', e);
        }
    };

    // 验证码倒计时
    countDownTimer() {
        this.setState({
            codeAlreadySend: true,
            seconds: 60,
        });
        this.timerInterval = setInterval(() => {
            if (this.state.seconds === 0) {
                return clearInterval(this.timerInterval);
            }
            this.setState({
                seconds: this.state.seconds - 1
            });
        }, 1000);
    };

    render() {
        let {type, style, titleStyle, lineStyle} = this.props;
        let {mobile, seconds, codeAlreadySend} = this.state;
        if (!codeAlreadySend) {
            return (
                <TouchableOpacity
                    style={[styles.btnViewStyle, style]}
                    onPress={() => this.getVerificationCode(mobile, type)}
                >
                    <VerticalLine style={[styles.verLine, lineStyle]}/>
                    <Text style={[styles.titleStyle, titleStyle]}>获取验证码</Text>
                </TouchableOpacity>
            );
        } else if (seconds === 0) {
            return (
                <TouchableOpacity
                    style={[styles.btnViewStyle, style]}
                    onPress={() => this.getVerificationCode(mobile, type)}
                >
                    <VerticalLine style={[styles.verLine, lineStyle]}/>
                    <Text style={[styles.titleStyle, titleStyle]}>重新获取</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <View style={[styles.btnViewStyle, style]}>
                    <VerticalLine style={[styles.verLine, lineStyle]}/>
                    <Text style={[styles.titleStyle, titleStyle]}>剩余{seconds}秒</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    btnViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleStyle: {
        color: Predefine.themeColor,
        fontSize: 14,
    },
    verLine: {
        height: 20,
        marginRight: 10,
        backgroundColor: '#333',
    },
});