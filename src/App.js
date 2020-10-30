/**
 * RNTemplate - App
 * http://menger.me
 * @大梦
 */

'use strict';

import React, {useState, useEffect} from 'react'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'mobx-react'

import './config/global'
import './config/predefine'
import stores from './store'
import Index from './page'
import {useBackExitApp} from './common/hooks'
import {DevRefresh, ThemeProvider, OverlayProvider} from './components'

function App() {

    const [state, setState] = useState({});
    useEffect(() => {
        // 加载主题
        async function _loadTheme() {
            const _localTheme = await StorageManager.load('THEME1');
            if (_localTheme.code === StatusCode.StatusCode) {
                setState({
                    ..._localTheme.data,
                });
            }
        };
        _loadTheme();
    }, []);

    useBackExitApp(() => {
        const routerStacks = RouterHelper.routerStacks;
        if (routerStacks.length === 1) {
            return true;
        } else {
            return false;
        }
    });

    return (
        <Provider {...stores}>
            <ThemeProvider defaultTheme={state}>
                <OverlayProvider>
                    <Index />
                    <DevRefresh />
                </OverlayProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default React.memo(App);