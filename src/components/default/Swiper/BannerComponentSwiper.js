/**
 * RNTemplate - BannerComponentSwiper
 * http://menger.me
 * @大梦
 */

import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View, Linking} from 'react-native'
import Swiper from 'react-native-swiper'
import {checkNumber} from '../../../utils/Tool'
import {Predefine} from '../../../config/predefine'

export default class BannerComponentSwiper extends React.Component {

    static defaultProps = {
        data: [],
        showControl: true,
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

    _onPressBannerItem = (item) => {
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
        onPress && onPress();
        RouterHelper.navigate(item.title, component, {
            showRightAction: false,
            uri: item.url,
            onCallBack: () => onCallBack(),
            ...item,
        });
    };

    _renderBannerContent = (row) => {
        let {style, imgStyle, resizeMode} = this.props;
        if (this.state.swiperShow) {
            let banners = row.map((item, index) => {
                let source = Images.img_banner;
                let component = item.is_link > 0 ? 'WebPage' : item.url;
                if (item.image) {
                    source = checkNumber(item.image) ? item.image : {uri: item.image};
                }
                return (
                    <TouchableOpacity
                        style={[Predefine.CCC, styles.bannerViewWrap]}
                        key={"banner_" + index}
                        activeOpacity={1}
                        onPress={() => {
                            item.url && RouterHelper.navigate(item.title, component, {
                                uri: item.url,
                                ...item,
                            });
                        }}
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
            return (
                <Swiper
                    style={[styles.wrapper, style]}
                    onScrollBeginDrag={this.setSlidePagination}
                    dot={<View style={styles.slidePaginationItemStyle} />}
                    activeDot={<View style={styles.slidePaginationActiveStyle} />}
                >{banners}</Swiper>
            );
        }
    };

    render() {
        let {data} = this.state;
        let {style, showControl, ...other} = this.props;
        return (
            <View style={[styles.container]}>
                {this._renderBannerContent(data)}
            </View>
        );
    }
}

const itemWidth = Predefine.screenWidth;
const itemHeight = Predefine.screenWidth / 2;
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
        width: 6,
        height: 4,
        margin: 4,
        backgroundColor: '#e8e8e8',
    },
    slidePaginationActiveStyle: {
        width: 12,
        height: 4,
        backgroundColor: '#fdbc2a',
        margin: 4,
    },

});