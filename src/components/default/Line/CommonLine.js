'use strict';

import React, { PureComponent } from 'react'
import { StyleSheet, View, } from 'react-native'

export class VerticalLine extends PureComponent {

    static defaultProps = {
        style: {},
    };

    render() {
        let { style } = this.props;
        return (
            <View style={[styles.verLine, style]} />
        );
    }
}

export class HorizontalLine extends PureComponent {

    static defaultProps = {
        style: {},
    };

    render() {
        let { style } = this.props;
        return (
            <View style={[styles.horLine, style]} />
        );
    }
}

const styles = StyleSheet.create({
    verLine: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#f5f5f5'
    },
    horLine: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#f5f5f5'
    },
});