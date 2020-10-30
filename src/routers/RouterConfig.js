'use strict';
import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    createBottomTabNavigator
} from 'react-navigation-tabs';
import {
    tabOptions,
    transitionConfig
} from './RouterTool';
import {
    TabBottomBar
} from '../components';

// Demo
import {
    DemoBaiduFace,
    DemoAlert,
    DemoButton,
    DemoContainer,
    DemoImageView,
    DemoRow,
    DemoList,
    DemoOverlay,
    DemoPicker,
    DemoToast,
    DemoTheme,
    Example,
    DemoSegmented,
    DemoCard,
    DemoWebBrowser,
    DemoPopover,
    DemoPermissions,
    DemoForm,
    DemoUpload,
    DemoCityPicker,
    DemoCityPicker2,
    DemoTimePicker,
} from '../modules';

// 公共 - 城市选择
import PickerCity from '../page/common/PickerCity'
// 公共 - webpage
import WebPage from '../page/webview/WebPage'

// 登录
import Login from '../page/login/Login';
// 注册
import Register from '../page/login/Register';
// 忘记密码
import Forget from '../page/login/Forget';

/** 首页 */
import Home from '../page/home/Home';

/** 游戏 */
// 游戏详情
import GameDetail from '../page/game/GameDetail';

/** 我的 */
import Mine from '../page/mine/Mine';

/** 系统 */
// 检查更新
import CheckUpdates from '../page/system/CheckUpdates';

const TabNavigatorRouter = {
    Home: {screen: Home,navigationOptions: tabOptions({
            title: '首页',
            normalIcon: Images.icon_tabbar_home,
            selectedIcon: Images.icon_tabbar_home_cur
        }),
    },
    Mine: {screen: Mine,navigationOptions: tabOptions({
            title: '我的',
            normalIcon: Images.icon_tabbar_mine,
            selectedIcon: Images.icon_tabbar_mine_cur
        }),
    },
};

const TabNavigatorConfig = {
    initialRouteName: 'Home',
    tabBarOptions: {
        showIcon: true,
        indicatorStyle: {
            height: 0
        },
        inactiveTintColor: '#999',
        activeTintColor: Predefine.colorC,
        style: {
            backgroundColor: '#fff',
        },
        tabStyle: {
            margin: 2,
        },
        keyboardHidesTabBar: false,
    },
    lazy: true, //懒加载
    tabBarComponent: TabBottomBar,
};

const TabNavigator = createBottomTabNavigator(
    TabNavigatorRouter,
    TabNavigatorConfig,
);

const StackNavigatorRouter = {
    // Demo
    DemoBaiduFace: {screen: DemoBaiduFace},
    DemoAlert: {screen: DemoAlert},
    DemoButton: {screen: DemoButton},
    DemoContainer: {screen: DemoContainer},
    DemoImageView: {screen: DemoImageView},
    DemoRow: {screen: DemoRow},
    DemoList: {screen: DemoList},
    DemoOverlay: {screen: DemoOverlay},
    DemoPicker: {screen: DemoPicker},
    DemoToast: {screen: DemoToast},
    DemoTheme: {screen: DemoTheme},
    Example: {screen: Example},
    DemoSegmented: {screen: DemoSegmented},
    DemoCard: {screen: DemoCard},
    DemoWebBrowser: {screen: DemoWebBrowser},
    DemoPopover: {screen: DemoPopover},
    DemoPermissions: {screen: DemoPermissions},
    DemoForm: {screen: DemoForm},
    DemoUpload: {screen: DemoUpload},
    DemoCityPicker: {screen: DemoCityPicker},
    DemoCityPicker2: {screen: DemoCityPicker2},
    DemoTimePicker: {screen: DemoTimePicker},


    // 公共
    Tab: {screen: TabNavigator},
    WebPage: {screen: WebPage},
    PickerCity: {screen: PickerCity},

    Login: {screen: Login},
    Register: {screen: Register},
    Forget: {screen: Forget},
    
    // Home
    Home: {screen: Home},

    // GameDetail
    GameDetail: {screen: GameDetail},

    // Mine
    Mine: {screen: Mine},

    // 检查更新
    CheckUpdates: {screen: CheckUpdates},
};

const StackNavigatorConfig = {
    initialRouteName: 'Tab',
    defaultNavigationOptions: ({navigation}) => {
        return {
            cardStyle: {},
            cardShadowEnabled: true,
            cardOverlayEnabled: true,
            headerShown: false,
            animationEnabled: true,
            gestureEnabled: true,
            gestureResponseDistance: {
                horizontal: 25,
                vertical: 135,
            },
            ...transitionConfig(navigation),
        };
    },
};

const StackNavigator = createStackNavigator(
    StackNavigatorRouter,
    StackNavigatorConfig,
);

export {StackNavigator};
