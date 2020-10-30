'use strict';
import React from 'react';
import AlertView from './AlertView';
import AlertAlbumView from './AlertAlbumView';
import { OverlayManager } from '../Overlay';

const defaultOption = {
  type: 'zoomIn',
  anchorPoint: 'center',
  modal: false,
};

export default class AlertManager {

  static alertKeys = '';
  static forbiddenKey = false;

  static show(props = {}) {
    const { option, ...others } = props;
    const component = <AlertView {...others} />;
    return this.showView(component, option);
  }

  static showForbidden(props = {}) {
    const { option, keyType, ...others } = props;
    if (!this.forbiddenKey && keyType === StatusCode.FORBIDDEN_CODE) {
      this.forbiddenKey = true;
      const component = <AlertView {...others} />;
      return this.showView(component, option);
    }
  }

  static showAlbum(props = {}) {
    const {option, ...others} = props;
    const component = <AlertAlbumView {...others} />;
    return this.showView(component, option);
  }

  static showView(component, option = {}) {
    const newOption = { ...defaultOption, ...option };
    return OverlayManager.pop(component, newOption);
  }

  static hide(key) {
    key = key || this.alertKeys;
    this.forbiddenKey = false;
    OverlayManager.hide(key);
  }
}
