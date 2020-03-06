import { createHtmlComponent } from "./_component";

let _map = {};
let _has = false;
let _padding = [];
let _current = {};

function _handlePadding() {
    if (_padding.length > 0) {
        let options = _padding.pop();
        showModal(options);
    }
}

function _initModal(options) {
    if (options && options.key && _map[options.key]) {
        return _map[options.key]
    }
    if (!window._TAPE_MODAL_CLICK_MAP_) {
        window._TAPE_MODAL_CLICK_MAP_ = {};
    }
    const comp = createHtmlComponent('', {});
    const instance = new comp();
    instance.$mount(document.createElement('div'))
    let realShow = () => {
        _has = true;
        _current = options;
        document.body.appendChild(instance.$el);
    }
    let realHide = () => {
        _has = false;
        _current = null;
        document.body.removeChild(instance.$el);
        if (options && options.key) {
            delete _map[options.key];
        }
        _handlePadding();
    }
    let _show = (options) => {
        realShow();
        let {
            icon,
            title = "提示",
            message = "",
            cancelText = "",
            confirmText = "我知道了",
            cancelColor = "#919191",
            confirmColor = "#00C882",
            cancelable = false,
            flexable = true,
            callback
        } = options;
        let id = Date.now();
        _TAPE_MODAL_CLICK_MAP_[id] = (confirm, e) => {
            if (confirm == -2 && e && e.stopPropagation) {
                e.stopPropagation();
                return;
            }
            if (confirm == -1) {
                if (cancelable) {
                    realHide();
                }
                return;
            }
            let flag = callback && callback(confirm);
            if (!flag) {
                realHide()
            }
        }
        let useCancelColor = cancelColor;
        let useConfirmColor = confirmColor;
        let icon_html = icon ? `<img class="icon" src="${icon}"><div class="line1"></div>` : ''
        let title_html = title ? `<div class="title">${title}</div><div class="line1"></div>` : ''
        let message_html = message ? `<div class="message">${message}</div><div class="line1"></div>` : '';
        let createBtn = (type, options) => {
            let btn = `<div class="btn" onclick="_TAPE_MODAL_CLICK_MAP_[${id}](${type})" style="color: ${options.color};background: ${options.bg};border:1px solid ${options.border};">${options.text}</div>`;
            if (flexable) {
                return btn;
            }
            return `<div class="btns">${btn}</div>`
        }
        let confirm_html = "";
        if (confirmText) {
            let def = { color: useConfirmColor }
            if (confirmText instanceof Array) {
                if (confirmText.length > 1) {
                    flexable = false;
                }
                confirmText.forEach((options, index) => {
                    if (typeof options == "object") {
                        confirm_html += createBtn(index + 1, Object.assign({}, def, options));
                    } else {
                        confirm_html += createBtn(index + 1, Object.assign({}, def, { text: options }));
                    }
                });
            } else if (typeof confirmText == "object") {
                confirm_html += createBtn(1, Object.assign({}, def, confirmText));
            } else {
                confirm_html += createBtn(1, Object.assign({}, def, { text: confirmText }));
            }
        }
        let cancel_html = "";
        if (cancelText) {
            let def = { color: useCancelColor }
            if (typeof cancelText == "object") {
                cancel_html += createBtn(0, Object.assign({}, def, cancelText));
            } else {
                cancel_html += createBtn(0, Object.assign({}, def, { text: cancelText }));
            }
        }
        let btns_html = (cancel_html + confirm_html) ? flexable ? `<div class="line24"></div><div class="btns">${confirm_html}${cancel_html}</div>` : `<div class="line24"></div>${confirm_html}${cancel_html}</div>` : ''
        instance.html = `<div class="--vue-tape-popup" onclick="_TAPE_MODAL_CLICK_MAP_[${id}](-1)">
            <div class="box" onclick="_TAPE_MODAL_CLICK_MAP_[${id}](-2,event)">
                ${icon_html}
                ${title_html}
                ${message_html}
                ${btns_html}
            </div>
        </div>`;
    }
    if (options && options.key) {
        _map[options.key] = _show;
    }
    return _show;
}

export function showModal(options) {
    if (typeof options !== 'object') {
        return;
    }
    if (options && options.key && options.key == _current.key) {
        return;
    }
    if (!_has) {
        let _showModal = _initModal(options);
        _showModal && _showModal(options);
    } else {
        if (options && options.key && _padding.filter(item => options.key == item.key).length > 0) {
            return;
        }
        _padding.push(options);
    }
}