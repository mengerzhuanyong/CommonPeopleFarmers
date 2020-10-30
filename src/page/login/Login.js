/**
 * RNTemplate - Login
 * http://menger.me
 * @大梦
 */
'use strict';
import React from 'react';
import {StyleSheet, Text, TextInput, View, Keyboard} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import loginStyle from '../../style/loginStyle'
import {FormValidation} from '../../utils/validation/FormValidation'
import {inject, observer} from 'mobx-react'

@inject('loginStore')
@observer
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            formData: {
                phone_number: '',
                password: '',
            },
        }
    }

    // 更新表单数据
    setDataSource = (key, data, refresh) => {
        let {formData} = this.state
        if (refresh) {
            formData[key] = data
            this.setState({
                formData: formData
            })
        } else {
            this.state.formData[key] = data
        }
    }

    // 提交表单
    onSubmit = () => {
        let {formData} = this.state;

        let _accountIndex = Constants.DEV_ACCOUNT.findIndex(item => item === formData.phone_number);
        if ((__DEV__ && formData.phone_number === '') || _accountIndex > -1) {
            formData.phone_number = '15066886007';
            formData.password = '123123';
        }

        if (FormValidation(formData)) this.requestSubmit();
    }

    // 发送请求->登录
    requestSubmit = async () => {
        Keyboard.dismiss();
        let {loginStore} = this.props;
        let {formData} = this.state;
        let url = ServicesApi.LOGIN;
        let data = formData;
        let result = await loginStore.doLogin(url, data);
    };

    render() {
        let {formData} = this.state;
        let nav_option = this.params.hideReturn ? {renderLeftAction: null} : {};
        return (
            <PageContainer
                style={loginStyle.container}
            >
                <NavigationBar
                    {...nav_option}
                    statusBarStyle={'dark-content'}
                    style={Predefine.transparentNavBar}
                />
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'handled'}
                    style={loginStyle.contentBoxStyle}
                >
                    <Text style={loginStyle.titleStyle}>账号登录</Text>
                    <Text style={loginStyle.tipsStyle}>登录后享受更多权益</Text>
                    <View style={loginStyle.formBoxStyle}>
                        <View style={loginStyle.formItemStyle}>
                            <Text style={loginStyle.formLabelStyle}>账号</Text>
                            <TextInput
                                style={loginStyle.formTextInput}
                                placeholder={'请输入手机号'}
                                placeholderTextColor={'#999'}
                                onChangeText={(text) => this.setDataSource('phone_number', text)}
                                keyboardType={'phone-pad'}
                                maxLength={11}
                                defaultValue={formData.phone_number}
                            />
                        </View>
                        <View style={loginStyle.formItemStyle}>
                            <Text style={loginStyle.formLabelStyle}>密码</Text>
                            <TextInput
                                style={loginStyle.formTextInput}
                                placeholder={'请输入密码'}
                                placeholderTextColor={'#999'}
                                onChangeText={(text) => this.setDataSource('password', text)}
                                secureTextEntry={true}
                                defaultValue={formData.password}
                            />
                        </View>
                        <Button
                            style={loginStyle.okBtnStyle}
                            title={'登录'}
                            titleStyle={loginStyle.okBtnTitleStyle}
                            onPress={this.onSubmit}
                        />
                        <View style={[Predefine.flexRow, Predefine.flexBetween, loginStyle.formTipsView]}>
                            <Text
                                style={loginStyle.registerTextStyle}
                                onPress={() => RouterHelper.navigate('', 'Register')}
                                // onPress={() => this.props.navigation.navigate('Register')}
                            >注册账号</Text>
                            <View style={[Predefine.RCE, styles.guestBtnWrap]}>
                                <Text
                                    style={[styles.guestBtn, loginStyle.registerTextStyle]}
                                    onPress={() => RouterHelper.navigate('', 'Tab')}
                                >游客浏览</Text>
                                <Text
                                    style={loginStyle.forgetTextStyle}
                                    onPress={() => RouterHelper.navigate('', 'Forget')}
                                >忘记密码？</Text>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </PageContainer>
        );
    }
}
const styles = StyleSheet.create({
    guestBtn: {
        fontSize: 14,
        color: '#999',
        marginRight: 10,
    },
});
