import vuex from 'vuex'
import { getStorage, setStorage, checkStorage } from './_storage';
import { getVue, getKey } from './__vue';

let KEY_PREFIX = 'vtape_state_';

class Store {

  __state__ = {};
  __inited__ = false;

  __initState(value) {
    let vue = getVue();
    if (!vue || this.__inited__) {
      return;
    }
    vue.use(vuex);
    this.__inited__ = true;
    this.instance = new vuex.Store({
      state: getStorage(`${KEY_PREFIX}${getKey()}`, Object.assign({}, value || {})),
      mutations: {
        init: (state, props) => {
          this.__state__ = props;
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
    setStorage(`${KEY_PREFIX}${getKey()}`, this.instance.state);
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
      if (!checkStorage(`${KEY_PREFIX}${getKey()}`, this.state)) {
        let data = getStorage(`${KEY_PREFIX}${getKey()}`, this.__state__);
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
