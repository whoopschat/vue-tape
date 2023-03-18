import './style.less';
import vue from 'vue';
import vueTape from 'vue-tape';
import config from './config'

vue.use(vueTape);

export function init(app, callback) {
  // init app
  vueTape.initApp({
    el: '#app',
    app
  }, (vue) => {
    vue.prototype.getConfig = (key, def) => {
      return vueTape.get(config, key, def);
    }
    callback && callback(vue);
  });
}