'use strict';
import React, { useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createAppContainer } from 'react-navigation';
import { StackNavigator } from './RouterConfig';
import RouterHelper from './RouterHelper';

const PersistenceKey = 'PersistenceKey';
const PersistenceStatus = __DEV__;
const AppNavigationContainer = createAppContainer(StackNavigator);

function RouterContainer() {
  const navigatorRef = useRef(null);

  const persistNavigationState = useCallback((navState) => {
    return AsyncStorage.setItem(PersistenceKey, JSON.stringify(navState));
  }, []);

  const loadNavigationState = useCallback(async () => {
    setTimeout(() => {
      const navition = navigatorRef.current._navigation;
      RouterHelper.initRouter(navition);
    }, 300);
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(PersistenceKey)
        .then((data) => {
          resolve(JSON.parse(data));
        })
        .catch((error) => {
          // console.log('error---->', error);
          reject();
        });
    });
  }, []);

  const onNavigationStateChange = useCallback(() => {
    const navition = navigatorRef.current._navigation;
    RouterHelper.setRouter(navition);
  }, []);

  const captureRef = useCallback((navigator) => {
    if (navigator) {
      const navition = navigator._navigation;
      RouterHelper.initRouter(navition);
      navigatorRef.current = navigator;
    } else {
      AsyncStorage.removeItem(PersistenceKey);
      navigatorRef.current = null;
    }
  }, []);

  return (
    <AppNavigationContainer
      ref={captureRef}
      onNavigationStateChange={onNavigationStateChange}
      persistNavigationState={
        PersistenceStatus ? persistNavigationState : null
      }
      loadNavigationState={
        PersistenceStatus ? loadNavigationState : null
      }
    />
  );
}

export default React.memo(RouterContainer);
