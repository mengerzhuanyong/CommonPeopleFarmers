/**
 * RNTemplate - 退出APP
 * http://menger.me
 * @大梦
 */

'use strict';

import React from 'react'
import {
    NativeModules
} from 'react-native'

export default class ExitAppManager {
    
    static exitApp() {
        NativeModules.RNExitApp.exitApp();
    }
}