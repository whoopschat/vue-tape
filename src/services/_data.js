import { toAny } from './utils/_toany';
import { setLocalStorage, getLocalStorage } from "./utils/_storage";
import { get as getSalf } from "./utils/_get";

let __options__ = null;
let __callback__ = function () {
}

let _localDataKeys = [];
let _dataState = { ready: false, values: {} }

export function _initData(options, updateCallback) {
  __options__ = options;
  __callback__ = updateCallback;
  _refresh();
}

function _genKey(key) {
  return `${__options__ && __options__.keyPrefix || ''}${key || ''}`
}

function _refresh() {
  __callback__ && __callback__(_dataState);
}

function _saveData(key, value) {
  return Promise.resolve().then(() => {
    if (__options__ && !__options__.local && typeof __options__.saveData === 'function') {
      return __options__.saveData(key, value);
    }
    setLocalStorage(`data_value_${key}`, value);
    if (_localDataKeys.indexOf(key) < 0) {
      _localDataKeys.push(key)
    }
    setLocalStorage('data_keys', _localDataKeys);
  })
}

function _removeData(keys) {
  return Promise.resolve().then(() => {
    if (__options__ && !__options__.local && typeof __options__.removeData === 'function') {
      return __options__.removeData(keys);
    }
    keys.forEach(key => {
      let index = _localDataKeys.indexOf(key);
      if (index > 0) {
        _localDataKeys.splice(index, 0);
      }
      setLocalStorage(`data_value_${key}`)
    });
    setLocalStorage(`data_keys`, _localDataKeys);
  })
}

function _loadData() {
  return Promise.resolve().then(() => {
    if (__options__ && !__options__.local && typeof __options__.loadData === 'function') {
      return __options__.loadData();
    }
    let data = [];
    _localDataKeys = getLocalStorage(`data_keys`, []);
    _localDataKeys.forEach(key => {
      let value = getLocalStorage(`data_value_${key}`);
      if (value) {
        data.push({ key, value })
      }
    });
    return data;
  });
}

function load() {
  _dataState.ready = false;
  _dataState.values = {};
  _refresh();
  return _loadData().then(kvs => {
    let obj = {};
    if (kvs instanceof Array && kvs.length > 0) {
      kvs.forEach(data => {
        if (data.key) {
          obj[data.key] = data.value;
        }
      });
    }
    return obj;
  }).then(res => {
    _dataState.ready = true;
    _dataState.values = Object.assign({}, getSalf(__options__, "defaultValues"), res || {});
    Object.keys(_dataState.values).forEach(key => {
      if (_dataState.values[key] != res[key]) {
        _saveData(key, _dataState.values[key]);
      }
    })
    _refresh();
  });
}

function isReady() {
  return _dataState && _dataState.ready;
}

/**
 * 设置数据
 * @param {string} key KEY
 * @param {any} value 数据
 * @param {boolean} onlyNotExists 只在不存在数据时有效
 * @returns {void}
 */
const set = (key, value, onlyNotExists = false) => {
  if (!isReady()) {
    return;
  }
  key = _genKey(key);
  let save = () => {
    let strValue = toAny(value, '');
    if (_dataState.values[key] !== strValue) {
      _dataState.values[key] = strValue;
      _refresh();
      return _saveData(key, strValue);
    }
    return true;
  }
  if (onlyNotExists) {
    !has(key) && save();
  } else {
    save();
  }
}

/**
 * 获取数据
 * @param {string} key KEY
 * @param {any} def 默认值
 * @returns {any}
 */
const get = (key, def) => {
  if (!isReady()) {
    return def;
  }
  key = _genKey(key);
  return getSalf(_dataState.values, key, def);
}

/**
 * 移除数据
 * @param {string} key KEY
 * @returns {void}
 */
const remove = (key) => {
  if (!isReady()) {
    return;
  }
  key = _genKey(key);
  if (_dataState.values[key]) {
    delete _dataState.values[key];
    _removeData([key]);
  }
  _refresh();
}

/**
 * 检查是否存在数据
 * @param {string} key KEY
 * @returns {boolean}
 */
const has = (key) => {
  if (!isReady()) {
    return false;
  }
  key = _genKey(key);
  return keys().indexOf(key) >= 0;
}

/**
 * 获取KEY列表
 * @group data
 * @returns {string[]}
 */
const keys = () => {
  if (!isReady()) {
    return [];
  }
  return Object.keys(_dataState.values);
}

/**
 * 清空数据
 * @returns {void}
 */
const clear = () => {
  if (!isReady()) {
    return;
  }
  _dataState.values = {};
  _removeData(keys());
  _refresh();
}

export default {
  load,
  isReady,
  get,
  set,
  remove,
  keys,
  has,
  clear
}