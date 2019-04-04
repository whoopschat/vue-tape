import "./_polyfill";
import vuex from "./_vuex";
import { setVue, getVue } from "./__vue";
import { onError, initApp, getApp, getAppName } from "./_app";
import { getQueryString } from "./_query";
import { getConfig } from "./_config";
import { setStorage, getStorage } from "./_storage";
import { encodeBase64, decodeBase64 } from "./_base64";
import { onShow, onHide, offShow, offHide } from "./_visibility";
import { _initDialog, showToast, showLoading, hideLoading } from "./_dialog";
import { _initSkeleton, showSkeleton, hideSkeleton } from "./_skeleton";
import { _initReport, setReportHandler } from "./_report";
import { _initBack, back, backListener } from "./_back";
import { setTitle, getTitle } from "./_title";
import { request } from "./_request";
import { setDebug, isDebug } from "./_debug";
import { getVersion } from "./_version";
import { setCache, getCache } from "./_cache";
import { addHook } from "./_hook";

export function create(vue) {
    setVue(vue);
    _initReport();
    _initBack();
    _initDialog();
    _initSkeleton();
    console.log("VUE-TAPE: version " + getVersion())
    console.log("VUE-TAPE: github https://github.com/whoopschat/vue-tape")
    return Object.assign(vuex, {
        initApp,
        getApp,
        getAppName,
        getQueryString,
        getConfig,
        setStorage,
        getStorage,
        setCache,
        getCache,
        encodeBase64,
        decodeBase64,
        isDebug,
        setDebug,
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
        setTitle,
        getTitle,
        addHook,
        request,
        back,
        backListener,
        setReportHandler,
        getVersion,
        getVue,
    })
}