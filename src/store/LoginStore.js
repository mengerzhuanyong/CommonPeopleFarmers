/**
 * RNTemplate - LoginStore
 * http://menger.me
 * @大梦
 */

'use strict';

import { action, observable, runInAction } from 'mobx'
import BaseStore from './BaseStore'

export default class LoginStore extends BaseStore {

    constructor(params) {
        super(params);
        this.openid = '';
        this.unionid = '';
        this.location = {
            province: {
                name: '',
                code: '',
            },
            city: {
                name: '',
                code: '',
            },
            area: {
                name: '',
                code: '',
            },
        };
    }

    @observable openid;
    @observable unionid;
    @observable location;


    // 获取地理位置
    @action
    getCurrentPosition = (refresh = false) => {
        return;
        if (!this.location.province || !this.location.province.name || refresh) {
            Geolocation.getCurrentPosition()
                .then((data) => {
                    this._formatLocationData(data);
                })
                .catch((error) => {
                    // console.log('error---->', error);
                });
        }
    }

    // 处理地理信息数据
    @action
    _formatLocationData = async (data) => {
        let originalCityData = CityDataSources.data;
        let _indexPro = 0, _indexCity = 0, _indexArea = 0;
        let _provinceCode, _cityCode, _districtCode;
        _indexPro = originalCityData.findIndex(obj => obj.name.includes(data.province));
        if (_indexPro > -1) {
            _provinceCode = originalCityData[_indexPro].code || '';
            _indexCity = originalCityData[_indexPro].data.findIndex(obj => obj.name.includes(data.city));
        }
        if (_indexCity > -1) {
            _cityCode = originalCityData[_indexPro].data[_indexCity].code || '';
            _indexArea = originalCityData[_indexPro].data[_indexCity].data.findIndex(obj => obj.name.includes(data.district));
        }
        if (_indexArea > -1) {
            _districtCode = originalCityData[_indexPro].data[_indexCity].data[_indexArea].code || '';
        }
        runInAction(() => {
            this.location = {
                ...this.location,
                random: Math.random(),
                province: {
                    name: data.province,
                    code: _provinceCode,
                },
                city: {
                    name: data.city,
                    code: _cityCode,
                },
                area: {
                    name: data.district,
                    code: _districtCode,
                },
                address: data.address,
                lat: data.latitude,
                lng: data.longiitude,
            };
        });
    };

    // 会员中心首页
    @action
    getLatestUserInfo = async () => {
        let url = ServicesApi.USER_INFO;
        let data = {};
        const result = await this.postRequest(url, data);
        runInAction(() => {
            if (result.code === StatusCode.SUCCESS_CODE) {
                this.changeCurrentIdentity(result.data.role);
                this.saveUserInfo(result.data);
            } else {
                // ToastManager.message(result.desc);
            }
        });
        return result;
    };

    @action
    doLogin = async (url, data = {}) => {
        const result = await this.postRequest(url, data);
        runInAction(() => {
            console.log('result---->', result);
            if (result.code === StatusCode.SUCCESS_CODE) {
                this.saveUserInfo(result.data);
                RouterHelper.reset('', 'Tab');
            } else if (result.code === StatusCode.FAIL_CODE) {
                ToastManager.message(result.msg);
            }
        });
        return result;
    };

    @action
    doExtendsLogin = async (url, data) => {
        try {
            if (__IOS__ && data.response) {
                data = {
                    ...data,
                    response: JSON.stringify(data.response),
                };
            }
            const result = await this.postRequest(url, data, true);
            runInAction(() => {
                if (result) {
                    this.openid = result.data.openid;
                    this.unionid = result.data.unionid;
                    if (result.code === StatusCode.SUCCESS_CODE && result.data.mobile !== '') {
                        this.saveUserInfo(result.data);
                    }
                }
            });
            return result;
        } catch (e) {
        }

    };

    @action
    recoverPassword = async (url, data = {}) => {
        const result = await this.postRequest(url, data = {});
        runInAction(() => {
            if (result.code === StatusCode.SUCCESS_CODE) {
                this.saveUserInfo(result.data)
            }
        });
        return result;
    };

    @action
    doLogout = () => {
        RouterHelper.reset('', 'Login', {hideReturn: true});
        this.cleanUserInfo();
    };
}
