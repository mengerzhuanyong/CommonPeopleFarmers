/**
 * RNTemplate - 系统资源 - 合并导出
 * http://menger.me
 * @大梦
 */

'use strict';

import {DefaultSources} from './default'
import {CustomerSources} from './customer'

export const Images = {

    /**
     * @系统默认资源
     */
    ...DefaultSources,

    /**
     * @用户自定义资源
     */
    ...CustomerSources,


    /**
     * @TABBAR [Tabbar]
     */
    icon_tabbar_mine: require('./tabbar/icon_tabbar_mine.png'),
    icon_tabbar_home: require('./tabbar/icon_tabbar_home.png'),
    // active
    icon_tabbar_mine_cur: require('./tabbar/icon_tabbar_mine_cur.png'),
    icon_tabbar_home_cur: require('./tabbar/icon_tabbar_home_cur.png'),
};