import lazyload from 'vue-lazyload';
import { getVue } from './__vue';
import { createErrorComponent } from './comps/_component';
import { _initLifeCycle } from './_cycle';
import { _pixelToRem } from './utils/_rempixel';
import { _initConfig } from './utils/_config';

let _app_ = null;
let _app_name_ = '';

export function getApp() {
    return _app_;
}

export function getAppName() {
    return _app_name_;
}

export function initApp({ name, app, config, width, maxWidth, minWidth, remUnit, lazy, el, options }, handler) {
    _app_ = app;
    _app_name_ = name || 'default';
    _pixelToRem(width, maxWidth || width, minWidth || width, remUnit);
    _initConfig(config);
    _initLifeCycle();
    let _vue = getVue();
    _vue.use(lazyload, lazy || {});
    _vue.config.productionTip = false;
    handler && handler(_vue);
    new _vue(Object.assign(options || {}, {
        el: el || '#app',
        render: h => h(app || createErrorComponent('Invalid parameters [app] -> Tape.initApp({ ... })'))
    }))
}