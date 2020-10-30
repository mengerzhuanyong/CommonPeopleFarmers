/**
 * RNTemplate - BaseStore
 * http://menger.me
 * @大梦
 */

'use strict';

import { action, observable, configure, runInAction, toJS } from 'mobx'

configure({ enforceActions: 'observed' });

export default class BaseStore {

    constructor(params) {
        this.userInfo = {};
        this.loading = false;
        this.error = {
            isError: '',
            errorMsg: '',
        };
        this.currentIdentity = Constants.PERSONAL;
    }

    @observable error;
    @observable userInfo;
    @observable loading = false;
    @observable currentIdentity;


    @action
    getJSDataSources(dataSources) {
        return toJS(dataSources);
    }

    @action
    getRequest = async (url, query) => {
        this.loading = true;
        const result = await Services.get(url, query);
        runInAction(() => {
            this.loading = false;
            if (result && result.code === StatusCode.TOKEN_EXPIRED_CODE) {
                ToastManager.message(result.msg);
                this.cleanUserInfo();
                return RouterHelper.reset('', 'Login');
            }
        });
        return result;
    };

    @action
    postRequest = async (url, data) => {
        this.loading = true;
        const result = await Services.post(url, data);
        runInAction(() => {
            this.loading = false;
            if (result && result.code === StatusCode.TOKEN_EXPIRED_CODE) {
                ToastManager.message(result.msg);
                this.cleanUserInfo();
                return RouterHelper.reset('', 'Login');
            }
        });
        return result;
    };

    @action
    changeCurrentIdentity = (identity) => {
        this.currentIdentity = identity;
    };

    @action
    saveUserInfo = (userInfo) => {
        this.userInfo = userInfo;
        global.token = userInfo.token;
        // global.role = userInfo.role;
        let result = StorageManager.save(Constants.USER_INFO_KEY, userInfo);
        let first_open = StorageManager.save(Constants.FIRST_OPEN, false);
    };

    @action
    cleanUserInfo = () => {
        global.token = '';
        // global.role = '';
        this.userInfo = { mobile: '', token: '' };
        let result = StorageManager.remove(Constants.USER_INFO_KEY);
    }

}