'use strict';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';

function About() {
    return (
        <PageContainer style={styles.container}>
            <NavigationBar title={'About'} renderLeftAction={null}/>
            <TouchableOpacity
                onPress={() => ActionManager.show({
                    title: '111',
                })}
            >
                <Text>测试</Text>
            </TouchableOpacity>
        </PageContainer>
    );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(About);
