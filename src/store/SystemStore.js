/**
 * RNTemplate - SystemStore
 * http://menger.me
 * @大梦
 */

'use strict';

import { action, observable, runInAction } from 'mobx'
import BaseStore from './BaseStore'

export default class SystemStore extends BaseStore {

    constructor(params) {
        super(params);
        this.systemSources = {
            nav_array_index: [],
            banner_index: [],
            banner_gym: '',
            new_message: 0,
        };
        this.contactInfo = {
            tel: '',
            wechat: '',
        };
        this.statistics = {
            qr_code: '',
            qr_code_tips: '',
            wechat_account: '',
            customer_service_time: '',
        };
    }

    @observable systemSources;
    @observable contactInfo;

    // 系统资源
    @action
    requestStatisticsDataSources = async () => {
        let url = ServicesApi.STATISTICS_INDEX;
        let data = {};
        const result = await this.postRequest(url, data);
        runInAction(() => {
            if (result.code === StatusCode.SUCCESS_CODE) {
                this.statistics = result.data;
            }
        });
        return result;
    };

    // 系统资源
    @action
    requestDataSources = async (url, data) => {
        const result = await this.postRequest(url, data);
        runInAction(() => {
            if (result.code === StatusCode.SUCCESS_CODE) {
                this.systemSources = result.data;
            }
        });
        return result;
    };

    // 联系方式
    @action
    requestContactSources = async (url, data) => {
        const result = await this.postRequest(url, data);
        runInAction(() => {
            if (result.code === StatusCode.SUCCESS_CODE) {
                this.contactInfo = result.data;
            }
        });
        return result;
    };
}