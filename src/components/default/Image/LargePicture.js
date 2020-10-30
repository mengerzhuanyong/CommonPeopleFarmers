'use strict';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ViewPropTypes, PermissionsAndroid } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {ActionManager} from '../ActionSheet'
import { OverlayManager } from '../Overlay';
import { TransformView } from 'teaset';
import PropTypes from 'prop-types'
import {Predefine} from '../../../config/predefine'
import ImageView from './ImageView';

export default class LargePicture extends React.PureComponent {

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

    _onPressShow = () => {
        const { source, minScale, maxScale } = this.props
        const content = (
            <TransformView
                style={styles.transformView}
                minScale={minScale}
                maxScale={maxScale}
                onLongPress={() => this._onLongPress()}
                onPress={() => this._onPressHide()}>
                <ImageView
                    style={styles.largeImage}
                    source={source}
                    maxImageWidth={Predefine.screenWidth}
                    useOpacity={false}
                    resizeMode={'contain'}
                />
            </TransformView>
        )
        AlertManager.showView(content, { type: 'none', maskOpacity: 1.0, containerStyle: { flex: 1 } })
    }

    render() {
        const { style, imageStyle, source, ...others } = this.props
        return (
            <TouchableOpacity style={style} onPress={this._onPressShow}>
                <ImageView style={imageStyle} source={source} {...others} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    transformView: {

    },
    largeImage: {
        width: Predefine.screenWidth,
    }
});

