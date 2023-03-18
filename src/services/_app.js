import { getVue } from './__vue';
import { getVersion } from "./utils/_version";
import { createHtmlComponent } from './_comp';
import { _initLifeCycle } from './_cycle';
import { ready } from './manager/_state';

function createErrorComp(errorMsg) {
  return createHtmlComponent('<div class="--vue-tape-error">'
    + '<div style="color:#333333; font-size: 20px; margin-bottom: 10px;">'
    + 'Oh! Error :('
    + '</div>'
    + `${errorMsg}`
    + '<div style="color:#333333; font-size: 14px; margin-top: 10px;">'
    + '<a href="https://github.com/whoopschat/vue-tape">VUE-TAPE</a>'
    + '<span style="color:#919191; margin-left: 10px;">'
    + `(version: ${getVersion()})`
    + '</span>'
    + '</div>'
    + '</div>')
}

export function initApp({ el, app, options, stateOptions }, handler) {
  // init life cycle
  _initLifeCycle();
  // init vue app
  let _vue = getVue();
  ready(stateOptions, (state) => {
    let _vue = getVue();
    if (_vue && typeof _vue.observable === 'function') {
      _vue.observable(state);
    }
  }).then(() => {
    return Promise.resolve().then(() => {
      return handler && handler(_vue);
    }).then(() => {
      new _vue(Object.assign(options || {}, {
        el: el || '#app',
        render: h => h(app || createErrorComp("Error: Invalid parameters [app] -> initApp({ ... })"))
      }))
    }).catch((err) => {
      console.error(err);
      new _vue(Object.assign(options || {}, {
        el: el || '#app',
        render: h => h(createErrorComp(err))
      }))
    })
  })
} 