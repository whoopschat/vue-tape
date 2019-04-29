import { createHtmlComponent } from "./_page";

let _show_toast_fun = null;
let _timer = null;

export function showToast(msg, duration) {
    _show_toast_fun && _show_toast_fun(msg, duration);
}

export function _initToast() {
    const comp = createHtmlComponent('', { num: 0 });
    const instance = new comp();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    _show_toast_fun = (msg, duration = 1500) => {
        if (duration < 1000) {
            duration = 1000;
        }
        if (duration > 5000) {
            duration = 5000;
        }
        if (_timer) {
            clearTimeout(_timer);
        }
        instance.html = `<div class="vue-tape-toast">${msg}</div>`
        _timer = setTimeout(() => {
            instance.html = ''
        }, duration)
    }
}