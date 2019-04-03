import { createHtmlComponent } from "./_page";

let _show_toast_fun = null;
let _show_loading_fun = null;
let _hide_loading_fun = null;
let _timer = null;

export function showLoading(msg, duration) {
    _show_loading_fun && _show_loading_fun(msg, duration);
}

export function hideLoading() {
    _hide_loading_fun && _hide_loading_fun();
}

export function showToast(msg, duration) {
    _show_toast_fun && _show_toast_fun(msg, duration);
}

export function _initDialog() {
    const Toast = createHtmlComponent('', { num: 0 });
    const instance = new Toast();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    _show_toast_fun = (msg, duration = 1500) => {
        if (duration < 1000 || duration > 5000) {
            duration = 1500;
        }
        if (_timer) {
            clearTimeout(_timer);
        }
        instance.html = `<div class="vue-tape-toast">${msg}</div>`
        _timer = setTimeout(() => {
            instance.html = ''
        }, duration)
    }
    _show_loading_fun = (msg = '', duration) => {
        instance.html = `<div class="vue-tape-loading">
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
            <div class="text">${msg}</div>
        </div>`;
        if (_timer) {
            clearTimeout(_timer);
        }
        if (duration > 0) {
            _timer = setTimeout(() => {
                instance.html = ''
            }, duration)
        }
    }
    _hide_loading_fun = () => {
        instance.html = '';
        if (_timer) {
            clearTimeout(_timer);
        }
    }
}