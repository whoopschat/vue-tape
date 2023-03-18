import { toAny } from '../utils/_toany';
import { setLocalStorage, getLocalStorage } from "../utils/_storage";
import { get as getSalf } from "../utils/_get";

let __state_options__ = null;
let __obser_callback__ = function () { }

let _dataState = { ready: false, values: {} }

function __keyPrefix() {
  return __state_options__ && __state_options__.keyPrefix || '';
}

function __saveState(values) {
  return Promise.resolve().then(() => {
    setLocalStorage(`${__keyPrefix()}tape-state-values`, values);
  })
}

function __loadState() {
  return Promise.resolve().then(() => {
    return getLocalStorage(`${__keyPrefix()}tape-state-values`, {});
  });
}

function __refreshObser() {
  __obser_callback__ && __obser_callback__(_dataState);
}

export function ready(options, observableCallback) {
  __state_options__ = options;
  __obser_callback__ = observableCallback;
  _dataState.ready = false;
  _dataState.values = {};
  return __loadState().then(stateValues => {
    _dataState.ready = true;
    _dataState.values = Object.assign({}, getSalf(__state_options__, "defaultValues", {}), stateValues || {});
    __refreshObser();
  });
}

/**
 * 设置数据
 * @param {string} key KEY
 * @param {any} value 数据
 * @returns {void}
 */
function set(key, value) {
  if (!_dataState.ready) {
    return;
  }
  if (_dataState.values[key] !== value) {
    _dataState.values[key] = value;
    __saveState(_dataState.values);
    __refreshObser();
  }
}

/**
 * 获取数据
 * @param {string} key KEY
 * @param {any} def 默认值
 * @returns {any}
 */
function get(key, def) {
  if (!_dataState.ready) {
    return def;
  }
  return getSalf(_dataState.values, key, def);
}

/**
 * 重置数据
 * @returns {void}
 */
function reset() {
  if (!_dataState.ready) {
    return;
  }
  _dataState.values = Object.assign({}, getSalf(__state_options__, "defaultValues", {}));
  __saveState(_dataState.values);
  __refreshObser();
}

export default { set, get, reset }