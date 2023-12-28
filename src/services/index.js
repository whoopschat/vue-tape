import './style'
import "./_polyfill";
import { initApp, getEventBus } from "./_app";
import { setVue, getVue } from "./__vue";
import { genUrl, getQueryString, parseQueryParams, appendQueryParams } from "./utils/_query";
import { onLoad, onShow, onHide, onResize, offShow, offHide, offResize } from "./_cycle";
import { setLocalStorage, getLocalStorage, removeLocalStorage } from "./utils/_storage";
import { offWindowMessage, onWindowMessage, postMessageToParent } from './utils/_msg';
import { getElementPosition } from "./utils/_position";
import { encodeBase64, decodeBase64 } from "./utils/_base64";
import { setClipboard } from './utils/_clipboard';
import { getVersion } from "./utils/_version";
import { formatDate } from "./utils/_date";
import { Timer } from "./timer/Timer";
import { toAny } from "./utils/_toany";
import { get } from "./utils/_get";
import { Data } from "./manager/_data";
import state from "./manager/_state";

const timer = new Timer;

const tape = {
  timer,
  state,
  install,
  initApp,
  getEventBus,
  getVersion,
  createData,
  setClipboard,
  getQueryString,
  // url query
  genUrl,
  parseQueryParams,
  appendQueryParams,
  getElementPosition,
  // local storage
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  // window message
  onWindowMessage,
  offWindowMessage,
  postMessageToParent,
  // base 64
  encodeBase64,
  decodeBase64,
  // life cycle
  onLoad,
  onShow,
  offShow,
  onHide,
  offHide,
  onResize,
  offResize,
  // data
  formatDate,
  toAny,
  get,
}

function createData(dataOptions) {
  return new Data(dataOptions, (state) => {
    let _vue = getVue();
    if (_vue && typeof _vue.observable === 'function') {
      _vue.observable(state);
    }
  })
}

let _installed = false;

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
  vue.prototype.$getEventBus = getEventBus;
  _installed = true;
}

export default tape;