import { createHtmlComponent } from "./_component";

function _initModal() {
    if (!window._TAPE_MODAL_CLICK_MAP_) {
        window._TAPE_MODAL_CLICK_MAP_ = {};
    }
    const comp = createHtmlComponent('', {});
    const instance = new comp();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    return (options) => {
        let hide = () => {
            document.body.removeChild(instance.$el);
        }
        let {
            icon,
            title = "提示",
            message = "",
            cancelText = "",
            confirmText = "我知道了",
            btnColor = "#00C882",
            cancelColor = "",
            confirmColor = "",
            flexable = false,
            cancelable = true,
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
                    hide();
                }
                return;
            }
            let flag = callback && callback(confirm);
            if (!flag) {
                hide()
            }
        }
        let useCancelColor = cancelColor || btnColor;
        let useConfirmColor = confirmColor || btnColor;
        let icon_html = icon ? `<img class="icon" src="${icon}">` : ''
        let title_html = title ? `<div class="title">${title}</div><div class="line1"></div>` : ''
        let message_html = message ? `<div class="message">${message}</div><div class="line1"></div>` : ''
        let cancel_html = cancelText ? `<div class="btn" onclick="_TAPE_MODAL_CLICK_MAP_[${id}](0)" style="color: ${useCancelColor};border:1px solid ${useCancelColor};">${cancelText}</div>` : ''
        let confirm_html = confirmText ? `<div class="btn" onclick="_TAPE_MODAL_CLICK_MAP_[${id}](1)" style="color: #ffffff;background: ${useConfirmColor};border:1px solid ${useConfirmColor};">${confirmText}</div>` : ''
        let btns_html = (cancel_html + confirm_html) ? flexable ? `<div class="line24"></div><div class="btns">${cancel_html}${confirm_html}</div>` : `<div class="line24"></div><div class="btns">${cancel_html}</div><div class="btns">${confirm_html}</div>` : ''
        instance.html = `<div class="--vue-tape-popup" onclick="_TAPE_MODAL_CLICK_MAP_[${id}](-1)">
            <div class="box" onclick="_TAPE_MODAL_CLICK_MAP_[${id}](-2,event)">
                ${icon_html}
                ${title_html}
                ${message_html}
                ${btns_html}
            </div>
        </div>`;
    }
}

export function showModal(msg = '') {
    let _showModal = _initModal();
    _showModal && _showModal(msg);
}