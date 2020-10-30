/**
 * RNTemplate - BannerComponent
 * http://menger.me
 * @大梦
 */

import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import {Predefine} from '../../../config/predefine'
import {checkNumber} from '../../../utils/Tool'

export default class SnapCarouselComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false,
            data: this.props.data,
        };
    }

    static defaultProps = {
        data: [],
        showControl: true,
    };

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                swiperShow: true
            });
        }, 0)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    _renderCarouselItem = ({item, index}) => {
        let {style} = this.props;
        let source = Images.img_banner;
        let component = item.component || 'WebPage';
        if (item.img) {
            source = checkNumber(item.img) ? item.img : {uri: item.img};
        }
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[Predefine.CCC, styles.container]}
                onPress={() => {
                    item.link && RouterHelper.navigate(item.title, component, {
                        uri: item.link,
                        ...item,
                    });
                }}
            >
                <ImageView
                    source={source}
                    resizeMode={'cover'}
                    style={[styles.slideImgStyle, style]}
                />
                {item.title && (
                    <View style={styles.bannerTitleViewStyle}>
                        <Text style={styles.bannerTitleStyle}>{item.title}</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    render() {
        let {data, swiperShow} = this.state;
        let {style, showControl, ...other} = this.props;
        return (
            <View style={[Predefine.CCC, styles.container, style]}>
                {swiperShow && data.length > 0 ?
                    <Carousel
                        data={data}
                        sliderWidth={Predefine.screenWidth}
                        ref={ref => this._carouselRef = ref}
                        renderItem={this._renderCarouselItem}
                        itemWidth={Predefine.screenWidth - 60}
                    />
                    :
                    <View style={styles.viewStyle} />
                }
            </View>
        );
    }
}

const itemWidth = Predefine.screenWidth - 60;
const styles = StyleSheet.create({
    container: {
        height: 200,
        // backgroundColor: '#f60',
    },
    slideImgStyle: {
        borderRadius: 10,
        width: itemWidth,
        height: itemWidth / 1.8,
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