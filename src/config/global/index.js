'use strict';
import {
    Text,
    LogBox,
    Platform,
    TextInput,
    UIManager,
    YellowBox,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment'
import {Images} from '../../assets';
import {Predefine} from '../predefine';
import Constants from '../constant';
import {ServerApi, ServerClient, ServerCode} from '../../services'
import {
    Button,
    ListRow,
    Checkbox,
    ListView,
    ToastView,
    ImageView,
    LoadingHint,
    AlertManager,
    ToastManager,
    NetworkError,
    NavigationBar,
    ActionManager,
    PageContainer,
    ListHeaderLoading,
} from '../../components';

import {
    PayManager,
    MediaManager,
    ExitAppManager,
    StorageManager,
} from '../../common/manager'

import RouterHelper from '../../routers/RouterHelper';

import {clearTimer} from '../../utils/Tool'

/**
 * @开启安卓的布局动画
 */
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);
/**
 * @时间管理本地化
 */
moment.locale('zh-cn');
/**
 * @屏蔽调试警告
 */
LogBox.ignoreLogs([
    'Warning: Can',
    'Require cycle',
    'Warning: component',
    'Setting a timer for a long',
    '-[RCTRootView cancelTouches]',
    'Remote debugger is in a background',
    'Module RNPutiPay requires main queue setup since it overrides',
]);
/**
 * @屏蔽输出
 */
if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        assert: () => {
        },
        warn: () => {
        },
        debug: () => {
        },
        error: () => {
        },
        time: () => {
        },
        timeEnd: () => {
        },
    };
}
/**
 * @默认UI设置
 */
Predefine.addDefaultProps(Text, {allowFontScaling: false});
Predefine.addDefaultProps(TextInput, {
    allowFontScaling: false,
    selectionColor: Predefine.overallColor,
});
Predefine.addDefaultProps(TouchableOpacity, {activeOpacity: 1});
Predefine.addDefaultProps(Button, {activeOpacity: 1});
Predefine.addDefaultProps(LoadingHint, {source: Images.json_loading});
Predefine.addDefaultProps(NavigationBar, {
    backIcon: Images.icon_nav_left,
    backIconStyle: {width: 20, height: 20},
    onPressBack: () => RouterHelper.goBack(),
});
Predefine.addDefaultProps(ListRow, {
    accessorySource: Images.icon_arrow_right,
});
Predefine.addDefaultProps(ListView, {emptySource: Images.img_no_record});
Predefine.addDefaultProps(NetworkError, {source: Images.img_no_nerwork});
Predefine.addDefaultProps(ToastView, {
    successIcon: Images.icon_toast_success,
    failIcon: Images.icon_toast_fail,
    warnIcon: Images.icon_toast_warn,
    loadingIcon: Images.icon_toast_loading,
});
Predefine.addDefaultProps(Checkbox, {
    narmalIcon: Images.icon_nav_left,
    selectIcon: Images.icon_center_play,
});
Predefine.addDefaultProps(ListHeaderLoading, {
    source:
        Platform.OS === 'android'
            ? Images.json_list_header_loading
            : Images.json_list_header_loading,
});

/**
 * @常量
 */
global.Constants = Constants;
/**
 * @系统是iOS
 */
global.__IOS__ = Platform.OS === 'ios';
/**
 * @系统是安卓
 */
global.__ANDROID__ = Platform.OS === 'android';
/**
 * @默认样式
 */
global.Predefine = Predefine;
/**
 * @路由类
 */
global.RouterHelper = RouterHelper;
/**
 * @获取屏幕宽度
 */
global.SCREEN_WIDTH = Predefine.screenWidth;
/**
 * @获取屏幕高度
 */
global.SCREEN_HEIGHT = Predefine.screenHeight;
/**
 * @顶部导航高度
 */
global.NAV_BAR_HEIGHT = Predefine.contentTop;
/**
 * @NavigationBar
 */
global.NavigationBar = NavigationBar;
/**
 * @PageContainer
 */
global.PageContainer = PageContainer;
/**
 * @时间处理
 */
global.Moment = moment;
/**
 * @图标资源
 */
global.Images = Images;
/**
 * @Button
 */
global.Button = Button;
/**
 * @ImageView
 */
global.ImageView = ImageView;
/**
 * @ListRow
 */
global.ListRow = ListRow;
/**
 * @ListView
 */
global.ListView = ListView;
/**
 * @ToastManager
 */
global.ToastManager = ToastManager;
/**
 * @AlertManager
 */
global.AlertManager = AlertManager;
/**
 * @ActionManager
 */
global.ActionManager = ActionManager;
/**
 * @Services
 */
global.Services = ServerClient;
/**
 * @GET
 */
global.GET = ServerClient.get;
/**
 * @POST
 */
global.POST = ServerClient.post;
/**
 * @ServicesApi
 */
global.ServicesApi = ServerApi;
/**
 * @StatusCode
 */
global.StatusCode = ServerCode;
/**
 * @StorageManager
 */
global.StorageManager = StorageManager;
/**
 * @ExitAppManager
 */
global.ExitAppManager = ExitAppManager;
/**
 * @MediaManager
 */
global.MediaManager = MediaManager;
/**
 * @PayManager
 */
global.PayManager = PayManager;
/**
 * @ClearTimeOut
 */
global.ClearTimeOut = clearTimer;