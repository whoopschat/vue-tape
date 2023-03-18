import "./_polyfill";
import { initApp } from "./_app";
import { setVue, getVue } from "./__vue";
import { getQueryString, parseQueryParams, appendQueryParams } from "./utils/_query";
import { onLoad, onShow, onHide, onResize, offShow, offHide, offResize } from "./_cycle";
import { setLocalStorage, getLocalStorage, removeLocalStorage } from "./utils/_storage";
import { getElementPosition } from "./utils/_position";
import { encodeBase64, decodeBase64 } from "./utils/_base64";
import { getVersion } from "./utils/_version";
import { formatDate } from "./utils/_date";
import { Timer } from "./timer/Timer";
import { toAny } from "./utils/_toany";
import { get } from "./utils/_get";
import state from "./manager/_state";
import { Data } from "./manager/_data";

const timer = new Timer;

let _installed = false;
const tape = {
  timer,
  state,
  install,
  initApp,
  getVersion,
  createData,
  getQueryString,
  parseQueryParams,
  appendQueryParams,
  getElementPosition,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
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

function createData(dataOptions) {
  let data = new Data(dataOptions, (state) => {
    let _vue = getVue();
    if (_vue && typeof _vue.observable === 'function') {
      _vue.observable(state);
    }
  })
  console.log(data)
  return data;
}

function install(vue, options = {}) {
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