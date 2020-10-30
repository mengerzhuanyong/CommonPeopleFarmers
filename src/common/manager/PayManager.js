/**
 * RNTemplate - 支付管理
 * http://menger.me
 * @大梦
 */

'use strict';
import XPay from 'react-native-puti-pay';
import { ServerCode as StatusCode} from '../../services'

const RESULT_SUCCESS = {
    msg: '支付成功!',
    code: StatusCode.SUCCESS_CODE
}
const RESULT_FAIL = {
    msg: '支付失败!',
    code: StatusCode.FAIL_CODE
}
const RESULT_CANCEL = {
    msg: '取消支付!',
    code: StatusCode.FAIL_CODE
}
const RESULT_OTHER = {
    msg: '支付请求出错，请稍后重试!',
    code: StatusCode.FAIL_CODE
}

export default class PayManager {

    // type:'wxpay'  alipay   iapay
    static async pay(type, data) {
        if (type === Constants.PAY_WECHAT) {
            const res = await this.wxPay(data)
            if (res.errCode == 0) {
                return Promise.resolve(RESULT_SUCCESS)
            } else {
                return Promise.resolve(RESULT_FAIL)
            }
        } else if (type === Constants.PAY_ALIPAY) {
            const res = await this.aliPay(data)
            if (res.resultStatus == '6001') {
                return Promise.resolve(RESULT_CANCEL)
            } else if (res.resultStatus == '9000') {
                const result = JSON.parse(res.result)
                if (result.alipay_trade_app_pay_response.code == 10000) {
                    return Promise.resolve(RESULT_SUCCESS)
                } else {
                    return Promise.resolve(RESULT_FAIL)
                }
            } else {
                return Promise.resolve(RESULT_FAIL)
            }
        } else if (type === 'iapay') {
            const res = await this.iaPay(data)
            if (res) {
                return Promise.resolve(RESULT_SUCCESS)
            } else {
                return Promise.resolve(RESULT_FAIL)
            }
        }
        return Promise.resolve(RESULT_OTHER);
    }

    static wxPay(data) {
        return new Promise((resolve) => {
            const wxData = {
                partnerId: data.partnerid,
                prepayId: data.prepayid,
                packageValue: data.package,
                nonceStr: data.noncestr,
                timeStamp: data.timestamp,
                sign: data.sign,
            };
            XPay.wxPay(wxData, (res) => {
                // console.log('微信支付', res)
                resolve(res)
            })
        })
    }

    static aliPay(data) {
        return new Promise((resolve) => {
            XPay.alipay(data, (res) => {
                // console.log('支付宝支付', res)
                resolve(res)
            })
        })
    }

    static async iaPay(data) {
        // const purchase = await IaPay.buyProduct(data.id);
        // console.log('iaPay', purchase)
        // return purchase
    }


}