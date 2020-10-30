/**
 * RNTemplate - WebPage
 * http://menger.me
 * @大梦
 */

'use strict';

import React, {PureComponent} from 'react'
import {StyleSheet, View, PermissionsAndroid, CameraRoll, DeviceEventEmitter} from 'react-native'
import Webview from 'react-native-webview'

export default class WebPage extends PureComponent {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            loading: true,
            imagePath: '',
            uri: this.params.uri || '',
            share_params: this.params.share_params || {},
            showRightAction: this.params.showRightAction || false,
        };
    }

    componentDidMount() {
        // __ANDROID__ && this.downloadShareImage();
    }

    componentWillUnmount() {
        // DeviceEventEmitter.emit('closeWebViewWindow','')
    }

    onLoadEnd = () => {
        this.setState({loading: false});
    };

    render() {
        let {loading, imagePath, uri, share_params, showRightAction} = this.state;
        let style = this.params.style || '';
        let pageTitle = this.params.pageTitle || '详情页';
        // console.log('页面地址---->', uri);
        return (
            <PageContainer
                loading={loading}
                style={styles.container}
            >
                <NavigationBar
                    title={pageTitle}
                    renderRightAction={showRightAction ? [{
                        icon: Images.icon_share,
                        iconStyle: Predefine.headerIconStyle,
                        onPress: () => {
                            ActionsManager.showShare(share_params, (res) => {
                                // console.log('res---->', res);
                            });
                        }
                    }] : null}
                />
                <Webview
                    textZoom={100}
                    source={{uri}}
                    onLoadEnd={this.onLoadEnd}
                    startInLoadingState={false}
                    style={[styles.webContainer, style]}
                />
            </PageContainer>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f2f3',
    },
    webContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
});