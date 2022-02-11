import "./_polyfill";
import { setVue, getVue } from "./__vue";
import { initApp, getApp, getAppName } from "./_app";
import { setDebug, isDebug } from "./utils/_debug";
import { getQuery, parseQueryParams, appendQueryParams } from "./utils/_query";
import { getConfig } from "./utils/_config";
import { getVersion } from "./utils/_version";
import { getPosition } from "./utils/_position";
import { setStorage, getStorage } from "./utils/_storage";
import { encodeBase64, decodeBase64 } from "./utils/_base64";
import { backListener } from "./utils/_back";
import { formatDate } from "./utils/_date";
import { frameLoop } from "./utils/_loop";
import { onLoad, onShow, onHide, onResize, offShow, offHide, offResize } from "./_cycle";
import { showModal } from "./comps/_modal";
import { showLoading, hideLoading } from "./comps/_loading";
import { showToast } from "./comps/_toast";
import { remToPixel } from "./utils/_rempixel";

export function create(vue) {
    setVue(vue);
    console.log("VUE-TAPE: version " + getVersion())
    console.log("VUE-TAPE: github https://github.com/whoopschat/vue-tape")
    return {
        initApp,
        getVue,
        getApp,
        getAppName,
        setDebug,
        isDebug,
        getQuery,
        parseQueryParams,
        appendQueryParams,
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
        onResize,
        offShow,
        offHide,
        offResize,
        showModal,
        showLoading,
        hideLoading,
        showToast,
        remToPixel,
    };
}