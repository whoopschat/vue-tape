import { createHtmlComponent } from "./_component";

let _timer = null;
let _showToast = null;

export function showToast(msg, duration) {
    _showToast && _showToast(msg, duration);
}

export function _initToast() {
    const comp = createHtmlComponent('', { num: 0 });
    const instance = new comp();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    _showToast = (msg, duration = 1500) => {
        if (duration < 1000) {
            duration = 1000;
        }
        if (duration > 5000) {
            duration = 5000;
        }
        _timer && clearTimeout(_timer);
        instance.html = `<div class="--vue-tape-toast">${msg}</div>`
        _timer = setTimeout(() => {
            instance.html = '';
            _timer = null;
        }, duration);
    }
}