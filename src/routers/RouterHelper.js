'use strict';
import {StackActions, NavigationActions} from 'react-navigation';

export default class RouterHelper {
    /**
     * @导航实例
     */
    static navigation = null;
    /**
     * @上次执行to方法的时间
     */
    static lastActionTime = 0;
    /**
     * @重复点击判断间隔时间
     */
    static interval = 600;
    /**
     * @列表保存路由栈信息
     */
    static routerStacks = [];
    /**
     * @路由检查权限设置
     */
    static checkLoginState = false;
    /**
     * @未登录忽略名单 跳转时跳到登录界面
     */
    static loginIgnoreRoute = [
        'Tab',
        'Forget',
        'Register',
        'CheckUpdates',
    ];

    static checkActionState() {
        if (!this.navigation) {
            // eslint-disable-next-line no-console
            console.error('请先初始化路由');
            return true;
        }
        const nowTime = new Date().getTime();
        if (nowTime - this.lastActionTime <= this.interval) {
            return true;
        }
        this.lastActionTime = nowTime;
        return false;
    }

    // 检查路由登录权限
    static checkRouterStatus(routeName) {
        if (!global.token && this.loginIgnoreRoute.length > 0 && this.checkLoginState) {
            const _index = this.loginIgnoreRoute.findIndex(item => item === routeName);
            console.log('routeName, _index---->', routeName, _index);
            if (_index < 0) {
                routeName = 'Login';
            }
        }
        return routeName;
    }

    // 拦截路由
    static interceptRouter(routeName, params) {
        if (routeName || params) {
        }
        return false;
    }

    static initRouter(navition) {
        this.setRouter(navition);
    }

    static setRouter(navition) {
        if (navition) {
            this.setNavigation(navition);
            this.setRouterStacks(navition.state ? navition.state.routes : []);
        }
    }

    static setNavigation(navigation) {
        this.navigation = navigation;
    }

    static setRouterStacks(routerStacks = []) {
        this.routerStacks = routerStacks;
    }

    // 最好使用这个
    static navigate(pageTitle, routeName, params = {}) {
        params = {
            pageTitle,
            ...params,
        };
        if (this.checkActionState()) {
            return;
        }
        if (this.interceptRouter(routeName, params)) {
            return;
        }
        console.log('navigate----> routeName---->', routeName);
        routeName = this.checkRouterStatus(routeName);
        this.navigation.navigate(routeName, params);
    }

    static push(pageTitle, routeName, params = {}) {
        params = {
            pageTitle,
            ...params,
        };
        if (this.checkActionState()) {
            return;
        }
        if (this.interceptRouter(routeName, params)) {
            return;
        }
        routeName = this.checkRouterStatus(routeName);
        this.navigation.push(routeName, params);
    }

    static goBack(routeName) {
        console.log('goBack----> routeName---->', routeName);
        if (this.checkActionState()) {
            return;
        }
        if (routeName) {
            const index = this.routerStacks.findIndex(
                (item) => routeName === item.routeName,
            );
            if (index >= 0) {
                const navTarget = this.routerStacks[index + 1];
                this.navigation.goBack(navTarget.key);
            }
        } else {
            this.navigation.goBack(null);
        }
    }

    static dismiss() {
        if (this.checkActionState()) {
            return;
        }
        this.navigation.dismiss();
    }

    static pop(number, params = {}) {
        if (this.checkActionState()) {
            return;
        }
        this.navigation.pop(number, params);
    }

    static popToTop(params = {}) {
        if (this.checkActionState()) {
            return;
        }
        this.navigation.popToTop(params);
    }

    static replace(pageTitle, routeName, params = {}) {
        params = {
            pageTitle,
            ...params,
        };
        if (this.checkActionState()) {
            return;
        }
        routeName = this.checkRouterStatus(routeName);
        const replaceAction = StackActions.replace({
            routeName: routeName,
            params: params,
        });
        this.navigation.dispatch(replaceAction);
    }

    static reset(pageTitle, routeName, params = {}) {
        params = {
            pageTitle,
            ...params,
        };
        if (this.checkActionState()) {
            return;
        }
        routeName = this.checkRouterStatus(routeName);
        this.navigation.reset(
            [NavigationActions.navigate({routeName, params})],
            0,
        );
    }
}
