/**
 * RNTemplate - Register
 * http://menger.me
 * @大梦
 */

'use strict';
import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import loginStyle from '../../style/loginStyle'
import {FormValidation} from '../../utils/validation/FormValidation'
import {inject, observer} from 'mobx-react'

@inject('loginStore')
@observer
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                phone_number: '',
                code: '',
                password: '',
                re_password: '',
                invitation_code: '',
                request_method: Constants.USER_PWD_REG,
            },
            time: 60,
            codeBtnText: '获取验证码'
        }
    }

    // 更新表单数据
    setDataSource = (key, data) => {
        let {formData} = this.state
        formData[key] = data
        this.setState({
            formData: formData
        })
    };

    componentDidMount(){
        
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
                code_type: Constants.CODE_REGISTER,
                phone: formData.phone_number
            };
            let result = await Services.post(url, data);
            if (result.code == StatusCode.SUCCESS_CODE) {
                ToastManager.success('短信发送成功，请注意查收');
                this.countDown()
            } else {
                ToastManager.fail(result.msg);
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
            this._showRegisterResult(Constants.REGISTER_SUCCESS);
        } else if (result.code === StatusCode.FAIL_CODE) {
            ToastManager.warn(result.msg);
        }
    };

    _showRegisterResult = (type) => {
        let content = (
            <View style={[styles.tReleaseBoxStyle]}>
                <View style={styles.shadeBoxStyle}></View>
                <View style={[Predefine.flexMiddle,Predefine.flexCenter,styles.tReleaseContentStyle]}>
                    <ImageView
                        resizeMode={'contain'}
                        style={styles.iconStyle}
                        source={Images.icon_result_success}
                    />
                    <Text style={[styles.titleStyle]}>注册成功</Text>
                    <Button
                        title={'立即登录'}
                        style={[styles.btnStyle]}
                        onPress={() => {
                            AlertManager.hide();
                            this._doLogin();
                        }}
                    />
                </View>
            </View>
        );
        let params = {
            detail: content,
            option: {
                modal: true,
            }
        }
        AlertManager.show(params);
    };

    _doLogin = async () => {
        let {loginStore} = this.props;
        let {formData} = this.state;
        let url = ServicesApi.LOGIN;
        let result = await loginStore.doLogin(url, formData);
        if (result.code !== StatusCode.SUCCESS_CODE) {
            ToastManager.warn(result.msg);
            RouterHelper.goBack();
        }
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

                    <Text style={loginStyle.titleStyle}>新用户注册</Text>
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
                                <TextInput style={[loginStyle.formTextInput, loginStyle.codeInputStyle]}
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
                            <Text style={loginStyle.formLabelStyle}>密码</Text>
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
                        <View style={loginStyle.formItemStyle}>
                            <View style={[Predefine.flexRow]}>
                                <Text style={Predefine.FontColorD}>*</Text>
                                <Text style={loginStyle.formLabelStyle}>邀请码</Text>
                            </View>
                            <TextInput style={loginStyle.formTextInput}
                                placeholder={'上级推荐人提供，必填'}
                                placeholderTextColor={'#999'}
                                onChangeText={(text) => this.setDataSource('invitation_code', text)}
                                defaultValue={formData.invitation_code}
                            />
                        </View>
                        <View style={[Predefine.flexRow, loginStyle.formTipsView]}>
                            <Text style={loginStyle.registerTextStyle}
                                onPress={() => RouterHelper.navigate('', 'Login')}
                            >已有账号？去登录</Text>
                        </View>
                        <View style={loginStyle.btnWrapStyle}>
                            <Button
                                title={'注册'}
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

const styles = StyleSheet.create({
    btnWrapStyle: {
        marginBottom: 50,
    },
    tReleaseContentStyle: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    iconStyle: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
    titleStyle: {
        color: Predefine.colorS,
        fontSize: 16,
        fontWeight: '600',
        marginTop: 15,
    },
    title1Style: {
        color: '#E35252',
    },
    btnStyle: {
        height: 36,
        width: 140,
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderRadius: 20,
        backgroundColor: '#47C149',
        marginTop: 30,
    },
    btn1Style: {
        backgroundColor: '#E35252'
    },
});
