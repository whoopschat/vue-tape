import { getVue, setKey } from './__vue';
import { _initState } from './_vuex';
import { _pixelToRem } from './_rempixel';
import { _initConfig } from './_config';
import { createErrorComponent } from './_page';
import { showToast } from './_toast';
import { isDebug } from './_debug';
import { _initVisibility } from './_visibility';

let __errors__ = [];
let __app__ = null;
let __app_name__ = '';

export function onError(error) {
    if (error && typeof error == 'function' && __shows__.indexOf(error) < 0) {
        __errors__.push(error);
    }
}

export function getApp() {
    return __app__;
}

export function getAppName() {
    return __app_name__;
}

export function initApp({ name, app, state, config, width, stateKey, el }) {
    __app_name__ = name || 'default';
    __app__ = app;
    let _vue = getVue();
    setKey(stateKey || 'default');
    _pixelToRem(width);
    _initState(state);
    _initConfig(config);
    _initVisibility();
    let _errHandler = (e, printLog = true) => {
        printLog && console.error(e);
        __errors__.forEach(error => {
            error && error(e);
        });
        isDebug() && showToast(e);
    }
    _vue.config.productionTip = false;
    _vue.config.errorHandler = _errHandler;
    window.onerror = (e) => {
        _errHandler(e, false)
    }
    new _vue({
        el: el || '#app',
        render: h => h(app || createErrorComponent('Invalid parameters [app] -> Tape.initApp({ ... })'))
    })
}