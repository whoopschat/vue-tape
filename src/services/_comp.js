import { getVue } from "./__vue";

export function createHtmlComponent(html, data) {
  return getVue().extend({
    data() {
      return Object.assign({
        html: html
      }, data || {})
    },
    render: function (createElement) {
      return createElement('div', { domProps: { innerHTML: this.html } })
    }
  });
}