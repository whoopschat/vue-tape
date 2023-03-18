import './style.less';
import vue from 'vue';
import vueTape, { getInstance } from '../../../src/core';
import conf from './config'

vue.use(vueTape);

export function init(app, callback) {
  // init app
  getInstance().initApp({
    el: '#app',
    app,
    dataOptions: {
      defaultValues: {
        randomValue: Math.random()
      }
    }
  }, (vue) => {
    vue.prototype.getConfig = (key, def) => {
      return getInstance().get(conf, key, def);
    };
    callback && callback(vue);
  });
}