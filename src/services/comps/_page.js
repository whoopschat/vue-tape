import { getVue } from "../__vue";

export function createErrorComponent(error) {
    return createHtmlComponent(`<div class="--vue-tape-error"><h1 style="color:#333333">VUE-TAPE</h1><hr/>ERROR: ${error}</div>`)
}

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