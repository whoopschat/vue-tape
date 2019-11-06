import "./_polyfill";
import { setVue, getVue } from "./__vue";
import { initApp, getApp } from "./_app";
import { setDebug } from "./utils/_debug";
import { getQuery } from "./utils/_query";
import { getConfig } from "./utils/_config";
import { getVersion } from "./utils/_version";
import { getPosition } from "./utils/_position";
import { setStorage, getStorage, removeStorage } from "./utils/_storage";
import { encodeBase64, decodeBase64 } from "./utils/_base64";
import { backListener } from "./utils/_back";
import { formatDate } from "./utils/_date";
import { frameLoop } from "./utils/_loop";
import { onLoad, onShow, onHide, offShow, offHide } from "./_cycle";
import { showIframe, hideIframe } from "./comps/_iframe";
import { showLoading, hideLoading } from "./comps/_loading";
import { showToast } from "./comps/_toast";

export function create(vue) {
    setVue(vue);
    console.log("VUE-TAPE: version " + getVersion())
    console.log("VUE-TAPE: github https://github.com/whoopschat/vue-tape")
    return {
        initApp,
        getVue,
        getApp,
        setDebug,
        getQuery,
        getConfig,
        getVersion,
        getPosition,
        setStorage,
        getStorage,
        removeStorage,
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
        showIframe,
        hideIframe,
        showLoading,
        hideLoading,
        showToast
    }
}