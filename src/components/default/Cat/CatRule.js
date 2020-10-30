'use strict';
import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    View,
    ImageBackground,
} from 'react-native';
import { Predefine } from '../../../config/predefine';

export default class CatRule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // pageTitle: 'CatRule',
            ruleArr: []
        }
    }

    componentDidMount() {
        this.requestTips()
    }
    // 请求规则列表数据
    requestTips = async () => {
        let url = ServicesApi.RULE_CATRULE;
        let data = {};
        let result = await Services.post(url, data);
        if (result.code == StatusCode.SUCCESS_CODE) {
            // ToastManager.success('')
            this.setState({ruleArr: result.data})
        } else if (result.code === StatusCode.FAIL_CODE) {
            ToastManager.warn(result.msg)
        }
    }

    renderRuleTiem = () => {
        let { ruleArr } = this.state
        let content = ruleArr && ruleArr.length !== 0 && ruleArr.map((item, index) => {
            return (
                <View key={index} style={[Predefine.flexRow,Predefine.flexTop,styles.ruleContentItemStyle]}>
                    <View style={[Predefine.CCC, styles.ruleIndexBoxStyle]}>
                        <Text style={styles.ruleIndexStyle}>{index + 1}</Text>
                    </View>
                    <Text style={styles.rulePagraStyle}>{item.rule}</Text>
                </View>
            )
        })
        return content
    }

    render() {
        return (
            <TouchableOpacity style={styles.ruleBoxStyle}>
                <ImageBackground
                    source={Images.img_bg_cat_rule}
                    style={styles.ruleBgStyle}
                    resizeMode={'stretch'}
                >
                    <Text style={styles.ruleTitleStyle}>活动规则</Text>
                    <ScrollView style={styles.scrollStyle}>
                        {this.renderRuleTiem()}
                    </ScrollView>
                    <TouchableOpacity
                        style={[Predefine.flexMiddle,Predefine.flexCenter,styles.closeBtnStyle]}
                        onPress={()=>  AlertManager.hide()}
                    >   
                        <ImageView
                            source={Images.icon_close}
                            style={styles.closeImgStyle}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    ruleBgStyle: {
        width: Predefine.screenWidth - 50,
        height:  Predefine.screenWidth * 1.2,
    },
    scrollStyle: {
        marginBottom: 30,
    },
    ruleTitleStyle: {
        lineHeight: 40,
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    ruleContentItemStyle: {
        marginLeft: 30,
        width: 220,
        marginBottom: 10,
    },
    ruleIndexBoxStyle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#FF4300',
        marginRight: 5,
    },
    ruleIndexStyle: {
        fontSize: 11,
        color: '#fff',
    },
    rulePagraStyle: {
        fontSize: 14,
        lineHeight: 20,
        // color: Predefine.color,
    },
    closeBtnStyle: {
        width: 30,
        height: 30,
        borderRadius: 16,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    closeImgStyle: {
        width: 14,
        height: 14,
    },
})