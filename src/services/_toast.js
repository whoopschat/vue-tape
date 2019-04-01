import { getVue } from "./_vue";

let _toast_fun = null;

export function initToast() {
    const Toast = getVue().extend({
        data() {
            return {
                num: 0,
                showToast: false,
                toastContent: '',
            }
        },
        render: function (createElement) {
            return createElement(
                'div', {
                    'class': {
                        'vue-tape-toast': this.showToast
                    },
                    'attrs': {
                        style: `top: ${this.top}%`
                    },
                    domProps: {
                        innerHTML: this.toastContent
                    },
                },
            )
        }
    })
    const instance = new Toast();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    _toast_fun = (msg, duration = 1500) => {
        instance.num++;
        if (instance.num < 2) {
            instance.showToast = true
            instance.toastContent = msg
            setTimeout(() => {
                instance.showToast = false
                instance.num = 0
            }, duration)
        }
    }
}

export function toast(msg, duration = 1500) {
    _toast_fun && _toast_fun(msg, duration);
}