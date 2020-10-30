'use strict';
/**
 * 检查手机号是否正确
 * @param
 * @returns {Boolean}
 */
export function checkMobile(mobile) {
  const reg = new RegExp(/(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/);
  return reg.test(mobile);
}
/**
 * 检查是否为number类型
 * @param
 * @returns {Boolean}
 */
export function checkNumber(number) {
  const regPos = new RegExp(/^\d+(\.\d+)?$/); //非负浮点数
  const regNeg = new RegExp(
    /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/,
  ); //负浮点数
  if (regPos.test(number) || regNeg.test(number)) {
    return true;
  } else {
    return false;
  }
}
/**
 * 检查是否为空
 * @param
 * @returns {Boolean}
 */
export function checkEmpty(string) {
  if (typeof string === 'undefined') {
    return true;
  }
  if (string === null) {
    return true;
  }
  if (string === '') {
    return true;
  }
  return false;
}

/**
 * 检测字符串是否有中文
 * @param
 * @returns {Boolean}
 */
export function containsChinese(value) {
  const reg = new RegExp(/.*[\u4e00-\u9fa5]+.*$/);
  return reg.test(value);
}
/**
 * 检查是否为空
 * @param
 * @returns {String}
 */
export function conversionBytes(bytes) {
  if (bytes === 0) {
    return '0 B';
  }
  const k = 1000,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
/**
 * 以Base64位字符串数据的形式返回一个图片的source
 * @param
 * @returns {String}
 */
export function base64Prefix(data) {
  return `data:image/png;base64,${data}`;
}
/**
 * 阶乘算法
 * @param
 * @returns {Int}
 */
export function factorial(num) {
  if (num < 0) {
    return -1;
  } else if (num === 0 || num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
/**
 * 转换时分秒
 * @param
 * @returns
 */
export function conversionSeconds(seconds) {
  let arr = [
    parseInt(seconds / 60 / 60),
    parseInt((seconds / 60) % 60),
    parseInt(seconds % 60),
  ];
  return arr.join(':').replace(/\b(\d)\b/g, '0$1');
}

/**
 * 过滤掉false, null, 0, "", undefined, and NaN
 * @param array
 * @returns {Array}}
 */
export function bouncerEmpty(arr) {
  return arr.filter((val) => {
    return !(!val || val === '');
  });
}

/**
 *
 * 冒泡排序
 * @param array
 * @param sortType ascending descending
 * @returns array
 */
export function bubbleSort(array, sortType = 'ascending') {
  if (!(array instanceof Array)) {
    // console.warn('请传入一个数组类型的参数！')
    return array;
  }
  let arrayTemp = array.slice();
  for (let i = 0; i < arrayTemp.length; i++) {
    for (let j = 0; j < arrayTemp.length - i - 1; j++) {
      const element = arrayTemp[j];
      const element1 = arrayTemp[j + 1];
      if (parseInt(element1) < parseInt(element)) {
        arrayTemp[j] = element1;
        arrayTemp[j + 1] = element;
      }
    }
  }
  return sortType === 'ascending' ? arrayTemp : arrayTemp.reverse();
}

/**
 *
 * 日期时间格式化
 * @param new Date()
 * @param sortType ascending descending
 * @returns String
 */
export function formatDateTime(date, fmt) {
  if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
      'M+': date.getMonth() + 1,
      'D+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  };
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};


// /**
//  * 转换时间戳
//  * @param 时间戳
//  * @returns
//  */
// export function formatTimeStamp(dateTimeStamp) {
//   const minute = 1000 * 60, hour = minute * 60, day = hour * 24, week = day * 7, month = day * 30;
//   // const nowTime = Moment().format('x');   //获取当前时间毫秒
//   const diffValue = nowTime - parseInt(dateTimeStamp);  //时间差
//   if (diffValue < 0) {
//     return dateTimeStamp;
//   }
//   let result;
//   const minC = diffValue / minute, hourC = diffValue / hour, dayC = diffValue / day, weekC = diffValue / week, monthC = diffValue / month;
//   if (monthC >= 1 && monthC <= 3) {
//     result = `${parseInt(monthC)} 月前`;
//   } else if (weekC >= 1 && weekC <= 3) {
//     result = `${parseInt(weekC)} 周前`;
//   } else if (dayC >= 1 && dayC <= 6) {
//     result = `${parseInt(dayC)} 天前`;
//   } else if (hourC >= 1 && hourC <= 23) {
//     result = `${parseInt(hourC)} 小时前`;
//   } else if (minC >= 1 && minC <= 59) {
//     result = `${parseInt(minC)} 分钟前`;
//   } else if (diffValue >= 0 && diffValue <= minute) {
//     result = '刚刚';
//   } else {
//     result = Moment(parseInt(dateTimeStamp)).format('YYYY-MM-DD');
//   }
//   return result;
// }

/**
 * 清除定时器
 * @param timers [Array / Number]
 * @return
 */
export function clearTimer(timers) {
  if (Array.isArray(timers)) {
    for (let i = 0; i < timers.length; i++) {
        let timer = timers[i];
        if (timer) {
            console.log('clearTimeout---->', timer);
            clearTimeout(timer);
        }
    }
  } else {
    clearTimeout(timers);
  }
};

/**
 * 字符串填充
 * @author Meng
 * @dateTime 2020-09-10
 * @param    {[type]}   string     [description]
 * @param    {[type]}   length     [description]
 * @param    {[type]}   pad_string [description]
 * @param    {[type]}   pad_type   [left 左侧填充 right 右侧填充 both 两侧填充]
 * @return   {[type]}              [description]
 */
export function str_pad(string, length, pad_string = 0, pad_type = 'left') {
    let _strLength = String(string).length;
    if (_strLength > length) return string;

    let _newString = '';
    let _pad_length = length - _strLength;
    let _pad_string = Array(Math.floor(_pad_length)).fill(pad_string).join('');
    switch(pad_type) {
      case 'both':
        let _length = _pad_length / 2;
        let leftString = Array(Math.floor(_length)).fill(pad_string).join('');
        let rightString = Array(Math.ceil(_length)).fill(pad_string).join('');
        _newString = leftString + string + rightString;
        break;
      case 'left':
        _newString = _pad_string + string;
        break;
      case 'right':
        _newString = string + _pad_string;
        break;
      default:
        break;
    }
    return _newString;
}