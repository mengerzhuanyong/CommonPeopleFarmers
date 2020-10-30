/**
 * RNTemplate - HomeGameItem
 * http://menger.me
 * @大梦
 */

'use strict';

import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import {Predefine} from '../../../config/predefine'


export default class HomeGameItem extends React.PureComponent {

    static defaultProps = {
        item: '',
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        let {item, style, onPress} = this.props;
        return (
            <TouchableOpacity
                style={[styles.container, style]}
                onPress={onPress}
            >
                <View style={[Predefine.RCB, styles.commonPaddingStyle, styles.itemTitleView]}>
                    <ImageView
                        source={item.img}
                        style={styles.itemPhotoStyle}
                    />
                    <Button
                        title={'立即进入'}
                        onPress={onPress}
                        style={styles.itemBtnStyle}
                        titleStyle={styles.itemBtnTitleStyle}
                    />
                </View>
                <View style={[styles.commonPaddingStyle, styles.itemTimeView]}>
                    <Text style={styles.itemLotteryTimeStyle}>开奖时间：{item.lottery_time}</Text>
                    <Text style={styles.itemEndTimeStyle}>本期截止时间：{item.end_time}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    commonPaddingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    itemTitleView: {
    },
    itemPhotoStyle: {
        height: 60,
        width: Predefine.screenWidth * 0.6,
    },
    itemBtnStyle: {
        height: 30,
        borderRadius: 0,
        marginRight: -15,
        paddingVertical: 0,
        paddingHorizontal: 15,
        borderTopLeftRadius: 30,
        backgroundColor: '#e72d1f',
        borderBottomLeftRadius: 30,
    },
    itemBtnTitleStyle: {},
    itemTimeView: {
        paddingHorizontal: 15,
        backgroundColor: '#fef4f6',
    },
    itemLotteryTimeStyle: {
        fontSize: 13,
        color: '#333',
        fontWeight: '800',
    },
    itemEndTimeStyle: {
        fontSize: 12,
        color: '#999',
        marginTop: 10,
    },
});