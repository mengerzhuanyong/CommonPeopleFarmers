'use strict';
/**
 * @状态码
 */
export default {
  /**
   * @成功
   */
  SUCCESS_CODE: 1,
  SUCEESS_MSG: '请求成功',
  /**
   * @成功
   */
  BAIDU_SUCCESS_CODE: 0,
  BAIDU_SUCEESS_MSG: '请求成功',
  /**
   * @成功
   */
  SHARE_SUCCESS_CODE: 0,
  SHARE_SUCEESS_MSG: 'success',
  /**
   * @失败
   */
  FAIL_CODE: 0,
  FAIL_MSG: '请求失败，请稍后重试',
  /**
   * @超时
   */
  OVERTIME_CODE: 50100,
  OVERTIME_MSG: '请求超时',
  /**
   * @404 [未找到页面]
   */
  NOT_FOUND_CODE: 40400,
  NOT_FOUND_MSG: '',
  /**
   * @过期 [token过期]
   */
  TOKEN_EXPIRED_CODE: 4003,
  TOKEN_EXPIRED_MSG: 'Token已过期，请重新登录',
  /**
   * @过期 [账号被禁用]
   */
  FORBIDDEN_CODE: 4004,
  FORBIDDEN_MSG: '账号被禁用',
  /**
   * @设置支付密码
   */
  PAY_PWD_CODE: 5001,
  PAY_PWD_MSG: '请先设置支付密码',
  /**
   * @设置收款码
   */
  PAYMENT_CODE_CODE: 5002,
  PAYMENT_CODE_MSG: '请先设置收款码',
  /**
   * @人民币不足去充值
   */
  RMB_RECHARGE_CODE: 5004,
  RMB_RECHARGE_MSG: '人民币余额不足，请先充值',
  /**
   * @平台币不足去购买
   */
  COIN_RECHARGE_CODE: 5005,
  COIN_RECHARGE_MSG: '平台币余额不足，请先购买',
  /**
   * @实名认证
   */
  APPROVE_CODE: 5003,
  APPROVE_MSG: '请先进行实名认证',
  /**
   * @实名认证失败，免费重试
   */
  APPROVE_RETRY_CODE: 10010,
  APPROVE_RETRY_MSG: '认证失败，请重试',
  /**
   * @服务器不通 [详细描述]
   */
  SERVER_ERROR_CODE: 50000,
  SERVER_ERROR_MSG: '服务器请求失败，请稍后重试',
};
