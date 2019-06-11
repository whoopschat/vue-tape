import "./_polyfill";
import { setVue, getVue } from "./__vue";
import { initApp, getApp } from "./_app";
import { setDebug } from "./utils/_debug";
import { getQuery } from "./utils/_query";
import { getConfig } from "./utils/_config";
import { getVersion } from "./utils/_version";
import { setStorage, getStorage } from "./utils/_storage";
import { encodeBase64, decodeBase64 } from "./utils/_base64";
import { formatDate } from "./utils/_date";
import { onError } from "./_app";
import { onShow, onHide, offShow, offHide } from "./handlers/_visibility";
import { _initLoading, showLoading, hideLoading } from "./comps/_loading";
import { _initToast, showToast } from "./comps/_toast";
import { _initBack, back, backListener } from "./handlers/_back";
import { _initReport, setReportHandler, reportEvent } from "./handlers/_report";

export function create(vue) {
    setVue(vue);
    _initLoading();
    _initToast();
    _initBack();
    _initReport();
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
        setStorage,
        getStorage,
        encodeBase64,
        decodeBase64,
        formatDate,
        onError,
        onShow,
        onHide,
        offShow,
        offHide,
        showLoading,
        hideLoading,
        showToast,
        back,
        backListener,
        reportEvent,
        setReportHandler,
    }
}