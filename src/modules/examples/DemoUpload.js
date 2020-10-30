/**
 * RNTemplate - DemoUpload
 * http://menger.me
 * @大梦
 */

'use strict';

import React, { useRef, useCallback } from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import ImagePicker from 'react-native-image-crop-picker'

export default class DemoUpload extends React.PureComponent {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            localImages: [],
            uploadImages: [
                {key: 'qiniu_1575975575622.jpg'}
            ],
        };
    }

    updateState = (bond, data, refresh = true) => {
        if (refresh) {
            let _stateTemp = {...this.state};
            _stateTemp[bond] = data;
            this.setState({..._stateTemp});
        } else {
            this.state[bond] = data;
        }
        
    };

    componentDidMount() {
        this.requestDataSources();
    }

    componentWillMount() {
    }

    requestDataSources = async () => {

    };

    onPressOpenPicker = async () => {
        let _result = await MediaManager.showPicker({
            type: 'album',
            // cropping: true,
            // includeBase64: true,
        });
        if (_result && _result.code === StatusCode.SUCCESS_CODE) {
            this.updateState('localImages', _result.data);
        }
        // console.log('onPressOpenPicker---->', _result);
    };

    onPressOpenCamera = async () => {
        let _result = await MediaManager.showPicker({
            type: 'camera',
            // includeBase64: true,
        });
        if (_result && _result.code === StatusCode.SUCCESS_CODE) {
            this.updateState('localImages', _result.data);
        }
        // console.log('onPressOpenCamera---->', _result);
    };

    onPressOpenAction = async () => {
        let _result = await MediaManager.showActionPicker({
            // includeBase64: true,
        });
        if (_result && _result.code === StatusCode.SUCCESS_CODE) {
            this.updateState('localImages', _result.data);
        }
        // console.log('onPressOpenAction---->', _result);
    };

    onPressUpload = async () => {
        let {localImages} = this.state;
        ToastManager.loading('上传中...', {duration: 1000 * 60});
        let result = await Services.uploadQiNiu(localImages);
        ToastManager.hide();
        ToastManager.message(result.msg);
        // console.log('result=====>', result)
        if (result.code === StatusCode.SUCCESS_CODE) {
            this.updateState('uploadImages', result.data);
        }
    };

    renderUploadImageContent = (data) => {
        if (!data || data.length < 1) return null;
        let content = data.map((item, index) => {
            // console.log('item---->', item);
            return (
                <ImageView
                    key={index}
                    source={{uri: item.path || item.key}}
                    style={styles.uploadImage}
                />
            );
        });
        return (
            <View style={[Predefine.WRAP, Predefine.RCC, styles.uploadContent]}>
                {content}
            </View>
        );
    };

    render() {
        let {localImages, uploadImages} = this.state;
        let pageTitle = this.params.pageTitle || 'DemoUpload';
        return (
            <PageContainer style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView
                    style={[styles.content]}
                    contentContainerStyle={[Predefine.CCC, styles.contentContainerStyle]}
                >
                    {this.renderUploadImageContent(localImages)}
                    <Button
                        title={'打开相册'}
                        style={styles.btnItemStyle}
                        titleStyle={styles.btnTitleStyle}
                        onPress={this.onPressOpenPicker}
                    />
                    <Button
                        title={'打开相机'}
                        style={styles.btnItemStyle}
                        titleStyle={styles.btnTitleStyle}
                        onPress={this.onPressOpenCamera}
                    />
                    <Button
                        title={'打开选择框'}
                        style={styles.btnItemStyle}
                        titleStyle={styles.btnTitleStyle}
                        onPress={this.onPressOpenAction}
                    />
                    <Button
                        title={'上传七牛云'}
                        style={styles.btnItemStyle}
                        titleStyle={styles.btnTitleStyle}
                        onPress={this.onPressUpload}
                    />
                    {this.renderUploadImageContent(uploadImages)}
                </ScrollView>
            </PageContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    content: {
        flex: 1,
    },
    contentContainerStyle: {
        paddingVertical: 50,
    },
    uploadContent: {
        marginVertical: 50,
    },
    uploadImage: {
        width: 100,
        height: 100,
        margin: 10,
        backgroundColor: '#f60',
    },
    btnItemStyle: {
        width: 200,
        height: 50,
        marginBottom: 20,
        backgroundColor: Predefine.themeColor,
    },
    btnTitleStyle: {},
});