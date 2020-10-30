/**
 * RNTemplate - HomeStore
 * http://menger.me
 * @大梦
 */

'use strict';

import { action, observable, runInAction } from 'mobx'
import BaseStore from './BaseStore'

export default class HomeStore extends BaseStore {

    constructor(params) {
        super(params);
        this.newsData = [
            {title: '平台资讯', data_list: []},
            {title: '协会资讯', data_list: []},
            {title: '俱乐部资讯', data_list: []},
        ];
        this.gymsData = [];
        this.contestData = [];
        this.dataSource = [];
    }

    @observable newsData;
    @observable gymsData;
    @observable contestData;
    @observable dataSource;

    // 首页
    @action
    requestDataSources = async (url, data) => {
        const result = await this.postRequest(url, data);
        runInAction(() => {
            if (result.code === StatusCode.SUCCESS_CODE) {
                this.newsData = result.data.news_data;
                this.gymsData = result.data.gyms_data;
                this.contestData = result.data.contest_data;
            } else {
                ToastManager.message(result.desc);
            }
        });
        return result;
    };

     // 数据列表
     @action
     requestListDataSource = async (url, data) => {
 
         const result = await this.postRequest(url, data, true);
         
         if (result.code === StatusCode.SUCCESS_CODE) {
             runInAction(() => {
                 if (data.page === 1) {
                     this.dataSource = result.data.list_data;
                 } else {
                     let temp = this.dataSource.slice();
                     if (result.data.list_data.length !== 0) {
                         this.dataSource = temp.concat(result.data.list_data);
                     }
                 }
             })
         }
         return result;
     };
}