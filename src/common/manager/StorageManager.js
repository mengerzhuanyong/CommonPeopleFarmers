/**
 * RNTemplate - 存储管理
 * http://menger.me
 * @大梦
 */

'use strict';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storageInstance = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

export default class StorageManager {
  static load(key) {
    return new Promise((resolve) => {
      storageInstance
        .load({ key })
        .then((data) => {
          resolve({ code: StatusCode.SUCCESS_CODE, data: data });
        })
        .catch(() => {
          resolve({ code: StatusCode.FAIL_CODE, data: {} });
        });
    });
  }

  static save = async (key, data) => {
    return new Promise((resolve) => {
      storageInstance
        .save({ key, data })
        .then(() => {
          resolve({ code: StatusCode.SUCCESS_CODE, data: data });
        })
        .catch(() => {
          resolve({ code: StatusCode.FAIL_CODE, data: {} });
        });
    });
  };

  static remove = async (key) => {
    return new Promise((resolve) => {
      storageInstance
        .remove({ key })
        .then((data) => {
          resolve({ code: StatusCode.SUCCESS_CODE, data: data });
        })
        .catch(() => {
          resolve({ code: StatusCode.FAIL_CODE, data: {} });
        });
    });
  };
}
