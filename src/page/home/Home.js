/**
 * RNTemplate - Home
 * http://menger.me
 * @大梦
 */

'use strict';

import React from 'react'
import { StyleSheet, Text, ScrollView, TouchableOpacity, ImageBackground, View, Keyboard} from 'react-native'
import {
    HomeGameItem,
    HorizontalLine,
    BannerComponent,
    HotNewsComponent,
    ListHeaderLoading,
} from '../../components'

import {inject, observer} from 'mobx-react'

@inject('loginStore')
@observer
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    // 增加CallBack的跳转方法
    _onPressToNavigate = (pageTitle, component, params) => {
        RouterHelper.navigate(pageTitle, component, {
            ...params,
            onCallBack: () => {},
        });
    };
    
    componentDidMount(){
        this.requestDataSources();
    }

    // 请求首页信息
    requestDataSources = async () => {
        return;
        let url = ServicesApi.HOME_TASK;
        let data = {};
        let result = await Services.post(url, data);
        if (result.code === StatusCode.SUCCESS_CODE) {
            this.setState({taskDataSources: result.data.data});
        }
    };
    
    render() {
        let pageTitle = '首页';
        let {banner_index, hot_news, dataSources} = this.state;
        return (
            <PageContainer
                style={styles.container}
            >
                <NavigationBar
                    title={pageTitle}
                    renderLeftAction={null}
                />
            </PageContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigationBarStyle: {
        zIndex: 10,
    },
    content: {},
    separatorStyle: {
        backgroundColor: '#ddd',
    },

});