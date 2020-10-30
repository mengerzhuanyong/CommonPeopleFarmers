'use strict';
import React from 'react'
import {Clipboard, PermissionsAndroid} from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import FetchBlob from 'rn-fetch-blob'
import JShareModule from 'jshare-react-native'
import ActionSheetView from './ActionSheetView'
import ActionKeyboard from './ActionKeyboard'
import ActionShareContent from './ActionShareContent'
import {OverlayManager} from '../Overlay'
import {DatePicker} from '../DatePicker'
import {PickerCityTree} from '../CityPicker'

const defaultOption = {
  type: 'bottom',
  modal: false,
  providerContentScale: 0.9,
  providerContentStyle: { borderRadius: 6, overflow: 'hidden' },
};

export default class ActionManager {

  static actionKeys = '';

  static show(props = {}) {
    const { option, ...others } = props;
    const component = (
      <ActionSheetView {...others} onCancel={() => this.hide()} />
    );
    return this.showView(component, option);
  }

  static showCityTree(props = {}) {
    let { option, ...others } = props;
    let component = (
      <PickerCityTree {...others} onCancel={() => this.hide()} />
    );
    return this.showView(component, option);
  }

  static showDate(props = {}) {
    // console.log('props---->', props);
    let { option, ...others } = props;
    let component = (
      <DatePicker {...others} onCancel={() => this.hide()} />
    );
    if (__ANDROID__) {
      option = {
        providerContentScale: 1,
        ...option,
      }
    }
    return this.showView(component, option);
  }

  static showKeyboard(props = {}) {
    const { option, ...others } = props;
    const component = (
      <ActionKeyboard {...others} onCancel={() => this.hide()} />
    );
    return this.showView(component, option);
  }

  static async downloadShareImage(params) {
        if (
          params.imageUrl &&
          typeof params.imageUrl === 'string' &&
          !params.imageUrl.startsWith('http') &&
          !params.imageUrl.startsWith('/Users') &&
          !params.imageUrl.startsWith('file://')
        ) {
          params.imageUrl = ServicesApi.QI_NIU_HOST + params.imageUrl;
        }
        // console.log('onPressToSaveImage---->', params.imageUrl);
        if (__ANDROID__) {
            let perRes = await PermissionsAndroid.request('android.permission.WRITE_EXTERNAL_STORAGE', null);
        }
        const {PictureDir} = FetchBlob.fs.dirs;
        params.imageUrl = params.imageUrl.replace(Constants.IMAGE_CROP_OPTIONS, '');
        try {
            let result = await Services.download(params.imageUrl);
            if (result) {
                const rollUri = __IOS__ ? result : `file://${result}`
                const saveRes = await CameraRoll.saveToCameraRoll(rollUri, 'photo');
                // console.log('rollUri---->', rollUri);
                if (saveRes) {
                    // console.log('rollUri---->', rollUri);
                    let pathArr = rollUri.split('files');
                    let localPath = PictureDir + pathArr[1];
                    // console.log('localPath---->', localPath);
                    return localPath;
                } else {
                    // console.log('SaveError---->', 'SaveError');
                }
            }
        } catch (error) {
            // console.log('onPressToSaveImage----> error---->', error);
            return;
        }
    }

  static showShare(props = {}) {
    const {share_params: {type, url, title, text, imageUrl}, onCallBack, ...others} = props;
    let params = {
        onPress: async (item) => {
            // console.log('item---->', item);
            let platform;
            switch (item) {
                case Constants.SHARE_WE_CHAT:
                    // 微信
                    platform = 'wechat_session';
                    break;
                case Constants.SHARE_TIME_LIME:
                    // 微信朋友圈
                    platform = 'wechat_timeLine';
                    break;
                case Constants.SHARE_QQ:
                    // qq
                    platform = 'qq';
                    break;
                case Constants.SHARE_QQ_ZONE:
                    // qqzone
                    platform = 'qzone';
                    break;
                case Constants.SHARE_LINK:
                    Clipboard.setString(url);
                    ToastManager.message('已复制到剪切板');
                    return;
                default:
                    break;
            }
            let _shareParamsTemp = {type, platform, url, title, text};
            if (__ANDROID__ && (platform ==='wechat_session' || platform === 'wechat_timeLine')) {
                let localPath = await this.downloadShareImage(props.share_params);
                _shareParamsTemp = {
                    imagePath: localPath,
                    ..._shareParamsTemp,
                }
            } else {
                _shareParamsTemp = {
                    imageUrl: imageUrl,
                    ..._shareParamsTemp,
                }
            }
            // console.log('_shareParamsTemp---->', _shareParamsTemp);
            JShareModule.share(_shareParamsTemp, (result) => {
                onCallBack && onCallBack(result);
                // console.log('JShareModule----> result---->', result);
                if (result.state === 'success') {
                    ToastManager.message('分享成功！');
                } else {
                    ToastManager.message(result.description || '分享失败！');
                }
            }, (error) => {
                onCallBack && onCallBack(error);
                // console.log('JShareModule----> error---->', error);
                ToastManager.message('分享出错！');
            })
        }
    }
    this.showShareModule(params);
  }

  static showShareModule(props = {}) {
    const { option, onPress, ...others } = props;
    const component = (
      <ActionShareContent {...others} onPress={onPress} onCancel={() => this.hide()} />
    );
    return this.showView(component, option);
  }

  static showView(component, option = {}) {
    const newOption = { ...defaultOption, ...option };
    const key = OverlayManager.pull(component, newOption);
    this.actionKeys = key;
    return key;
  }

  static hide(key) {
    key = key || this.actionKeys;
    OverlayManager.hide(key);
  }
}
