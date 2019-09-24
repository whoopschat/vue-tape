import "./_polyfill";
import { setVue, getVue } from "./__vue";
import { initApp, getApp } from "./_app";
import { setUserId, getUserId } from "./_user";
import { setDebug } from "./utils/_debug";
import { getQuery } from "./utils/_query";
import { getConfig } from "./utils/_config";
import { getVersion } from "./utils/_version";
import { getPosition } from "./utils/_position";
import { setStorage, getStorage } from "./utils/_storage";
import { encodeBase64, decodeBase64 } from "./utils/_base64";
import { backListener } from "./utils/_back";
import { formatDate } from "./utils/_date";
import { frameLoop } from "./utils/_loop";
import { onLoad, onShow, onHide, offShow, offHide } from "./_cycle";
import { _initLoading, showLoading, hideLoading } from "./comps/_loading";
import { _initToast, showToast } from "./comps/_toast";

export function create(vue) {
    setVue(vue);
    _initToast();
    _initLoading();
    console.log("VUE-TAPE: version " + getVersion())
    console.log("VUE-TAPE: github https://github.com/whoopschat/vue-tape")
    return {
        initApp,
        getVue,
        getApp,
        setDebug,
        setUserId,
        getUserId,
        getQuery,
        getConfig,
        getVersion,
        getPosition,
        setStorage,
        getStorage,
        encodeBase64,
        decodeBase64,
        backListener,
        formatDate,
        frameLoop,
        onLoad,
        onShow,
        onHide,
        offShow,
        offHide,
        showLoading,
        hideLoading,
        showToast
    }
}