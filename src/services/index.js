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

let _installed = false;
const tape = {
  data,
  timer,
  install,
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
}

function install(vue) {
  if (_installed || !vue) {
    return;
  }
  setVue(vue);
  if (vue.version) {
    console.log("VUE: version " + vue.version)
  }
  console.log("VUE-TAPE: version " + getVersion())
  console.log("VUE-TAPE: github https://github.com/whoopschat/vue-tape")
  vue.prototype.$tape = tape;
  _installed = true;
}

export default tape;