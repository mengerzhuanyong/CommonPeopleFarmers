/**
 * RNTemplate - Mine
 * http://menger.me
 * @大梦
 */

'use strict';

import React from 'react';
import {StyleSheet, Text, ScrollView, TouchableOpacity, View} from 'react-native';
import {ListHeaderLoading, ListRow} from '../../components'
import {inject, observer} from 'mobx-react'

@inject('loginStore')
@observer
export default class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            navArray: {},
        }
        // 进入页面后刷新用户信息
        this.props.navigation.addListener('willFocus', this.componentWillFocus);
    }

    // 增加CallBack的跳转方法
    _onPressToNavigate = (pageTitle, component, params) => {
        let {loginStore} = this.props;
        RouterHelper.navigate(pageTitle, component, {
            ...params,
            onCallBack: () => loginStore.getLatestUserInfo(),
        });
    };

    componentWillFocus = () => {
        this.initialRequestDataSources();
    }

    componentDidMount() {
    }

    _onRefresh = async () => {
        this.setState({isRefreshing: true});
        this.initialRequestDataSources();
        setTimeout(() => this.setState({isRefreshing: false}), 200);
    };

    // 初始化用户信息
    initialRequestDataSources = async () => {
        
    };

    // 退出登录
    _onPressLogout = () => {
        let {loginStore} = this.props;
        let params = {
            title: '温馨提醒',
            detail: '您确定要退出吗？',
            actions: [
                {title: '取消'},
                {
                    title: '确认',
                    titleStyle: {color: Predefine.themeColor},
                    onPress: () => loginStore.doLogout()
                },
            ]
        };
        AlertManager.show(params);
    };
    
    render() {
        let pageTitle = '个人中心';
        return (
            <PageContainer
                style={styles.container}
            >
                <NavigationBar
                    title={pageTitle}
                    renderLeftAction={null}
                />
                <ScrollView
                    style={styles.content}
                    refreshControl={<ListHeaderLoading onRefresh={this._onRefresh} refreshing={this.state.isRefreshing} />}
                >
                    <ListRow style={styles.navItemStyle} title={'检查更新'} onPress={() => RouterHelper.navigate('', 'CheckUpdates')} />
                    <ListRow style={styles.navItemStyle} title={'退出登录'} onPress={() => this._onPressLogout()} />
                </ScrollView>
            </PageContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: Predefine.screenHeight - Predefine.tabBarHeight,
    },
    content: {
    },
    navItemStyle: {
        marginTop: 10,
    },

});