import './style.less';
import vue from 'vue';
import vueTape from '../../../src/services';
import conf from './config'

vue.use(vueTape);

export function init(app, callback) {
  // init app
  vueTape.initApp({
    el: '#app',
    app,
    dataOptions: {
      defaultValues: {
        randomValue: Math.random()
      }
    }
  }, (vue) => {
    vue.prototype.getConfig = (key, def) => {
      return vueTape.get(conf, key, def);
    };
    callback && callback(vue);
  });
}