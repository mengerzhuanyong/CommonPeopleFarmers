/**
* @Author nanfeng
* @CreatTime 2019-11-28 09:59
* @Des Form Validation
*/

import { checkMobile, checkEmpty } from '../Tool';
import { ToastManager } from '../../components';

const rule = {
    avatar: '头像',
    con_name: '昵称',
    birthday: '生日',
    addreass: '地址',
    old_phone_number: '原手机号',
    phone_number: '手机号',
    code: '短信验证码',
    password: '密码',
    re_password: '确认密码',
    invitation_code: '邀请码',
    payment_password: '支付密码',
    receiver_id: '赠送人',
    cat_code: '猫卡类型',
    receiver_tel: '收卡人手机号',
    award_title: '任务标题',
    award_typeid: '任务类型',
    award_describe: '任务描述',
    award_images: '任务图片',
    frequency: '可领取次数',
    award_value: '悬赏值',
    payment_method: '支付方式',
    voucher: '任务凭证',
    reason: '申诉理由',
    currency: '求购数量',
    unit_price: '求购单价',
}

const message = {
    receiver_id: '请选择您要赠送的人',
    receiver_tel: '请输入收卡人手机号',
    cat_code: '请选择猫卡',
    voucher: '请上传任务凭证',
    currency: '请输入求购数量',
    unit_price: '请输入求购单价',
}

/**
 * 表单验证
 * @param {*} FormData 表单数据
 * @param {*} Ignore 忽略值
 * @param {*} Reverse 反向：忽略值变验证值
 */
export function FormValidation(FormData,Ignore='',Reverse=false) {
    let IgnoreArr = Ignore.split(',')
    for (let i in FormData) {
        let _index = IgnoreArr.indexOf(i)
        let c = Reverse ? _index != -1 : _index == -1
        if (c) {
            let msg = message[i] ? message[i] : rule[i]+'不能为空'
            if (checkEmpty(FormData[i])) {
                ToastManager.warn(msg)
                return false;
            }
            // if (i === 'phone_number') {
            //     if (!checkMobile(FormData[i])) {
            //         ToastManager.warn('手机号输入有误，请重新输入')
            //         return false;
            //     }
            // }
            if (i === 're_password') {
                if (FormData.password && FormData[i] != FormData.password) {
                    ToastManager.warn('两次密码输入不一致，请重新输入')
                    return false;
                }
                if (FormData.payment_password && FormData[i] != FormData.payment_password) {
                    ToastManager.warn('两次密码输入不一致，请重新输入')
                    return false;
                }
            }
        }
    }
    return true
}


