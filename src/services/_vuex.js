import vuex from 'vuex'
import { getStorage, setStorage, checkStorage } from './_storage';
import { getVue, getKey } from './__vue';

let _state_prefix = 'tape_state_';
let _default_state = {};
let _inited = false;

class Store {

  __initState(value) {
    let vue = getVue();
    if (!vue || _inited) {
      return;
    }
    vue.use(vuex);
    _inited = true;
    this.instance = new vuex.Store({
      state: getStorage(`${_state_prefix}${getKey()}`, Object.assign({}, value || {})),
      mutations: {
        init: (state, props) => {
          _default_state = props;
          Object.assign(state, Object.assign({}, props, state));
          this.__updateState();
        },
        set: (state, props, reset = false) => {
          if (reset) {
            Object.keys(state).forEach(key => {
              if (!props[key]) {
                delete state[key];
              }
            });
          }
          Object.assign(state, props);
          this.__updateState();
        },
      }
    });
    this.__watchStorage();
    this.__watchState();
    this.instance.commit('init', value);
  }

  __updateState() {
    if (!this.instance) {
      return;
    }
    setStorage(`${_state_prefix}${getKey()}`, this.instance.state);
  }

  __watchState() {
    if (!this.instance) {
      return;
    }
    this.instance.watch((state) => state, () => {
      this.__updateState();
    }, { deep: true, immediate: true });
  }

  __watchStorage() {
    if (!this.instance) {
      return;
    }
    window.addEventListener("storage", () => {
      if (!checkStorage(`${_state_prefix}${getKey()}`, this.state)) {
        let data = getStorage(`${_state_prefix}${getKey()}`, _default_state);
        this.instance.commit('set', data, true);
      }
    });
  }

  get state() {
    if (!this.instance) {
      return;
    }
    return this.instance.state;
  }

  set state(value) {
    if (!this.instance) {
      return;
    }
    this.instance.commit('set', value);
  }

}

const store = new Store();

export function _initState(value) {
  store.__initState(value);
}

export default store;
