/**
 * RNTemplate - DemoTimePicker
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

export default class DemoTimePicker extends React.PureComponent {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            date: new Date(),
            mode: 'date',
            show: false,
        }
    }

    setDate = (event, date) => {
        // console.log('date---->', date);
        date = date || this.state.date;
        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }

    datepicker = () => {
        this.show('date');
    }

    timepicker = () => {
        this.show('time');
    }

    datetimepicker = () => {
        this.show('datetime');
    }

    countdownpicker = () => {
        this.show('countdown');
    }

    showActionPicker = () => {
        let {show, date, mode} = this.state;
        let params = {
            // defaultDate: date,
            defaultMode: mode,
            onConfirm: (value) => {
                // console.log('value---->', value);
                this.setState({
                    date: value,
                })
            }
        }
        ActionManager.showDate(params);
    };

    render() {
        let {show, date, mode} = this.state;
        let pageTitle = this.params.pageTitle || 'DemoTimePicker';
        return (
            <PageContainer style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView
                    style={styles.scrollViewStyle}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <View style={[Predefine.CCC, styles.content]}>
                        <Text style={styles.dateTimeText}>
                            {'当前选择时间：'}
                            { mode === 'time' && Moment(date).format('HH:mm') }
                            { mode === 'date' && Moment(date).format('YYYY/MM/DD') }
                            { mode === 'datetime' && Moment(date).format('YYYY/MM/DD HH:mm') }
                        </Text>
                        <View style={[Predefine.WRAP, styles.btnWrap]}>
                            <Button
                                title={'设置：日期'}
                                onPress={this.datepicker}
                                style={styles.btnItemStyle}
                                titleStyle={styles.btnTitleStyle}
                            />
                            <Button
                                title={'设置：时间'}
                                onPress={this.timepicker}
                                style={styles.btnItemStyle}
                                titleStyle={styles.btnTitleStyle}
                            />
                            <Button
                                title={'设置：日期+时间'}
                                onPress={this.datetimepicker}
                                style={styles.btnItemStyle}
                                titleStyle={styles.btnTitleStyle}
                            />
                            <Button
                                title={'打开弹窗'}
                                onPress={this.showActionPicker}
                                style={styles.btnItemStyle}
                                titleStyle={styles.btnTitleStyle}
                            />
                        </View>
                    </View>
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
    btnWrap: {},
    btnItemStyle: {
        height: 40,
        marginTop: 20,
        paddingVertical: 0,
        marginHorizontal: 5,
        backgroundColor: Predefine.themeColor,
    },
    btnTitleStyle: {},
    dateTimeText: {
        marginTop: 20,
    },
});