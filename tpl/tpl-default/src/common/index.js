import './style.less';
import vue from 'vue';
import vueTape from 'vue-tape';
import config from './config'
import state from './state'

vue.use(vueTape);

export function init(app, callback) {
  // init app
  vueTape.initApp({
    el: '#app',
    app,
    stateOptions: {
      keyPrefix: "biz-",
      defaultValues: state
    }
  }, (vue) => {
    vue.prototype.getConfig = (key, def) => {
      return vueTape.get(config, key, def);
    };
    callback && callback(vue);
  });
}