import "./_polyfill";
import vuex from "./_vuex";
import { setVue } from "./_vue";
import { init } from "./_app";
import { query } from "./_query";
import { config } from "./_config";
import { setStorage, getStorage } from "./_storage";
import { encodeBase64, decodeBase64 } from "./_base64";
import { initVisibility, onShow, onHide, offShow, offHide } from "./_visibility";
import { initBack, back, backListener } from "./_back";
import { setTitle, getTitle } from "./_title";
import { exposure, initExposure } from "./_exposure";
import { request } from "./_request";
import { toast, initToast } from "./_toast";

export function create(vue) {
    setVue(vue);
    initBack();
    initToast();
    initExposure();
    initVisibility();
    return Object.assign(vuex, {
        init,
        query,
        config,
        setStorage,
        getStorage,
        encodeBase64,
        decodeBase64,
        onShow,
        onHide,
        offShow,
        offHide,
        back,
        backListener,
        setTitle,
        getTitle,
        exposure,
        request,
        toast,
    })
}