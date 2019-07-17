import { createHtmlComponent } from "./_component";

let _timer = null;
let _showLoading = null;
let _hideLoading = null;

export function showLoading(msg = '', duration) {
    _showLoading && _showLoading(msg, duration);
}

export function hideLoading() {
    _hideLoading && _hideLoading();
}

export function _initLoading() {
    const comp = createHtmlComponent('', { num: 0 });
    const instance = new comp();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    _showLoading = (msg = '', duration) => {
        _timer && clearTimeout(_timer);
        instance.html = `<div class="--vue-tape-loading">
            <div class="loading">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
                <div class="text">${msg}</div>
            </div>
        </div>`;
        if (duration > 0) {
            _timer = setTimeout(() => { hideLoading() }, duration);
        }
    }
    _hideLoading = () => {
        instance.html = '';
        _timer && clearTimeout(_timer);
    }
}