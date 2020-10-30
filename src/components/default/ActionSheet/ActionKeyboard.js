'use strict';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View} from 'react-native'
import { Predefine } from '../../../config/predefine'

export default class ActionKeyboard extends React.PureComponent {

    static defaultProps = {
        showInfo: false,
        price: 0,
        balance: 0,
        balanceName: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            price: props.price,
            balance: props.balance,
            balanceName: props.balanceName,
            password: '',
            keyArr: [...new Array(6)]
        }
    }

    hideActions = () => {
        ActionManager.hide();
    };

    // 获取按键值
    pressKey (num) {
        let {password} = this.state
        let passwordArr = password.split('')
        if (num === 11) passwordArr = []
        else if (num === 12) passwordArr.pop()
        else passwordArr.push(num)
        this.setState({password: passwordArr.join('')}, ()=> {
            if (passwordArr.length == 6) this.successPressKey()
        })
    }

    // 输入成功
    successPressKey () {
        let {password} = this.state
        let {callback} = this.props
        callback(password)
        this.hideActions();
    }
    
    componentDidMount(){
    }

    renderPasswordItem () {
        let {password, keyArr} = this.state
        let passwordArr = password.split('')
        let content = keyArr.map((item, index) => {
            return (
                <View key={index} style={[styles.nkbPasswordItemStyle, index < 1 && styles.nkbPasswordItemCurStyle]}>
                    {passwordArr[index] ? <View style={[styles.nkbPasswordTextStyle,styles.bgBlank]}></View> : <View style={styles.nkbPasswordTextStyle}></View>}
                </View>
            )
        });
        return content;
    }

    _renderAccountInfo = (showInfo) => {
        let { price, balance, balanceName } = this.state
        if (showInfo) {
            return (
                <View style={styles.viewStyle}>
                    <View style={styles.nkbPriceStyle}>
                        <Text style={styles.nkbpriceTextStyle}>支付</Text>
                        <Text style={[styles.nkbpriceTextStyle, styles.nkbPriceNumStyle]}>{price}</Text>
                        <Text style={styles.nkbpriceTextStyle}>{balanceName}</Text>
                    </View>
                    <View style={styles.nkbBalanceStyle}>
                        <Text style={styles.nkbBalanceTextStyle}>{balanceName}余额：</Text>
                        <Text style={[styles.nkbBalanceTextStyle,styles.nkbBalanceNumStyle]}>{balance}</Text>
                    </View>
                </View>
            );
        }
        return null;        
    };

    render(){
        let { price, balance } = this.state
        let {showInfo} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.nkbShadowStyle}>
                    <View style={styles.nkbTopStyle}>
                        <Button
                            style={styles.returnBtnStyle}
                            iconStyle={styles.btnIconStyle}
                            icon={Images.icon_keyBoard_left}
                            onPress={() => this.hideActions()}
                        />
                        <Text style={styles.nkbTopTitleStyle}>安全键盘</Text>
                    </View>
                    {this._renderAccountInfo(showInfo)}
                    <View style={styles.nkbPasswordStyle}>
                        {this.renderPasswordItem()}
                    </View>
                    <View style={styles.nkbBoardStyle}>
                        <View style={styles.nkbBoardTrStyle}>
                            <TouchableHighlight
                                // activeOpacity={0.6}
                                underlayColor={'#eee'}
                                style={styles.nkbBoardItemStyle}
                                onPress={()=>this.pressKey(1)}
                            >
                                <Text style={styles.nkbBoardTextStyle}>1</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                // activeOpacity={0.6}
                                underlayColor={'#eee'}
                                style={styles.nkbBoardItemStyle}
                                onPress={()=>this.pressKey(2)}
                            >
                                <Text style={styles.nkbBoardTextStyle}>2</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                // activeOpacity={0.6}
                                underlayColor={'#eee'}
                                style={styles.nkbBoardItemStyle}
                                onPress={()=>this.pressKey(3)}
                            >
                                <Text style={styles.nkbBoardTextStyle}>3</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.nkbBoardTrStyle}>
                            <TouchableHighlight
                                // activeOpacity={0.6}
                                underlayColor={'#eee'}
                                style={styles.nkbBoardItemStyle}
                                onPress={()=>this.pressKey(4)}
                            >
                                <Text style={styles.nkbBoardTextStyle}>4</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                // activeOpacity={0.6}
                                underlayColor={'#eee'}
                                style={styles.nkbBoardItemStyle}
                                onPress={()=>this.pressKey(5)}
                            >
                                <Text style={styles.nkbBoardTextStyle}>5</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                // activeOpacity={0.6}
                                underlayColor={'#eee'}
                                style={styles.nkbBoardItemStyle}
                                onPress={()=>this.pressKey(6)}
                            >
                                <Text style={styles.nkbBoardTextStyle}>6</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.nkbBoardTrStyle}>
                            <TouchableHighlight
                                // activeOpacity={0.6}
                                underlayColor={'#eee'}
                                style={styles.nkbBoardItemStyle}
                                onPress={()=>this.pressKey(7)}
                            >
                                <Text style={styles.nkbBoardTextStyle}>7</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                // activeOpacity={0.6}
                                underlayColor={'#eee'}
                                style={styles.nkbBoardItemStyle}
                                onPress={()=>this.pressKey(8)}
                            >
                                <Text style={styles.nkbBoardTextStyle}>8</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                // activeOpacity={0.6}
                                underlayColor={'#eee'}
                                style={styles.nkbBoardItemStyle}
                                onPress={()=>this.pressKey(9)}
                            >
                                <Text style={styles.nkbBoardTextStyle}>9</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.nkbBoardTrStyle}>
                            <TouchableHighlight
                                // activeOpacity={0.6}
                                underlayColor={'#fefefe'}
                                style={[styles.nkbBoardItemStyle,styles.bgGrey]}
                                onPress={()=>this.pressKey(11)}
                            >
                                <Text style={styles.nkbBoardTextStyle}>清空</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                // activeOpacity={0.6}
                                underlayColor={'#eee'}
                                style={styles.nkbBoardItemStyle}
                                onPress={()=>this.pressKey(0)}
                            >
                                <Text style={styles.nkbBoardTextStyle}>0</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                // activeOpacity={0.6}
                                underlayColor={'#fefefe'}
                                style={[styles.nkbBoardItemStyle,styles.bgGrey]}
                                onPress={()=>this.pressKey(12)}
                            >
                                <ImageView
                                    source={Images.icon_keyBoard_del}
                                    style={styles.iconDelStyle}
                                    resizeMode={'contain'}
                                />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingBottom: Predefine.isNotchedScreen ? Predefine.screenInset.bottom : 0,
    },
    nkbShadowStyle: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#fff',
    },
    nkbTopStyle: {
        flexDirection: 'row',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderColor: '#eee',
        borderBottomWidth: 1,
    },
    returnBtnStyle: {
        left: 0,
        width: 22,
        height: 44,
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    btnIconStyle: {
        width: 20,
        height: 20,
        tintColor: '#333',
    },
    nkbTopTitleStyle: {
        fontSize: 18,
        color: '#000',
    },
    nkbPriceStyle: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nkbPriceNumStyle: {
        fontSize: 20,
        fontWeight: '600',
        color: 'red',
    },
    nkbpriceTextStyle: {
        fontSize: 18,
        color: '#333',
    },
    nkbBalanceStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    nkbBalanceTextStyle: {
        fontSize: 14,
        color: '#999'
    },
    nkbBalanceNumStyle: {
        fontSize: 16,
        color: '#333'
    },
    nkbPasswordStyle: {
        height: 45,
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    nkbPasswordItemStyle: {
        flex: 1,
        borderColor: '#eee',
        borderLeftWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nkbPasswordItemCurStyle: {
        borderLeftWidth: 0,
    },
    nkbPasswordTextStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    bgBlank: {
        backgroundColor: '#333'
    },
    // keyboard
    nkbBoardStyle: {
    },
    nkbBoardTrStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#eee',
        borderTopWidth: 1,
    },
    nkbBoardItemStyle: {
        flex: 1,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#eee',
        borderLeftWidth: 1,
    },
    bgGrey: {
        backgroundColor: '#eee',
    },
    iconDelStyle: {
        height: 30,
    },
});
