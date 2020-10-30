/**
 * RNTemplate - 媒体库管理
 * http://menger.me
 * @大梦
 */

'use strict';

import React from 'react'
import {StatusBar, PermissionsAndroid} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

const defaultOptions = {
    type: 'album',
    cropping: false, // multiple为false的时候才有效
    multiple: false,
    mediaType: 'photo',
    includeBase64: false,
    useFrontCamera: false,
    cropperChooseText: '确定',
    cropperCancelText: '取消',
    minFiles: 1, // ios only
    maxFiles: 9, // ios only
    loadingLabelText: '图片处理中...', // ios only
};

    const REJECT_PARAMS = {code: 0, msg: '取消选择', data: []};

export default class MediaManager {


    // 检查权限
    static async checkPermission(permission) {
        if (__IOS__) {
            return Promise.resolve(true);
        }
        const result = await PermissionsAndroid.request(permission, null)

        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
    }

    static async showActionPicker(option = {}) {
        return new Promise(async (resolve, reject) => {
            let result = '';
            await ActionManager.show({
                onCancel: () => {
                    ActionManager.hide();
                    resolve(REJECT_PARAMS);
                },
                actions: [{
                    title: '打开相机',
                    onPress: async () => {
                        ActionManager.hide();
                        result = await this.showPicker({
                            type: 'camera',
                            ...option,
                        });
                        resolve(result);
                    }
                }, {
                    title: '打开相册',
                    onPress: async () => {
                        ActionManager.hide();
                        result = await this.showPicker({
                            type: 'album',
                            ...option,
                        });
                        resolve(result);
                    }
                }],
            });
        });
        
    }

    // 打开相机/相册
    static async showPicker(option = {}) {
        const checkRes = await this.checkPermission(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (!checkRes) {
            return Promise.resolve({
                code: StatusCode.FAIL_CODE,
                msg: '没有访问权限',
                data: [],
            });
        }
        let buildOption = {
            ...defaultOptions,
            ...option,
        };
        let showPickerFoo = buildOption.type === 'album' ? ImagePicker.openPicker : ImagePicker.openCamera;
        // StatusBar.setBarStyle('dark-content');
        return new Promise((resolve, reject) => {
            showPickerFoo(buildOption)
            .then((selectedData) => {
                let _dataTemp = [];
                if (selectedData instanceof Array) {
                    _dataTemp = selectedData;
                } else {
                    _dataTemp.push(selectedData);
                };
                // StatusBar.setBarStyle('light-content');
                resolve({
                    code: StatusCode.SUCCESS_CODE,
                    msg: '获取成功',
                    data: _dataTemp,
                });
            })
            .catch((error) => {
                // StatusBar.setBarStyle('light-content');
                resolve(REJECT_PARAMS);
            });
        });
    }

};