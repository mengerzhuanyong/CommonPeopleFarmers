'use strict';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, ViewPropTypes, View, PermissionsAndroid } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import PropTypes from 'prop-types'
import { Predefine } from '../../../config/predefine'
import Constants from '../../../config/constant'
import { TransformView, AlbumView } from 'teaset'

export default class AlertAlbumView extends React.PureComponent {

    static propTypes = {
        ...Image.propTypes,
        style: ViewPropTypes.style,
        imageStyle: ViewPropTypes.style,
        minScale: PropTypes.number,
        maxScale: PropTypes.number,
    }

    static defaultProps = {
        ...Image.defaultProps,
    }

    constructor(props) {
        super(props);
    }

    _onLongPress = () => {
        ActionManager.show({
            actions: [
                { title: '立即保存', onPress: () => this._onPressSave() }
            ]
        })
    }

    _onPressSave = async () => {
        const { source } = this.props
        if (__ANDROID__) {
            let perRes = await PermissionsAndroid.request('android.permission.WRITE_EXTERNAL_STORAGE', null);
        }
        const result = await Services.download(source.uri)
        if (result) {
            const rollUri = __IOS__ ? result : `file://${result}`
            const saveRes = await CameraRoll.saveToCameraRoll(rollUri, 'photo')
            if (saveRes) {
                ToastManager.message('图片已保存至相册');
                ActionManager.hide();
            } else {
                ToastManager.message('保存失败');
            }
        } else {
            ToastManager.message('下载失败')
        }
    };

    _onPressHide = () => {
        AlertManager.hide()
    }

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
        let {title, imageSource, minScale, maxScale} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <TransformView
                        style={[Predefine.CCC, styles.transformView]}
                        minScale={minScale}
                        maxScale={maxScale}
                        onLongPress={() => this._onLongPress()}
                        onPress={() => this._onPressHide()}
                    >
                        <ImageView
                            style={styles.largeImage}
                            source={{uri: imageSource}}
                            maxImageWidth={Predefine.screenWidth}
                            useOpacity={false}
                            resizeMode={'contain'}
                        />
                        {title != '' ? <Text style={styles.imageTitleStyle}>{title}</Text> : null}
                    </TransformView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    transformView: {

    },
    largeImage: {
        width: Predefine.screenWidth * 0.7,
    },
    imageTitleStyle: {
        fontSize: 15,
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
    },
});
