import { createHtmlComponent } from "./_component";
import { toAny } from "../utils/_toany";

let _inited = false;
let _timer = null;
let _showToast = null;

function _initToast() {
    if (_inited) {
        return;
    }
    _inited = true;
    const comp = createHtmlComponent('', {});
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
        instance.html = `<div class="--vue-tape-toast">
            <div class="text">${msg}</div>
        </div>`
        _timer = setTimeout(() => {
            instance.html = '';
            _timer = null;
        }, duration);
    }
}

export function showToast(msg, duration) {
    _initToast();
    if (typeof msg === "string" && msg) {
        _showToast && _showToast(msg, duration);
    }
}