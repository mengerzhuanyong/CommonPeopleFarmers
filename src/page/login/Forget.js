/**
 * RNTemplate - Forget
 * http://menger.me
 * @大梦
 */

'use strict';
import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import loginStyle from '../../style/loginStyle'
import {FormValidation} from '../../utils/validation/FormValidation'

export default class Forget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                phone_number: '',
                code: '',
                password: '',
                re_password: '',
                request_method: Constants.USER_PWD_EDIT,
            },
            time: 60,
            codeBtnText: '获取验证码'
        }
    }

    componentWillUnmount () {
        this.timer && clearInterval(this.timer);
    }

    // 获取验证码
    requestGetCodeSms = async () => {
        let {formData, time} = this.state
        if (time < 60) return false
        if (FormValidation(formData, 'phone_number', true)) {
            let url = ServicesApi.SEND_SMS;
            let data = {
                phone: formData.phone_number,
                code_type: Constants.CODE_RECOVER,
            };
            let result = await Services.post(url, data);
            if (result.code == StatusCode.SUCCESS_CODE) {
                ToastManager.success('短信发送成功，请注意查收')
                this.countDown()
            } else {
                ToastManager.warn(result.msg);
            }
        }
    };

    // 倒计时
    countDown = () => {
        let {time} = this.state
        this.timer = setInterval(()=> {
            if (time == 0){
                clearInterval(this.timer);
                this.setState({
                    time: 60,
                    codeBtnText: '获取验证码'
                })
            } else{
                this.setState({
                    time: time,
                    codeBtnText: time + '秒后重新获取'
                })
            }
            time--
        }, 1000)
    }

    // 提交表单
    onSubmit = () => {
        let {formData} = this.state
        if (FormValidation(formData)) this.requestSubmit()
    }

    // 发送请求
    requestSubmit = async () => {
        Keyboard.dismiss();
        let {formData} = this.state
        let url = ServicesApi.REGISTER;
        let data = formData;
        let result = await Services.post(url, data);
        if (result.code == StatusCode.SUCCESS_CODE) {
            ToastManager.success('密码重置成功，请使用新密码登录');
            setTimeout(()=> {
                RouterHelper.goBack()
            }, 1000);
        } else if (result.code === StatusCode.FAIL_CODE) {
            ToastManager.warn(result.msg)
        }
    };

    // 更新表单数据
    setDataSource = (key, data) => {
        let {formData} = this.state
        formData[key] = data
        this.setState({
            formData: formData
        })
    };

    render() {
        let {formData, codeBtnText, time} = this.state
        return (
            <PageContainer
                fitNotchedScreen={Predefine.isNotchedScreen}
                style={loginStyle.container}
            >
                <NavigationBar
                    // style={Predefine.transparentNavBar}
                />
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'handled'}
                    style={loginStyle.contentBoxStyle}
                >
                    <Text style={loginStyle.titleStyle}>重置密码</Text>
                    <View style={loginStyle.formBoxStyle}>
                    <View style={loginStyle.formItemStyle}>
                            <Text style={loginStyle.formLabelStyle}>手机号</Text>
                            <TextInput style={loginStyle.formTextInput}
                                placeholder={'请输入手机号'}
                                placeholderTextColor={'#999'}
                                onChangeText={(text) => this.setDataSource('phone_number', text)}
                                keyboardType={'phone-pad'}
                                maxLength={11}
                                defaultValue={formData.phone_number}
                            />
                        </View>
                        <View style={loginStyle.formItemStyle}>
                            <Text style={loginStyle.formLabelStyle}>验证码</Text>
                            <View style={[Predefine.flexRow]}>
                                <TextInput style={loginStyle.formTextInput, loginStyle.codeInputStyle}
                                    placeholder={'请输入验证码'}
                                    placeholderTextColor={'#999'}
                                    keyboardType={'numeric'}
                                    maxLength={6}
                                    onChangeText={(text) => this.setDataSource('code', text)}
                                    defaultValue={formData.code}
                                />
                                <Text
                                    style={time == 60 ? loginStyle.codeBtnStyle : loginStyle.codeBtnActiveStyle}
                                    onPress={this.requestGetCodeSms}
                                >{codeBtnText}</Text>
                            </View>
                        </View>
                        <View style={loginStyle.formItemStyle}>
                            <Text style={loginStyle.formLabelStyle}>新密码</Text>
                            <TextInput style={loginStyle.formTextInput}
                                placeholder={'请输入新密码'}
                                placeholderTextColor={'#999'}
                                onChangeText={(text) => this.setDataSource('password', text)}
                                secureTextEntry={true}
                                defaultValue={formData.password}
                            />
                        </View>
                        <View style={loginStyle.formItemStyle}>
                            <Text style={loginStyle.formLabelStyle}>确认密码</Text>
                            <TextInput style={loginStyle.formTextInput}
                                placeholder={'请再次输入密码'}
                                placeholderTextColor={'#999'}
                                onChangeText={(text) => this.setDataSource('re_password', text)}
                                secureTextEntry={true}
                                defaultValue={formData.re_password}
                            />
                        </View>
                        <View style={loginStyle.btnWrapStyle}>
                            <Button
                                title={'立即找回'}
                                style={loginStyle.okBtnStyle}
                                titleStyle={loginStyle.okBtnTitleStyle}
                                onPress={this.onSubmit}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </PageContainer>
        );
    }
}

const styles = StyleSheet.create({});