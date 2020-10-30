/**
 * RNTemplate - DatePicker
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
import PropTypes from 'prop-types'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Predefine } from '../../../config/predefine'
import Constants from '../../../config/constant'

export default class DatePicker extends React.PureComponent {

    static propTypes = {
        // defaultDate: PropTypes.date,
        // defaultMode: PropTypes.string,
        onCancel: PropTypes.func,
        onConfirm: PropTypes.func,
    };

    static defaultProps = {
        defaultDate: new Date(),
        defaultMode: Constants.DATE_TIME,
    };

    constructor(props) {
        super(props);
        this.state = {
            showTime: false,
        };
        this.mode = props.defaultMode;
        this.date = props.defaultDate;
    }

    _onCancel = () => {
        // console.log('_onCancel---->', '_onCancel');
        this.props.onCancel && this.props.onCancel();
    };

    _onConfirm = (date) => {
        // console.log('_onConfirm---->', '_onConfirm');
        this.props.onCancel && this.props.onCancel();
        this.props.onConfirm && this.props.onConfirm(date);
    };

    _onChangeDate = (event, date) => {
        // console.log('date---->', date);
        if (date === undefined) {
            this._onCancel();
        } else {
            if (this.mode === Constants.DATE_TIME && __ANDROID__) {
                this.setState({showTime: true});
                this._onCancel();
            } else {
                this.date = date;
                __ANDROID__ && this._onConfirm(date);
            }
        }
    }

    _onAndroidChangetDate = (event, date) => {
        // console.log('date---->', date);
        if (date === undefined) {
            this._onCancel();
        } else {
            this.setState({showTime: false});
            this.date = date;
            __ANDROID__ && this._onConfirm(date);
        }
    }

    _renderActionTopButtonContent = () => {
        if (__ANDROID__) return null;
        return (
            <View style={[Predefine.RCB, styles.actionTopBtnWrap]}>
                <Text
                    onPress={this._onCancel}
                    style={styles.actionTopBtnItemStyle}
                >取消</Text>
                <Text
                    onPress={() => this._onConfirm(this.date)}
                    style={[styles.actionTopBtnItemStyle, styles.actionTopBtnItemCurStyle]}
                >确定</Text>
            </View>
        );    
    };

    _renderActionContainerContent = (mode, date, showTime) => {
        if (__ANDROID__ && showTime) {
            return (
                <DateTimePicker
                    mode={'time'}
                    value={date}
                    is24Hour={true}
                    display={'default'}
                    timeZoneOffsetInMinutes={0}
                    onChange={this._onAndroidChangetDate}
                />
            );
        }
        return (
            <DateTimePicker
                mode={mode}
                value={date}
                is24Hour={true}
                display={'default'}
                timeZoneOffsetInMinutes={0}
                onChange={this._onChangeDate}
            />
        );
    };

    render() {
        let {showTime} = this.state;
        let {item, style} = this.props;
        return (
            <View style={[styles.container, style]}>
                {this._renderActionTopButtonContent()}
                {this._renderActionContainerContent(this.mode, this.date, showTime)}
            </View>
        );
    }
}

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
        width: 60,
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    actionTopBtnItemCurStyle: {
        color: Predefine.themeColor,
    },
});