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
import CityDataSources from '../../assets/default//json/city2.json'
import {HorizontalLine} from '../../components'

export default class PickerCity extends React.PureComponent {

    static propTypes = {
        onCallBack: PropTypes.func
    };

    static defaultProps = {
        onCallBack: () => {},
    };

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.cityData = CityDataSources.data;
        this.state = {
            searchKey: '',
            selectedCity: '',
            showSearch: false,
            searchDataSources: [],
            dataSources: this.cityData.slice() || [],
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

    doOnCallBack = (selectedCity) => {
        let {onCallBack} = this.params;
        if (onCallBack && typeof onCallBack === 'function') {
            onCallBack(selectedCity);
            RouterHelper.goBack();
        } else {
            ToastManager.message(selectedCity.name);
        }
    };

    componentDidMount() {
        this.requestDataSources();
    }

    componentWillMount() {
    }

    requestDataSources = async () => {

    };

    _renderlistSectionHeader = ({section}) => {
        return (
            <View style={[Predefine.RCS, styles.sectionHeaderContent]}>
                <Text style={styles.sectionHeaderTitle}>{section.title}</Text>
            </View>
        );
    };

    _renderSelectListItem = ({item, index, section}) => {
        let {showSearch} = this.state;
        return (
            <Button
                key={index}
                title={item.name}
                titleStyle={styles.listItemStyle}
                style={[Predefine.CSC, styles.listItemView, index === 0 && styles.firstListItem, showSearch && styles.searchListItem]}
                onPress={() => this.onPressCityItem(item, index)}
            />
        )
    };

    _renderItemSeparatorComponent = () => {
        return (
            <HorizontalLine style={styles.separatorStyle} />
        );
    };

    _getItemLayout = (data, index) => {
        return {length: cityItemHeight, offset: cityItemHeight * index, index}
    }

    _scrollToLocation = (index) => {
        let params = {
            itemIndex: 0,
            viewOffset: 85,
            animated: false,
            viewPosition: 0,
            sectionIndex: index,
        };

        this.selectListRef && this.selectListRef.scrollToLocation(params);
    };

    _renderSideBarContent = () => {
        let {dataSources, showSearch} = this.state;
        if (dataSources.length < 1 || showSearch) return null;
        let content = dataSources.map((item, index) => {
            return (
                <Button
                    key={index}
                    iconStyle={styles.sideBarIconStyle}
                    titleStyle={styles.sideBarTitleStyle}
                    style={[styles.sideBarItem, styles.sideBarIconIem]}
                    title={item.title !== Constants.HOT_CITY ? item.title : null}
                    icon={item.title === Constants.HOT_CITY ? Images.icon_hot : null}
                    onPress={() => this.onPressSideBarItem(item, index)}
                />
            )
        })
        return (
            <View style={[Predefine.CCC, styles.sideBarContent]}>{content}</View>
        );
    };

    onPressSideBarItem = (item, index) => {
        ToastManager.message(item.title);
        this._scrollToLocation(index);
    };

    onPressCityItem = (item, index) => {
        this.doOnCallBack(item);
    };

    _onChangeText = (searchValue) => {
        searchValue = searchValue.toLocaleLowerCase();
        // console.log('searchValue---->', searchValue);
        let {dataSources, searchDataSources, searchKey} = this.state;
        if (searchValue === '') {
            this.setState({
                showSearch: false,
                dataSources: this.cityData,
            })
            return;
        }

        let _searchDataSourcesTemp = [];
        // console.log('this.cityData---->', this.cityData);
        this.cityData.forEach((item, index) => {
            if (index > 0) {
                let _dataTemp = item.data.filter(obj => {
                    return (
                        obj.name.includes(searchValue) || obj.spell.includes(searchValue)
                    );
                });
                if(_dataTemp.length > 0) {
                    _searchDataSourcesTemp = _searchDataSourcesTemp.concat(_dataTemp);
                };
            }
        });
        // console.log('_searchDataSourcesTemp---->', _searchDataSourcesTemp);
        this.setState({
            showSearch: true,
            searchKey: searchValue,
            searchDataSources: _searchDataSourcesTemp
        });
    };

    _onPressClearInput = () => {
        this.inputRef && this.inputRef.clear();
        this.setState({
            searchKey: '',
            showSearch: false,
            dataSources: this.cityData,
        });
    };

    render() {
        let {dataSources, searchDataSources, showSearch, searchKey} = this.state;
        let pageTitle = this.params.pageTitle || '城市选择';
        return (
            <PageContainer style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <View style={[Predefine.RCB, styles.searchContent]}>
                    <ImageView
                        source={Images.icon_search}
                        style={styles.searchIconStyle}
                    />
                    <TextInput
                        placeholder={'请输入城市名'}
                        style={styles.searchInputStyle}
                        ref={ref => this.inputRef = ref}
                        onChangeText={this._onChangeText}
                    />
                    {searchKey !== '' ? <Button
                        icon={Images.icon_close}
                        style={styles.searchBtnClearItem}
                        iconStyle={styles.searchIconStyle}
                        onPress={this._onPressClearInput}
                    /> : null}
                </View>
                <HorizontalLine style={styles.separatorStyle} />
                {showSearch ?
                    <View style={styles.content}>
                        <ListView
                            enableRefresh={false}
                            enableLoadMore={false}
                            extraData={this.state}
                            data={searchDataSources}
                            style={styles.listContent}
                            ref={ref => this.searchListRef = ref}
                            renderItem={this._renderSelectListItem}
                            keyExtractor={(item, index) => index + ''}
                        />
                    </View>
                    :
                    <View style={styles.content}>
                        <ListView
                            data={dataSources}
                            enableRefresh={false}
                            enableLoadMore={false}
                            listType={'SectionList'}
                            style={styles.listContent}
                            stickySectionHeadersEnabled={false}
                            getItemLayout={this._getItemLayout}
                            ref={ref => this.selectListRef = ref}
                            renderItem={this._renderSelectListItem}
                            renderSectionHeader={this._renderlistSectionHeader}
                        />
                        {this._renderSideBarContent()}
                    </View>
                }
            </PageContainer>
        );
    }
}

const cityItemHeight = 40;

const styles = StyleSheet.create({
    searchContent: {
        height: 30,
        borderRadius: 2,
        marginVertical: 10,
        marginHorizontal: 15,
        backgroundColor: '#eee',
    },
    searchBtnClearItem: {
        width: 40,
        height: 30,
        paddingVertical: 0,
        paddingHorizontal: 0,
        backgroundColor: 'transparent',
    },
    searchIconStyle: {
        width: 15,
        height: 15,
        marginLeft: 10,
        marginRight: 5,
        tintColor: '#999',
    },
    searchInputStyle: {
        flex: 1,
        fontSize: 12,
        paddingVertical: 0,
        // backgroundColor: '#ddd',
    },
    content: {
        flex: 1,
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
    listItemView: {
        marginLeft: 15,
        marginRight: 40,
        paddingVertical: 0,
        borderColor: '#ddd',
        paddingHorizontal: 0,
        height: cityItemHeight,
        backgroundColor: 'transparent',
        borderTopWidth: Predefine.minPixel,
    },
    firstListItem: {
        borderTopWidth: 0,
    },
    searchListItem: {
        marginRight: 15,
    },
    listItemStyle: {
        fontSize: 13,
        color: '#555',
    },
    separatorStyle: {
        backgroundColor: '#ddd',
    },
    sideBarContent: {
        top: 30,
        right: 0,
        bottom: 30,
        maxWidth: 40,
        paddingVertical: 10,
        paddingHorizontal: 5,
        position: 'absolute',
        backgroundColor: 'transparent',
        height: SCREEN_HEIGHT - NAV_BAR_HEIGHT - 130,
    },
    sideBarItem: {
        flex: 1,
        width: 30,
        fontSize: 13,
        marginVertical: 2,
        paddingVertical: 0,
        textAlign: 'center',
        paddingHorizontal: 0,
        color: Predefine.themeColor,
        backgroundColor: 'transparent',
    },
    sideBarIconIem: {
        // backgroundColor: '#f60',
    },
    sideBarIconStyle: {
        width: 20,
        height: 20,
        tintColor: Predefine.themeColor,
    },
    sideBarTitleStyle: {
        color: Predefine.themeColor,
    },
});