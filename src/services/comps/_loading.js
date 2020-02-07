import { createHtmlComponent } from "./_component";

let _inited = false;
let _timer = null;
let _showLoading = null;
let _hideLoading = null;

function _initLoading() {
    if (_inited) {
        return;
    }
    _inited = true;
    const comp = createHtmlComponent('', {});
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

export function showLoading(msg = '', duration) {
    _initLoading();
    _showLoading && _showLoading(msg, duration);
}

export function hideLoading() {
    _hideLoading && _hideLoading();
}