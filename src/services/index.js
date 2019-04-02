import "./_polyfill";
import vuex from "./_vuex";
import { setVue } from "./_vue";
import { initPage, onError } from "./_app";
import { getQueryString } from "./_query";
import { getConfig } from "./_config";
import { setStorage, getStorage } from "./_storage";
import { encodeBase64, decodeBase64 } from "./_base64";
import { _initVisibility, onShow, onHide, offShow, offHide } from "./_visibility";
import { _initDialog, showToast, showLoading, hideLoading } from "./_dialog";
import { _initExposure, exposureListener } from "./_exposure";
import { _initBack, back, backListener } from "./_back";
import { setTitle, getTitle } from "./_title";
import { request } from "./_request";
import { createHtmlComponent } from "./_page";
import { setDebug, isDebug } from "./_debug";
import { getVersion } from "./_version";

export function create(vue) {
    setVue(vue);
    console.log("VUE-TAPE: version " + getVersion())
    console.log("VUE-TAPE: github https://github.com/whoopschat/vue-tape")
    _initBack();
    _initDialog();
    _initExposure();
    _initVisibility();
    return Object.assign(vuex, {
        initPage,
        getQueryString,
        getConfig,
        setStorage,
        getStorage,
        encodeBase64,
        decodeBase64,
        isDebug,
        setDebug,
        onError,
        onShow,
        onHide,
        offShow,
        offHide,
        showLoading,
        hideLoading,
        showToast,
        setTitle,
        getTitle,
        request,
        back,
        backListener,
        exposureListener,
        createHtmlComponent,
        getVersion,
    })
}