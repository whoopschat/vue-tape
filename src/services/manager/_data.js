import { toAny } from '../utils/_toany';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from "../utils/_storage";
import { get as getSalf } from "../utils/_get";

export class Data {

  __data_options__ = null;
  __obser_callback__ = function () { }
  __dataState = { ready: false, values: {} }

  constructor(options, observableCallback) {
    this.__data_options__ = options;
    this.__obser_callback__ = observableCallback;
    this.__refreshObser();
    this.checkReady();
  }

  /**
   * 获取数据前缀
   */
  __keyPrefix() {
    return this.__data_options__ && this.__data_options__.keyPrefix || '';
  }

  /**
   * 刷新数据
   */
  __refreshObser() {
    this.__obser_callback__ && this.__obser_callback__(this.__dataState);
  }

  /**
   * 保存数据
   * @param {*} key 数据键
   * @param {*} value 数据值
   * @returns {Promise<void>}
   */
  __saveData(key, value) {
    this.__refreshObser();
    return Promise.resolve().then(() => {
      if (this.__data_options__
        && !this.__data_options__.local
        && typeof this.__data_options__.saveData === 'function') {
        return this.__data_options__.saveData(key, value);
      }
      // local data
      setLocalStorage(`${this.__keyPrefix()}tape-data-value-${key}`, value);
      let _localDataKeys = getLocalStorage(`${this.__keyPrefix()}tape-data-key-list`, []);
      if (_localDataKeys.indexOf(key) < 0) {
        _localDataKeys.push(key)
      }
      setLocalStorage(`${this.__keyPrefix()}tape-data-key-list`, _localDataKeys);
    })
  }

  /**
   * 根据KEYS移除数据
   * @param {*} keys 数据KEYS
   * @returns {Promise<void>}
   */
  __removeData(keys) {
    this.__refreshObser();
    return Promise.resolve().then(() => {
      if (this.__data_options__
        && !this.__data_options__.local
        && typeof this.__data_options__.removeData === 'function') {
        return this.__data_options__.removeData(keys);
      }
      // local data
      let _localDataKeys = getLocalStorage(`${this.__keyPrefix()}tape-data-key-list`, []);
      keys.forEach(key => {
        let index = _localDataKeys.indexOf(key);
        if (index > 0) {
          _localDataKeys.splice(index, 0);
        }
        removeLocalStorage(`${this.__keyPrefix()}tape-data-value-${key}`)
      });
      setLocalStorage(`${this.__keyPrefix()}tape-data-key-list`, _localDataKeys);
    })
  }

  /**
   * 加载全部数据
   * @returns {Promise<{key: string, value: any}[]>}
   */
  __loadData() {
    return Promise.resolve().then(() => {
      if (this.__data_options__
        && !this.__data_options__.local
        && typeof this.__data_options__.loadData === 'function') {
        return this.__data_options__.loadData();
      }
      // local data
      let data = [];
      let _localDataKeys = getLocalStorage(`${this.__keyPrefix()}tape-data-key-list`, []);
      _localDataKeys.forEach(key => {
        let value = getLocalStorage(`${this.__keyPrefix()}tape-data-value-${key}`);
        if (value) {
          data.push({ key, value })
        }
      });
      return data;
    });
  }

  //////////////////////////////////////////////////////////
  //// Public
  //////////////////////////////////////////////////////////

  /**
   * 检查是否准备好了
   * @returns {Promise<void>}
   */
  checkReady() {
    this.__dataState.ready = false;
    this.__dataState.values = {};
    return this.__loadData().then(kvs => {
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
      this.__dataState.ready = true;
      this.__dataState.values = Object.assign({}, getSalf(this.__data_options__, "defaultValues", {}), res || {});
      Object.keys(this.__dataState.values).forEach(key => {
        if (this.__dataState.values[key] != res[key]) {
          this.__saveData(key, this.__dataState.values[key]);
        }
      })
      this.__refreshObser();
    });
  }

  /**
   * 是否准备好了
   * @returns {boolean}
   */
  isReady() {
    return this.__dataState && this.__dataState.ready;
  }

  /**
   * 设置数据
   * @param {string} key KEY
   * @param {any} value 数据
   * @returns {void}
   */
  set(key, value) {
    if (!this.isReady()) {
      return;
    }
    if (this.__dataState.values[key] !== value) {
      this.__dataState.values[key] = value;
      this.__saveData(key, value);
    }
  }

  /**
   * 获取数据
   * @param {string} key KEY
   * @param {any} def 默认值
   * @returns {any}
   */
  get(key, def) {
    if (!this.isReady()) {
      return def;
    }
    return getSalf(this.__dataState.values, key, def);
  }

  /**
   * 移除数据
   * @param {string} key KEY
   * @returns {void}
   */
  remove(key) {
    if (!this.isReady()) {
      return;
    }
    if (this.__dataState.values[key]) {
      delete this.__dataState.values[key];
      this.__removeData([key]);
    }
  }

  /**
   * 检查是否存在数据
   * @param {string} key KEY
   * @returns {boolean}
   */
  has(key) {
    if (!this.isReady()) {
      return false;
    }
    return this.keys().indexOf(key) >= 0;
  }

  /**
   * 获取KEY列表
   * @group data
   * @returns {string[]}
   */
  keys() {
    if (!this.isReady()) {
      return [];
    }
    return Object.keys(this.__dataState.values);
  }

  /**
   * 清空数据
   * @returns {void}
   */
  clear() {
    if (!this.isReady()) {
      return;
    }
    this.__dataState.values = {};
    this.__removeData(this.keys());
  }

}
