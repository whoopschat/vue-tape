import lazyload from 'vue-lazyload';
import { getVue } from './__vue';
import { reportEvent } from './handlers/_report';
import { _initVisibility } from './handlers/_visibility';
import { _pixelToRem } from './utils/_rempixel';
import { _initConfig } from './utils/_config';
import { createErrorComponent } from './comps/_page';
import { checkOnload } from "./utils/_onload";
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

export function initApp({ name, app, loadjs, config, width, unit, lazy, el }) {
    let _init = () => {
        _app_ = app;
        _app_name_ = name || 'default';
        _pixelToRem(width, unit);
        _initConfig(config);
        _initVisibility();
        checkOnload(() => {
            try {
                let time = Date.now() - window.performance.timing.navigationStart;
                reportEvent('onload', { time });
            } catch (error) {
            }
        });
        let _errHandler = (e, print = true) => {
            _err_cbs_.forEach(error => {
                error && error(e);
            });
            print && console.error(e);
            isDebug() && showToast(e);
        }
        let _vue = getVue();
        _vue.use(lazyload, lazy || {});
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