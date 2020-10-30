/**
 * RNTemplate - GameDetail
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
export default class GameDetail extends React.Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            item: this.params.item || {},
            dataSources: this.params.item || {},
            isRefreshing: false,
            navArray: {},
        }
    }

    // 增加CallBack的跳转方法
    _onPressToNavigate = (pageTitle, component, params) => {
        let {loginStore} = this.props;
        RouterHelper.navigate(pageTitle, component, {
            ...params,
            onCallBack: () => loginStore.getLatestUserInfo(),
        });
    };

    componentDidMount() {
        this.initialRequestDataSources();
    }

    _onRefresh = async () => {
        this.setState({isRefreshing: true});
        this.initialRequestDataSources();
        setTimeout(() => this.setState({isRefreshing: false}), 200);
    };

    // 初始化用户信息
    initialRequestDataSources = async () => {
        
    };
    
    render() {
        let pageTitle = this.params.pageTitle || '游戏详情';
        let {dataSources} = this.state;
        return (
            <PageContainer
                style={styles.container}
            >
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView
                    style={styles.content}
                    refreshControl={<ListHeaderLoading onRefresh={this._onRefresh} refreshing={this.state.isRefreshing} />}
                >
                    <Text style={styles.textStyle}>{dataSources.title}</Text>
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