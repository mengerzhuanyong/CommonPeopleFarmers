/**
 * RNTemplate - ExportStore
 * http://menger.me
 * @大梦
 */

'use strict';

import HomeStore from "./HomeStore";
import LoginStore from "./LoginStore";
import SystemStore from "./SystemStore";

export default {
    homeStore: new HomeStore(),
    loginStore: new LoginStore(),
    systemStore: new SystemStore(),
};