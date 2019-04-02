import { getVue, setKey } from './_vue';
import { _initState } from './_vuex';
import { _pixelToRem } from './_rempixel';
import { _initConfig } from './_config';
import { createErrorComponent } from './_page';
import { showToast } from './_dialog';
import { setDebug, isDebug } from './_debug';

let __errors__ = [];

export function onError(error) {
    if (error && typeof error == 'function' && __shows__.indexOf(error) < 0) {
        __errors__.push(error);
    }
}

export function initPage({ el, page, state, config, width, stateKey, debug }) {
    let _vue = getVue();
    setKey(stateKey || 'default');
    _initConfig(config);
    _pixelToRem(width);
    _initState(state);
    setDebug(debug);
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
        render: h => h(page || createErrorComponent(' Invalid parameters [page] -> Tape.initPage({ ... })'))
    })
}