/**
 * RNTemplate - 城市选择
 * http://menger.me
 * @大梦
 */

'use strict';

import React, { useRef, useCallback } from 'react'
import {
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native'
import PropTypes from 'prop-types'
import CityDataSources from '../../../assets/default/json/city_tree.json'
import {HorizontalLine} from '../../../components'
import { Predefine } from '../../../config/predefine'

export default class PickerCityTree extends React.PureComponent {

    static propTypes = {
        defaultData: PropTypes.object,
        onCallBack: PropTypes.func,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.provinceData = CityDataSources.data;
        this.state = {
            dataSources: this.provinceData.slice() || [],
            cityData: [],
            areaData: [],
            selectedData: {
                province: {
                    name: '',
                    code: '',
                },
                city: {
                    name: '',
                    code: '',
                },
                area: {
                    name: '',
                    code: '',
                },
            },
            defaultProvinceIndex: 0,
            defaultCityIndex: 0,
            defaultAreaIndex: 0,
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

    doOnCallBack = (selectedData) => {
        let {onCallBack} = this.props;
        if (!selectedData || !selectedData.area || selectedData.area.code === '') {
            ToastManager.message('请选择所在城市');
            return;
        }
        let {province, city, area} = selectedData;
        if (onCallBack && typeof onCallBack === 'function') {
            onCallBack(selectedData);
            ActionManager.hide();
        } else {
            let _cityStr = province.name + '-' + city.name + '-' + area.name;
            ToastManager.message(_cityStr);
        }
    };

    componentDidMount() {
        this.initialDataSources();
    }

    componentWillMount() {
    }

    initialDataSources = async () => {
        let {defaultData} = this.props;
        let {dataSources, cityData, areaData, defaultProvinceIndex, defaultCityIndex, defaultAreaIndex} = this.state;
        let _cityDataTemp = [], _areaDataTemp = [];
        let _selectedDataTemp = {...this.state.selectedData};
        if (defaultData) {
            let {province, city, area} = defaultData;
            if (province.code && province.code !== '') {
                _selectedDataTemp = {
                    ..._selectedDataTemp,
                    province: {
                        name: province.name,
                        code: province.code,
                    }
                }
                defaultProvinceIndex = dataSources.findIndex(obj => obj.code === province.code);
                _cityDataTemp = defaultProvinceIndex > -1 && dataSources[defaultProvinceIndex].data;
                // this.provinceListRef && this.provinceListRef.scrollToIndex({
                //     index: defaultProvinceIndex,
                //     animated: false,
                // });
            }
            if (city.code && city.code !== '') {
                _selectedDataTemp = {
                    ..._selectedDataTemp,
                    city: {
                        name: city.name,
                        code: city.code,
                    }
                }
                defaultCityIndex = _cityDataTemp && _cityDataTemp.findIndex(obj => obj.code === city.code);
                _areaDataTemp = defaultCityIndex > -1 && _cityDataTemp[defaultCityIndex].data;
                // this.cityListRef && this.cityListRef.scrollToIndex({
                //     index: defaultCityIndex,
                //     animated: false,
                // });

            }
            if (area.code && area.code !== '') {
                _selectedDataTemp = {
                    ..._selectedDataTemp,
                    area: {
                        name: area.name,
                        code: area.code,
                    }
                }
                defaultAreaIndex = _areaDataTemp && _areaDataTemp.findIndex(obj => obj.code === area.code);
                // this.areaListRef && this.areaListRef.scrollToIndex({
                //     index: defaultAreaIndex,
                //     animated: false,
                // });
            }
            this.setState({
                defaultProvinceIndex,
                defaultCityIndex,
                defaultAreaIndex,
                cityData: _cityDataTemp,
                areaData: _areaDataTemp,
                selectedData: _selectedDataTemp,
            });
        }
    };

    _scrollToIndex = (listRef, index) => {
        // console.log('listRef, index---->', listRef, index);
        listRef && index > 5 && listRef.scrollToIndex({
            index,
            viewOffset: 0,
        });
    };

    _renderProvinceListItem = ({item, index}) => {
        let {showSearch, selectedData: {province}} = this.state;
        return (
            <Button
                key={index}
                numberOfLines={2}
                title={item.name}
                iconPosition={'right'}
                iconStyle={styles.listItemIconStyle}
                titleStyle={[styles.listItemTitleStyle, item.code === province.code && styles.listItemTitleCurStyle]}
                icon={item.code === province.code ? Images.icon_check_mark : null}
                style={[Predefine.RCB, styles.listItemStyle, index === 0 && styles.firstListItemStyle, showSearch && styles.searchListItemStyle]}
                onPress={() => this.onPressProvinceItem(item, index)}
            />
        )
    };

    _renderCityListItem = ({item, index}) => {
        let {showSearch, selectedData: {city}} = this.state;
        return (
            <Button
                key={index}
                numberOfLines={2}
                title={item.name}
                iconPosition={'right'}
                iconStyle={styles.listItemIconStyle}
                titleStyle={[styles.listItemTitleStyle, item.code === city.code && styles.listItemTitleCurStyle]}
                icon={item.code === city.code ? Images.icon_check_mark : null}
                style={[Predefine.RCB, styles.listItemStyle, index === 0 && styles.firstListItemStyle, showSearch && styles.searchListItemStyle]}
                onPress={() => this.onPressCityItem(item, index)}
            />
        )
    };

    _renderAreaListItem = ({item, index}) => {
        let {showSearch, selectedData: {area}} = this.state;
        return (
            <Button
                key={index}
                numberOfLines={2}
                title={item.name}
                iconPosition={'right'}
                iconStyle={styles.listItemIconStyle}
                titleStyle={[styles.listItemTitleStyle, item.code === area.code && styles.listItemTitleCurStyle]}
                icon={item.code === area.code ? Images.icon_check_mark : null}
                style={[Predefine.RCB, styles.listItemStyle, index === 0 && styles.firstListItemStyle, showSearch && styles.searchListItemStyle]}
                onPress={() => this.onPressAreaItem(item, index)}
            />
        )
    };

    _renderItemSeparatorComponent = () => {
        return (
            <HorizontalLine style={styles.separatorStyle} />
        );
    };

    _getProvinceItemLayout = (data, index) => {
        return {length: cityItemHeight, offset: cityItemHeight * index, index}
    }

    _getCityItemLayout = (data, index) => {
        return {length: cityItemHeight, offset: cityItemHeight * index, index}
    }

    _getAreaItemLayout = (data, index) => {
        return {length: cityItemHeight, offset: cityItemHeight * index, index}
    }

    onPressProvinceItem = (item, index) => {
        let _selectedDataTemp = {...this.state.selectedData};
        _selectedDataTemp = {
            ..._selectedDataTemp,
            province: {
                name: item.name,
                code: item.code,
            },
        }
        this.setState({
            defaultCityIndex: 0,
            cityData: item.data,
            areaData: [],
            selectedData: _selectedDataTemp,
        });
        this.cityListRef && this.cityListRef.scrollToIndex({
            index: 0,
            animated: false,
        });
    };

    onPressCityItem = (item, index) => {
        let _selectedDataTemp = {...this.state.selectedData};
        _selectedDataTemp = {
            ..._selectedDataTemp,
            city: {
                name: item.name,
                code: item.code,
            },
            area: {
                name: '',
                code: '',
            },
        }
        this.setState({
            defaultAreaIndex: 0,
            areaData: item.data,
            selectedData: _selectedDataTemp,
        });
    };

    onPressAreaItem = (item, index) => {
        let _selectedDataTemp = {...this.state.selectedData};
        _selectedDataTemp = {
            ..._selectedDataTemp,
            area: {
                name: item.name,
                code: item.code,
            },
        }
        this.setState({
            selectedData: _selectedDataTemp,
        });
        this.doOnCallBack(_selectedDataTemp);
    };

    _renderActionTopButtonContent = (selectedData) => {
        return (
            <View style={[Predefine.RCB, styles.actionTopBtnWrap]}>
                <Text style={styles.actionTopBtnItemStyle}>所在城市</Text>
                <Text
                    onPress={() => this.doOnCallBack(selectedData)}
                    style={[styles.actionTopBtnItemStyle, styles.actionTopBtnItemCurStyle]}
                >确定</Text>
            </View>
        );    
    };

    render() {
        let {dataSources, searchDataSources, showSearch, searchKey, cityData, areaData, selectedData, defaultProvinceIndex, defaultCityIndex, defaultAreaIndex} = this.state;
        let {province, city, area} = selectedData;
        // console.log('defaultProvinceIndex, defaultCityIndex, defaultAreaIndex---->', defaultProvinceIndex, defaultCityIndex, defaultAreaIndex);
        return (
            <View style={[styles.container]}>
                {this._renderActionTopButtonContent(selectedData)}
                <View style={[Predefine.RSS, styles.pickerContent]}>
                    <View style={styles.contentItemStyle}>
                        <ListView
                            data={dataSources}
                            enableRefresh={false}
                            enableLoadMore={false}
                            style={styles.listContent}
                            initialScrollIndex={defaultProvinceIndex}
                            getItemLayout={this._getProvinceItemLayout}
                            ref={ref => this.provinceListRef = ref}
                            renderItem={this._renderProvinceListItem}
                            keyExtractor={(item, index) => index + ''}
                        />
                    </View>
                    <View style={[styles.contentItemStyle, styles.contentItemCurStyle]}>
                        {cityData.length > 0 && <ListView
                            data={cityData}
                            enableRefresh={false}
                            enableLoadMore={false}
                            style={styles.listContent}
                            initialScrollIndex={defaultCityIndex}
                            getItemLayout={this._getCityItemLayout}
                            ref={ref => this.cityListRef = ref}
                            renderItem={this._renderCityListItem}
                            keyExtractor={(item, index) => index + ''}
                            ListEmptyComponent={null}
                        />}
                    </View>
                    {areaData.length > 0 && <View style={styles.contentItemStyle}>
                        <ListView
                            data={areaData}
                            enableRefresh={false}
                            enableLoadMore={false}
                            style={styles.listContent}
                            initialScrollIndex={defaultAreaIndex}
                            getItemLayout={this._getAreaItemLayout}
                            ref={ref => this.areaListRef = ref}
                            renderItem={this._renderAreaListItem}
                            keyExtractor={(item, index) => index + ''}
                        />
                    </View>}
                </View>
            </View>
        );
    }
}

const cityItemHeight = 40;

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#fff',
        paddingBottom: Predefine.isNotchedScreen ? Predefine.screenInset.bottom : 0,
    },
    actionTopBtnWrap: {
        borderColor: '#ddd',
        borderBottomWidth: Predefine.minPixel,
    },
    actionTopBtnItemStyle: {
        minWidth: 60,
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    actionTopBtnItemCurStyle: {
        color: Predefine.themeColor,
    },
    pickerValueContent: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    pickerValueTitle: {
        fontSize: 13,
        color: '#333',
    },
    pickerValueValue: {},

    pickerContent: {
        height: Predefine.screenWidth * 0.7,
        backgroundColor: '#fff'
    },
    contentItemStyle: {
        flex: 1,
        backgroundColor: '#f3f5f8',
        height: Predefine.screenWidth * 0.7,
    },
    contentItemCurStyle: {
        backgroundColor: '#fff'
    },
    listContent: {
        flex: 1,
    },
    sectionHeaderContent: {
        height: 35,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    sectionHeaderTitle: {
        fontSize: 14,
        color: '#999',
    },
    listItemStyle: {
        paddingVertical: 0,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        height: cityItemHeight,
        backgroundColor: 'transparent',
        // borderTopWidth: Predefine.minPixel,
    },
    firstListItemStyle: {
        borderTopWidth: 0,
    },
    searchListItemStyle: {
        marginRight: 15,
    },
    listItemIconStyle: {
        // width: 20,
        tintColor: Predefine.themeColor,
    },
    listItemTitleStyle: {
        flex: 1,
        fontSize: 13,
        color: '#555',
    },
    listItemTitleCurStyle: {
        color: Predefine.themeColor,
    },
    separatorStyle: {
        backgroundColor: '#ddd',
    },
});