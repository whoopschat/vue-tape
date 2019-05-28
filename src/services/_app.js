import { getVue } from './__vue';
import { _initVisibility } from './handlers/_visibility';
import { _pixelToRem } from './utils/_rempixel';
import { _initConfig } from './utils/_config';
import { createErrorComponent } from './comps/_page';
import { showToast } from './comps/_toast';
import { isDebug } from './utils/_debug';
import { load } from './_load';

let _app_ = null;
let _app_name_ = '';
let _err_cbs_ = [];

export function onError(error) {
    if (error && typeof error == 'function' && _err_cbs_.indexOf(error) < 0) {
        _err_cbs_.push(error);
    }
}

export function getApp() {
    return _app_;
}

export function getAppName() {
    return _app_name_;
}

export function initApp({ name, app, loadjs, config, width, unit, el }) {
    let _init = () => {
        _app_ = app;
        _app_name_ = name || 'default';
        _pixelToRem(width, unit);
        _initConfig(config);
        _initVisibility();
        let _errHandler = (e, printLog = true) => {
            printLog && console.error(e);
            _err_cbs_.forEach(error => {
                error && error(e);
            });
            isDebug() && showToast(e);
        }
        let _vue = getVue();
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
    load(loadjs, _init)
}