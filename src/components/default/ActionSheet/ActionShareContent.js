'use strict';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Predefine } from '../../../config/predefine'
import Constants from '../../../config/constant'

export default class ActionShareContent extends React.PureComponent {

    static defaultProps = {
        title: '',
        actions: [],
        cancelAction: {title: '取消'}
    };

    constructor(props) {
        super(props);
        this.ShareSource = [
            {actionTitle: '微信好友', actionImage: Images.icon_share_we_chat, type: Constants.SHARE_WE_CHAT},
            {actionTitle: '朋友圈', actionImage: Images.icon_share_time_lime, type: Constants.SHARE_TIME_LIME},
            // {actionTitle: 'QQ', actionImage: Images.icon_share_qq, type: Constants.SHARE_QQ},
            // {actionTitle: 'QQ空间', actionImage: Images.icon_share_qq_zone, type: Constants.SHARE_QQ_ZONE},
            {actionTitle: '复制链接', actionImage: Images.icon_share_link, type: Constants.SHARE_LINK},
        ];

        this.OtherSource = [
            // {actionTitle: '复制链接', actionImage: Images.icon_share_link, type: 6},
        ];
    }

    _onPressAction = (type) => {
        const {onPress} = this.props;
        requestAnimationFrame(() => {
            onPress && onPress(type);
        });
        ActionManager.hide();
    };

    _onPressCancel = () => {
        requestAnimationFrame(() => {
            ActionManager.hide()
        })
    };

    renderTitle = () => {
        const {title, titleStyle} = this.props;
        if (React.isValidElement(title)) {
            return title
        } else if (title) {
            return (
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, titleStyle]}>{title}</Text>
                </View>
            )
        }
        return null
    };

    renderContent = (dataSource, key) => {
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {dataSource.map((item, index) => {
                    return (
                        <View key={`${key}_${index}`} style={styles.actionContainer}>
                            <TouchableOpacity style={styles.actionBack} onPress={() => this._onPressAction(item.type)}>
                                <Image style={styles.actionImage} source={item.actionImage}/>
                            </TouchableOpacity>
                            <Text style={styles.actionText}>{item.actionTitle}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        )
    };

    renderCancelAction = () => {
        return (
            <TouchableOpacity style={styles.cancelButton} onPress={this._onPressCancel}>
                <Text style={styles.cancelText}>取消</Text>
            </TouchableOpacity>
        )
    };

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    {this.renderTitle()}
                    {this.renderContent(this.ShareSource, 'share')}
                    <View style={styles.separator}/>
                    {this.renderContent(this.OtherSource, 'other')}
                    {this.renderCancelAction()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: Predefine.isNotchedScreen ? Predefine.screenInset.bottom : 0,
    },
    content: {
        minHeight: 200,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#fff',
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(127, 127, 127, 0.3)',
        paddingVertical: 15,
    },
    title: {
        fontSize: Predefine.titleFontSize,
        color: Predefine.titleColor
    },
    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 17,
        marginTop: 12,
        marginBottom: 12,
    },
    actionBack: {
        width: Predefine.shareActionWidth,
        height: Predefine.shareActionHeight,
        borderRadius: Predefine.shareActionRadius,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
    },
    actionText: {
        marginTop: 7,
        // marginBottom: Predefine.shareActionMargin,
        color: Predefine.shareActionTextColor,
        fontSize: 11,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(127, 127, 127, 0.3)',
    },
    cancelButton: {
        height: Predefine.shareCancelActionHeight,
        backgroundColor: Predefine.shareCancelBackColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 14,
        color: Predefine.shareCancelTextColor
    },
    actionImage: {
        width: 40,
        height: 40,
    }
});
