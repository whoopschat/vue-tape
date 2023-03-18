import './style.less';
import vue from 'vue';
import vueTape from '../../../src/services';
import state from './state'
import conf from './config'

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
    vue.prototype.$_data = vueTape.createData({
      keyPrefix: "biz-task-",
      defaultValues: {
        abc: Math.random()
      }
    })
    console.log(vue.prototype.$_data)
    vue.prototype.getConfig = (key, def) => {
      return vueTape.get(conf, key, def);
    };
    callback && callback(vue);
  });
}