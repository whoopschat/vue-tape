import { createHtmlComponent } from "./_page";
import { stopScroll, startScroll } from "./_scroll";

let _show_loading_fun = null;
let _hide_loading_fun = null;
let _timer = null;

export function showLoading(msg, duration) {
    _show_loading_fun && _show_loading_fun(msg, duration);
}

export function hideLoading() {
    _hide_loading_fun && _hide_loading_fun();
}

export function _initLoading() {
    const comp = createHtmlComponent('', { num: 0 });
    const instance = new comp();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    _show_loading_fun = (msg = '', duration) => {
        instance.html = `<div class="vue-tape-loading">
            <div class="loading">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
                <div class="text">${msg}</div>
            </div>
        </div>`;
        stopScroll();
        if (_timer) {
            clearTimeout(_timer);
        }
        if (duration > 0) {
            _timer = setTimeout(() => {
                hideLoading()
            }, duration)
        }
    }
    _hide_loading_fun = () => {
        instance.html = '';
        startScroll();
        if (_timer) {
            clearTimeout(_timer);
        }
    }
}