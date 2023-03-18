import { getVue } from './__vue';
import { getVersion } from "./utils/_version";
import { createHtmlComponent } from './_comp';
import { _initLifeCycle } from './_cycle';
import { ready } from './manager/_state';

export function initApp({ el, app, options, stateOptions }, handler) {
  // init life cycle
  _initLifeCycle();
  // init vue app
  let _vue = getVue();
  handler && handler(_vue);
  ready(stateOptions, (state) => {
    let _vue = getVue();
    if (_vue && typeof _vue.observable === 'function') {
      _vue.observable(state);
    }
  }).then(() => {
    new _vue(Object.assign(options || {}, {
      el: el || '#app',
      render: h => h(app || createHtmlComponent('<div class="--vue-tape-error">'
        + '<span style="color:#333333; font-size: 16px;">'
        + '<a href="https://github.com/whoopschat/vue-tape">VUE-TAPE</a>'
        + '<span style="color:#919191; font-size: 14px; margin-left: 10px;">'
        + `(version: ${getVersion()})`
        + '</span>'
        + '</span>'
        + '<br/>Error: Invalid parameters [app] -> initApp({ ... })'
        + '</div>'))
    }))
  })
} 