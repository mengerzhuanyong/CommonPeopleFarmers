/**
* @Author nanfeng
* @CreatTime 2019-12-03
* @Des CatPumping
*/

'use strict';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { Predefine } from '../../../config/predefine';
import Constants from '../../../config/constant';

export default class CatPumping extends React.Component {

    static defaultProps = {
        type: Constants.PUMPING_CAT,
        pumpnum: 0,
    }

    constructor(props) {
        super(props);
        this.state = {
            pageTitle: '抽猫卡',
            pumpnum: props.pumpnum,
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pumpnum != nextProps.pumpnum) {
            this.setState({pumpnum:nextProps.pumpnum})
            this.forceUpdate();
        }
    }

    // 发送请求->领取猫卡改变提醒状态
    requestReceive = async () => {
        let {item, callback} = this.props
        let url = ServicesApi.CAT_RECEIVE;
        let data = {
            id: item.id
        };
        let result = await Services.post(url, data);
        if (result.code == StatusCode.SUCCESS_CODE) {
            AlertManager.hide()
            callback()
        }
    };

    render() {
        let { item, pumpnum, type, onPressToOpenRedCat, tips } = this.props
        console.log('item---->', item);
        return (
            <View style={styles.ruleBoxStyle}>
                <ImageBackground
                    source={Images.img_cat_bg_model}
                    style={[Predefine.flexMiddle, Predefine.flexAround, styles.ruleBgStyle]}
                    resizeMode={'stretch'}
                >
                    <Text style={styles.ruleTitleStyle}>{tips || item.cat_name}</Text>
                    <View style={[Predefine.RCC, styles.imgBoxStyle]}>
                        <ImageView
                            source={{uri: item.cat_img}}
                            style={styles.imgStyle}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={[Predefine.RCC, styles.btnWarpStyle]}>
                        <Button
                            style={styles.btnStyle}
                            titleStyle={styles.btnTitleStyle}
                            backgroundImage={Images.img_cat_btn_bg_give}
                            resizeMode={'stretch'}
                            onPress={this.requestReceive}
                            title={'继续抽卡 x' + pumpnum}
                        />
                        {item.cat_code == Constants.RED_CAT  && item.cat_count > 0 ? <Button
                            style={styles.btnStyle}
                            titleStyle={styles.btnTitleStyle}
                            backgroundImage={Images.img_cat_btn_bg_give}
                            resizeMode={'stretch'}
                            onPress={onPressToOpenRedCat}
                            title={'立即打开 x' + item.cat_count}
                        /> : null}
                    </View>
                    <TouchableOpacity
                        style={[Predefine.flexMiddle,Predefine.flexCenter,styles.closeBtnStyle]}
                        onPress={()=> {
                            AlertManager.hide()
                        }}
                    >   
                        <ImageView
                            source={Images.icon_close}
                            style={styles.closeImgStyle}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ruleBgStyle: {
        width: Predefine.screenWidth - 50,
        height:  Predefine.screenWidth,
    },
    ruleTitleStyle: {
        fontSize: 20,
        color: '#C35700',
        fontWeight: '600',
        textAlign: 'center',
    },
    imgStyle: {
        width: 148,
        height: 134,
    },
    btnStyle: {
        width: (Predefine.screenWidth - 100) / 2,
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
        marginHorizontal: 5,
        height: 50,
    },
    btnTitleStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EE4C0F',
    },
    closeBtnStyle: {
        width: 30,
        height: 30,
        borderRadius: 16,
        backgroundColor: '#fff',
        position: 'absolute',
        top: -10,
        right: -10,
    },
    closeImgStyle: {
        width: 14,
        height: 14,
    },
})