import _vuex from "./_vuex";
import { encodeBase64 } from "./_base64";

let _vue = null;
let _key = '';

export function setVue(vue) {
    _vue = vue;
    vue.directive('cache', {
        bind: function (...params) {
            if (params.length > 2) {
                let node = params[2];
                if (node && node.componentInstance) {
                    let key = encodeBase64(node.componentOptions.Ctor.extendOptions.__file);
                    let data = node.componentInstance._data;
                    Object.assign(data, _vuex.state[`cache-${key}`] || {});
                    _vuex.state[`cache-${key}`] = data;
                }
            }
        }
    });
}

export function getVue() {
    return _vue;
}

export function setKey(key) {
    _key = key;
}

export function getKey() {
    return _key;
}