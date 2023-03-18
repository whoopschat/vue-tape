import "./_polyfill";
import { setVue } from "./__vue";
import { initApp } from "./_app";
import { getQueryString, parseQueryParams, appendQueryParams } from "./utils/_query";
import { onLoad, onShow, onHide, onResize, offShow, offHide, offResize } from "./_cycle";
import { getElementPosition } from "./utils/_position";
import { setLocalStorage, getLocalStorage } from "./utils/_storage";
import { encodeBase64, decodeBase64 } from "./utils/_base64";
import { getVersion } from "./utils/_version";
import { formatDate } from "./utils/_date";
import { Timer } from "./timer/Timer";
import { toAny } from "./utils/_toany";
import { get } from "./utils/_get";
import data from "./_data";

const timer = new Timer;

export function create(vue) {
  setVue(vue);
  console.log("VUE: version " + get(vue, 'version'))
  console.log("VUE-TAPE: version " + getVersion())
  console.log("VUE-TAPE: github https://github.com/whoopschat/vue-tape")
  return {
    data,
    timer,
    initApp,
    getVersion,
    getQueryString,
    parseQueryParams,
    appendQueryParams,
    getElementPosition,
    setLocalStorage,
    getLocalStorage,
    encodeBase64,
    decodeBase64,
    get,
    toAny,
    formatDate,
    onLoad,
    onShow,
    offShow,
    onHide,
    offHide,
    onResize,
    offResize
  };
}