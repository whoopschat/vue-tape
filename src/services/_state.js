import vuex from 'vuex'
import { getVue } from './__vue';
import { getStorage, setStorage } from './utils/_storage';
import { toAny } from './utils/_toany';

let _init = false;
let _prefix = 'tape_state_';
let _instance = null;

export function _initState(options = {}) {
  let vue = getVue();
  if (!vue || _init) {
    return;
  }
  vue.use(vuex);
  let stateKey = options.key || "default";
  let stateDef = options.state || {};
  _init = true;
  getStorage(`${_prefix}${stateKey}`, stateDef).then(data => {
    _instance = new vuex.Store({
      state: Object.assign({}, stateDef || {}, data || {}),
      mutations: {
        set: (state, props) => {
          Object.assign(state, toAny(props, {}));
          setStorage(`${_prefix}${stateKey}`, _instance.state);
        }
      }
    });
    _instance.watch((state) => state, () => {
      setStorage(`${_prefix}${stateKey}`, _instance.state);
    }, { deep: true, immediate: true });
  });
}

class StateStore {

  get state() {
    if (!_instance) {
      return;
    }
    return _instance.state;
  }

  set state(value) {
    if (!_instance) {
      return;
    }
    _instance.commit('set', value);
  }

}

const state = new StateStore();

export default state;