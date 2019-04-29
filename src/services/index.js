import "./_polyfill";
import { setVue, getVue } from "./__vue";
import { onError, initApp, getApp, getAppName } from "./_app";
import { getVersion } from "./utils/_version";
import { setDebug, isDebug } from "./utils/_debug";
import { getQueryString } from "./utils/_query";
import { getConfig } from "./utils/_config";
import { setStorage, getStorage } from "./utils/_storage";
import { encodeBase64, decodeBase64 } from "./utils/_base64";
import { onShow, onHide, offShow, offHide } from "./handlers/_visibility";
import { _initBack, back, backListener } from "./handlers/_back";
import { _initReport, setReportHandler, reportEvent } from "./handlers/_report";
import { _initSkeleton, showSkeleton, hideSkeleton } from "./comps/_skeleton";
import { _initLoading, showLoading, hideLoading } from "./comps/_loading";
import { _initToast, showToast } from "./comps/_toast";

export function create(vue) {
    setVue(vue);
    _initBack();
    _initReport();
    _initSkeleton();
    _initLoading();
    _initToast();
    console.log("VUE-TAPE: version " + getVersion())
    console.log("VUE-TAPE: github https://github.com/whoopschat/vue-tape")
    return {
        initApp,
        isDebug,
        setDebug,
        getVersion,
        getVue,
        getApp,
        getAppName,
        getQueryString,
        getConfig,
        setStorage,
        getStorage,
        encodeBase64,
        decodeBase64,
        onError,
        onShow,
        onHide,
        offShow,
        offHide,
        showSkeleton,
        hideSkeleton,
        showLoading,
        hideLoading,
        showToast,
        back,
        backListener,
        reportEvent,
        setReportHandler,
    }
}