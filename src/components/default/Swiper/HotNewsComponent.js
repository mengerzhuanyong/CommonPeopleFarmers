/**
 * RNTemplate - HotNewsComponent
 * http://menger.me
 * @大梦
 */

import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import { Carousel } from 'teaset';

export default class HotNewsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false,
            data: this.props.data,
        };
    }

    static defaultProps = {
        data: [],
    };

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                swiperShow: true
            });
        }, 0)
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.data);
        this.setState({
            data: nextProps.data
        });
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    renderNotice = (row) => {
        if (row.length <= 0) {
            return null;
        }
        const notices = row.map((item, index) => {
            return (
                <TouchableOpacity
                    style={[Predefine.RCC, styles.noticeItemView]}
                    key={"notice_" + index}
                    activeOpacity={1}
                    onPress={() => RouterHelper.navigate('', 'RaidersDescription')}
                >
                    <Text style={styles.noticeContext} numberOfLines={1} ellipsizeMode={'middle'}>{item.title}</Text>
                    <Text style={styles.noticeBonus} numberOfLines={1}>{item.bonus}</Text>
                </TouchableOpacity>
            )
        });
        // 这里不能输出信息，否则会陷入死循环
        return notices;
    };

    render() {
        const { data } = this.props;
        return (
            <View style={styles.container}>
                <ImageView
                    resizeMode={'contain'}
                    style={styles.noticeIcon}
                    source={Images.icon_win}
                />
                {data.length > 0 ?
                    <Carousel
                        control={false}
                        interval={5000}
                        horizontal={false}
                        style={styles.noticeContainer}
                    >{this.renderNotice(data)}</Carousel>
                    : <View style={styles.noticeContainer} />
                }
                <Button
                    tintColor={'#333'}
                    resizeMode={'contain'}
                    style={styles.btnArrowStyle}
                    iconStyle={styles.noticeImgArrowStyle}
                    icon={Images.icon_user_arrow_right}
                    onPress={() => RouterHelper.navigate('', 'RaidersDescription')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },

    noticeContainer: {
        flex: 1,
        height: 30,
        justifyContent: 'center',
        marginVertical: 10,
    },
    noticeIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
        resizeMode: 'contain',
    },
    noticeItemView: {
        flex: 1,
        height: 30,
        justifyContent: 'center',
    },
    noticeContext: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    noticeBonus: {
        marginLeft: 5,
        fontSize: 14,
        color: '#e72d1f',
        fontWeight: '700',
    },
    btnArrowStyle: {
        paddingVertical: 0,
        paddingHorizontal: 0,
        backgroundColor: 'transparent',
    },
    noticeImgArrowStyle: {
        width: 10,
        height: 14,
        tintColor: '#999',
    },
});