/**
 * RNTemplate - DemoPicker
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

export default class DemoPicker extends React.PureComponent {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
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

    componentDidMount() {
        this.requestDataSources();
    }

    componentWillMount() {
    }

    requestDataSources = async () => {

    };

    render() {
        let {localImages, uploadImages} = this.state;
        let pageTitle = this.params.pageTitle || 'DemoPicker';
        return (
            <PageContainer style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
            </PageContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
});