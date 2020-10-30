/**
 * RNTemplate - BannerComponent
 * http://menger.me
 * @大梦
 */


import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View, Linking} from 'react-native'
import {Carousel} from 'teaset'
import {checkNumber} from '../../../utils/Tool'
import {Predefine} from '../../../config/predefine'

export default class BannerComponent extends React.Component {

    static defaultProps = {
        data: [],
        showControl: true,
        onPress: () => {},
        onCallBack: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false,
            data: this.props.data,
        };
    }

    // 增加CallBack的跳转方法
    _onPressToNavigate = (pageTitle, component, params) => {
        console.log('params---->', params);
        RouterHelper.navigate(pageTitle, component, {
            ...params,
        });
    };

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                swiperShow: true
            });
        }, 0)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    _openURL = (url) => {
        console.log('url---->', url);
        Linking.openURL(url)
            .catch(error => {
                console.log('error---->', error)
                ToastManager.message('无法打开该类型链接');
            });
    };

    _onPressBannerItem = (item, index) => {
        let {onPress, onCallBack} = this.props;
        if (!item.url) return;
        if (typeof item.url === 'string' && !item.url.startsWith('http') && (item.open_type * 1) !== Constants.OPEN_APP_PAGE) {
            item.url = 'http://' + item.url;
        }
        let component = '';
        switch (item.open_type * 1) {
            case Constants.OPEN_APP_PAGE:
                component = item.url;
                break;
            case Constants.OPEN_APP_WEB:
                component = 'WebPage';
                break;
            case Constants.OPEN_MOBILE_WEB:
                return this._openURL(item.url);
            default:
                break;
        }
        onPress && onPress(index);
        RouterHelper.navigate(item.title, component, {
            showRightAction: false,
            uri: item.url,
            onCallBack: () => onCallBack(),
            ...item,
        });
    };

    renderBanner = (row) => {
        let {style, imgStyle, resizeMode} = this.props;
        if (this.state.swiperShow) {
            let banners = row.map((item, index) => {
                let source = Images.img_banner;
                if (item.image) {
                    source = checkNumber(item.image) ? item.image : {uri: item.image};
                }
                return (
                    <TouchableOpacity
                        activeOpacity={1}
                        key={"banner_" + index}
                        style={[Predefine.CCC, styles.bannerViewWrap]}
                        onPress={() => this._onPressBannerItem(item, index)}
                    >
                        <ImageView
                            style={[styles.slideImgStyle, imgStyle]}
                            resizeMode={resizeMode || 'cover'}
                            source={source}
                        />
                        {item.title && <View style={styles.bannerTitleViewStyle}>
                            <Text style={styles.bannerTitleStyle}>{item.title}</Text>
                        </View>}
                    </TouchableOpacity>
                )
            });
            // 这里不能输出信息，否则会陷入死循环
            return banners;
        }
    };

    render() {
        const {data} = this.state;
        let {style, showControl, ...other} = this.props;
        return (
            <View style={[styles.container, style]}>
                <Carousel
                    style={[styles.wrapper, style]}
                    control={showControl ?
                        <Carousel.Control
                            style={styles.carouselControlView}
                            dot={<View style={styles.slidePaginationItemStyle} />}
                            activeDot={<View style={styles.slidePaginationActiveStyle} />}
                        />
                        : false
                    }
                    {...other}
                >{this.renderBanner(data)}</Carousel>
            </View>
        );
    }
}

const itemWidth = Predefine.screenWidth;
const itemHeight = Predefine.screenWidth / 960 * 410;
const styles = StyleSheet.create({
    container: {
        height: itemHeight,
    },
    wrapper: {
        height: itemHeight,
    },
    slideImgStyle: {
        borderRadius: 0,
        width: itemWidth,
        height: itemHeight,
    },
    slidePaginationStyle: {
        height: 4,
        marginTop: 15,
    },
    slidePaginationItemStyle: {
        width: 8,
        height: 4,
        margin: 4,
        borderRadius: 4,
        backgroundColor: '#e8e8e8',
    },
    slidePaginationActiveStyle: {
        width: 12,
        height: 4,
        margin: 4,
        borderRadius: 4,
        backgroundColor: Predefine.themeColor,
    },

});