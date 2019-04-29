import { getVue } from './__vue';
import { _initVisibility } from './handlers/_visibility';
import { _pixelToRem } from './utils/_rempixel';
import { _initConfig } from './utils/_config';
import { createErrorComponent } from './comps/_page';
import { showToast } from './comps/_toast';
import { isDebug } from './utils/_debug';

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

export function initApp({ name, app, config, width, el }) {
    __app_name__ = name || 'default';
    __app__ = app;
    let _vue = getVue();
    _pixelToRem(width);
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