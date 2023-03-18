import './style'
import { create } from './services'

class Instance {

  _instance = null;
  _installed = false;

  get instance() {
    return this._instance;
  }

  install(vue) {
    if (this._installed || !vue) {
      return;
    }
    this._instance = create(vue);
    vue.prototype.$tape = this._instance;
    this._installed = true;
  }

}

const instance = new Instance;

export function getInstance() {
  return instance.instance;
}

export default instance;