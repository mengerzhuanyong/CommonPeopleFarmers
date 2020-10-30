/**
* @Author nanfeng
* @CreatTime 2019-11-28
* @Des RegisterResult
*/

'use strict';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Predefine } from '../../config/predefine';
import RouterHelper from '../../routers/RouterHelper';

export default class RegisterResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: '注册结果',
            success: false,
            show: false,
        }
    }

    componentDidMount() {
    }

    // 关闭
    close () {
        this.setState({
            show: false
        });
    }

    // 开启
    open (type) {
        let {success} = this.state
        if (type == 'success') success = true
        else success = false
        this.setState({
            show: true,
            success: success,
        });
    }

    // 注册失败
    pressFailBtn = () => {
        // this.close()
        AlertManager.hide();
    }

    // 注册成功
    pressSuccessBtn = () => {
        ToastManager.hide();
        RouterHelper.goBack()
    }
    

    render() {
        let {show,success} = this.state
        if (success) {
            return (
                <View style={[styles.tReleaseBoxStyle,!show ? styles.hide : '']}>
                    <View style={styles.shadeBoxStyle}></View>
                    <View style={[Predefine.flexMiddle,Predefine.flexCenter,styles.tReleaseContentStyle]}>
                        <ImageView
                            source={Images.icon_result_success}
                            style={styles.iconStyle}
                            resizeMode={'contain'}
                        />
                        <Text style={styles.titleStyle}>注册成功</Text>
                        <Button
                            style={styles.btnStyle}
                            onPress={this.pressSuccessBtn}
                            title={'去登陆'}
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <View style={[styles.tReleaseBoxStyle,!show ? styles.hide : '']}>
                    <View style={styles.shadeBoxStyle}></View>
                    <View style={[Predefine.flexMiddle,Predefine.flexCenter,styles.tReleaseContentStyle]}>
                        <ImageView
                            source={Images.icon_result_fail}
                            style={styles.iconStyle}
                            resizeMode={'contain'}
                        />
                        <Text style={[styles.titleStyle,styles.title1Style]}>注册失败</Text>
                        <Button
                            style={[styles.btnStyle,styles.btn1Style]}
                            onPress={this.pressFailBtn}
                            title={'重新注册'}
                        />
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    hide: {
        display: 'none',
    },
    tReleaseBoxStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        zIndex: 10,
    },
    shadeBoxStyle: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(0,0,0,.6)',
    },
    tReleaseContentStyle: {
        backgroundColor: '#fff',
        position: 'absolute',
        top: '40%',
        left: '50%',
        width: 300,
        borderRadius: 6,
        padding: 20,
        marginLeft: -150,
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
})