import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SectionList,
    Image,
    TextInput
} from 'react-native';

import CityDataSources from '../../assets/default//json/city2.json'

const width = SCREEN_WIDTH;
const height = SCREEN_HEIGHT;

export default class DemoCityPicker extends React.PureComponent {
    constructor(props) {
        super(props);
        this.zhixiaCity = '北京市上海市重庆市天津市';
        this.provinceName = '';
        this.datas = [];
        this.state = {
            showLoading: true,
            sections: [], //section数组
            letterArr: [], //首字母数组
            showIndex: -1,
            hotCitys: []
        };
    }

    componentDidMount() {
        // this.getHotCity();
        this.loadDate();
    }

    loadDate = () => {

        this.dataFromat(CityDataSources.data);

        // HttpRequest.fetchPost(nativeApi.getProvince, {
        //     partner: 'QGZ'
        // }).then(
        //     json => {
        //         this.setState({
        //             showLoading: false,
        //             isRefreshing: false
        //         });
        //         // console.log(json);
        //         //处理 请求success
        //         if (json.code == 0) {
        //             //code为0时，数据正常
        //             // this.setState({
        //             //  productArr: json.data.list
        //             // });
        //             this.dataFromat(json.data.list);
        //         } else {
        //             this.onError(json.code, json.msg);
        //         }
        //     },
        //     json => {
        //         //TODO 处理请求fail
        //         this.setState({
        //             showLoading: false,
        //             isRefreshing: false
        //         });
        //         this.onError();
        //     }
        // );
    };

    dataFromat = (list) => {
        let letterArr = [];
        // 右侧字母栏数据处理
        let dataList = list.map((item, index) => {
            return letterArr.push(item.title);
        });
        this.datas = list;
        this.setState({
            letterArr: letterArr,
            sections: list,
            hotCitys: list[0].data,
        });
    };

    souSuo = (susuokey) => {
        susuokey = susuokey.toLocaleLowerCase();
        if ((this.susuokey == '')) {
            this.setState({
                sections: this.datas
            });
            return;
        }
        let section = [];
        this.datas.map((item, index) => {
            let datas = item.data.filter(ditem => {
                return (
                    ditem.name.includes(susuokey) ||
                    ditem.spell.includes(susuokey)
                );
            });
            // console.log('datas---->', datas);
            if (datas.length > 0) {
                section.push({
                    title: item.title,
                    data: datas
                });
            }
        });
        this.setState({
            sections: section
        });
    };

    callback = item => {
        this.editMessage(item);
    };

    _getItemLayout = (data, index) => {
        return {length: 50, offset: 50 * index, index}
    }

    // 字母关联分组跳转
    _onSectionselect = key => {
        if (this.state.sections.length <= key) {
            return;
        }
        this.refs._sectionList.scrollToLocation({
            itemIndex: 0,
            sectionIndex: key,
            viewOffset: 20
        });
    };

    // 分组列表的头部
    _renderSectionHeader(sectionItem) {
        const {
            section
        } = sectionItem;
        return (
            <View>
                <Text
                    style={{
                        height: 30,
                        width: '100%',
                        backgroundColor: '#e8eaed',
                        textAlignVertical: 'center',
                        paddingLeft: 20
                    }}
                >
                    {section.title}
                </Text>
            </View>
        );
    }

    _renderItem = ({item}) => (
        <MyListItem onPressItem={this._onPressItem} item={item}/>
    );

    _keyExtractor = (item, index) => index;

    _onPressItem = item => {
        this.provinceName = item.name;
        if (this.zhixiaCity.includes(item.name)) {
            this.editMessage();
        } else {
            this.props.navigation.navigate('UserCityPage', {
                provinceId: item.id,
                provinceCode: item.code,
                callback: this.callback
            });
        }
    };

    _renderRightLetters(letter, index) {
        return (
            <TouchableOpacity
                key={'letter_idx_' + index}
                activeOpacity={0.6}
                onPress={() => {
                    this._onSectionselect(index);
                }}
            >
                <View
                    style={{
                        height:
                            (height - (80 + 60)) / (this.state.letterArr.length + 1),
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={styles.letterText}>{letter}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _renderHotCitys(item, index) {
        return (
            <TouchableOpacity
                key={'citys_idx_' + index}
                onPress={() => {}}
            >
                <Text
                    style={{
                        margin: 5,
                        backgroundColor: 'white',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlignVertical: 'center',
                        textAlign: 'center'
                    }}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    }

    editMessage = item => {
        this.setState({
            showLoading: true
        });
        HttpRequest.fetchPost(nativeApi.updateUserData, {
            provinceName: this.provinceName,
            cityName: item ? item.name : this.provinceName
        }).then(
            json => {
                this.setState({
                    showLoading: false
                });
                // console.log(json);
                //处理 请求success
                if (json.code == 0) {
                    //我们假设业务定义code为0时，数据正常
                    this.props.navigation.state.params.callback(2, {
                        provinceName: this.provinceName,
                        cityName: item ? item.name : this.provinceName
                    });
                    this.props.navigation.goBack();
                } else {
                    this.onError(json.code, json.msg);
                }
            },
            json => {
                //TODO 处理请求fail
                this.setState({
                    showLoading: false
                });
                this.onError();
            }
        );
    };

    render() {
        return (
            <PageContainer>
                <NavigationBar
                    title={'城市选择'}
                />
                <View
                    style={{
                        width: '100%',
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingLeft: 15,
                        paddingRight: 15,
                        backgroundColor: 'white'
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            textAlignVertical: 'center',
                            padding: 1,
                            marginLeft: 8
                        }}
                        underlineColorAndroid="transparent"
                        placeholder="请输入关键字"
                        onChangeText={text => {
                            this.souSuo(text);
                        }}
                    />
                </View>
                <SectionList
                    ref="_sectionList"
                    getItemLayout={this._getItemLayout}
                    style={{backgroundColor: '#e8eaed', width: '100%'}}
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderSectionHeader}
                    sections={this.state.sections}
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={() => (<View style={{height: 1, width: '100%', backgroundColor: '#e8eaed'}}/>)}
                    ListHeaderComponent={() => (
                        <View
                            style={{
                                backgroundColor: '#e8eaed'
                            }}
                        >
                            <Text
                                style={{
                                    height: 30,
                                    fontSize: 12,
                                    textAlignVertical: 'center',
                                    marginLeft: 5
                                }}
                            >热门城市</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap'
                                }}
                            >
                                {this.state.hotCitys.map((letter, index) =>
                                    this._renderHotCitys(letter, index)
                                )}
                            </View>
                        </View>
                    )}
                />
                <View style={styles.letters}>
                    {this.state.letterArr.map((letter, index) =>
                        this._renderRightLetters(letter, index)
                    )}
                </View>
            </PageContainer>
        );
    }
}

class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    };


    render() {
        let {item} = this.props;
        return (
            <TouchableOpacity
                onPress={this._onPress}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    backgroundColor: 'white'
                }}
            >
                <Text style={{color: '#5a5a5a', fontSize: 14, marginLeft: 20}}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    letters: {
        position: 'absolute',
        top: 60,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    letterText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#999999'
    }
});
