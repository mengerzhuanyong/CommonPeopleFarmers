/**
 * RNTemplate - 检查更新
 * http://menger.me
 * @大梦
 */

'use strict';

import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import CodePush from 'react-native-code-push'

class CheckUpdates extends React.PureComponent {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            restartAllowed: true
        };
    }

    componentDidMount() {
        this.requestDataSources();
    }

    componentWillMount() {
    }

    requestDataSources = async () => {

    };

    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({
                    syncMessage: 'Checking for update.'
                });
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({
                    syncMessage: 'Downloading package.'
                });
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                this.setState({
                    syncMessage: 'Awaiting user action.'
                });
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                this.setState({
                    syncMessage: 'Installing update.'
                });
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                this.setState({
                    syncMessage: 'App up to date.',
                    progress: false
                });
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                this.setState({
                    syncMessage: 'Update cancelled by user.',
                    progress: false
                });
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({
                    syncMessage: 'Update installed and will be applied on restart.',
                    progress: false
                });
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                this.setState({
                    syncMessage: 'An unknown error occurred.',
                    progress: false
                });
                break;
        }
    }

    codePushDownloadDidProgress(progress) {
        this.setState({
            progress
        });
    }

    toggleAllowRestart() {
        this.state.restartAllowed ?
            CodePush.disallowRestart() :
            CodePush.allowRestart();

        this.setState({
            restartAllowed: !this.state.restartAllowed
        });
    }

    getUpdateMetadata() {
        CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
            .then((metadata: LocalPackage) => {
                this.setState({
                    syncMessage: metadata ? JSON.stringify(metadata) : 'Running binary version',
                    progress: false
                });
            }, (error: any) => {
                this.setState({
                    syncMessage: 'Error: ' + error,
                    progress: false
                });
            });
    }

    /** Update is downloaded silently, and applied on restart (recommended) */
    sync() {
        CodePush.sync({},
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        );
    }

    /** Update pops a confirmation dialog, and then immediately reboots the app */
    syncImmediate() {
        CodePush.sync(
            {
                installMode: CodePush.InstallMode.IMMEDIATE,
                updateDialog: true
            },
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        );
    }

    _renderProgressView = () => {
        let {progress} = this.state;
        if (!progress) return null;
        return <Text style={styles.messages}>{progress.receivedBytes} of {progress.totalBytes} bytes received</Text>;
    };

    render() {
        let pageTitle = this.params.pageTitle || '检查更新';
        return (
            <PageContainer
                fitIPhoneX={false}
                style={styles.container}
            >
                <NavigationBar
                    title={pageTitle}
                />
                <TouchableOpacity
                    style={styles.btnItemStyle}
                    onPress={this.sync.bind(this)}
                >
                    <Text style={styles.btnTitleStyle}>后台更新</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnItemStyle}
                    onPress={this.syncImmediate.bind(this)}
                >
                    <Text style={styles.btnTitleStyle}>前台更新并提醒</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.btnItemStyle}
                    onPress={this.toggleAllowRestart.bind(this)}
                >
                    <Text style={styles.btnTitleStyle}>允许自动重启：{ this.state.restartAllowed ? '允许' : '禁止'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnItemStyle}
                    onPress={this.getUpdateMetadata.bind(this)}
                >
                    <Text style={styles.btnTitleStyle}>查看更新信息</Text>
                </TouchableOpacity>
                {this._renderProgressView()}
                <Text style={styles.messages}>{this.state.syncMessage || ''}</Text>
            </PageContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7f8f9',
    },
    welcome: {
        margin: 50,
        fontSize: 25,
        color: '#333',
        fontWeight: '700',
        textAlign: 'center',
    },
    btnItemStyle: {
        width: 260,
        height: 40,
        marginTop: 30,
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: '#f60',
        justifyContent: 'center',
    },
    btnTitleStyle: {
        color: '#fff',
        fontSize: 17,
    },
    messages: {
        fontSize: 14,
        color: '#333',
        marginTop: 30,
        lineHeight: 20,
        textAlign: 'center',
    },
});

let codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.MANUAL
};

CheckUpdates = CodePush(codePushOptions)(CheckUpdates);

export default CheckUpdates;