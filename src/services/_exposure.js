let __changeds__ = [];
let __keys__ = [];

function _onChanged(scroll) {
    if (scroll && typeof scroll == 'function' && __changeds__.indexOf(scroll) < 0) {
        __changeds__.push(scroll);
    }
}

function _getViewportSize() {
    return {
        w: screen.width || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        h: screen.height || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}

function _getPositionSize(element) {
    let top, left, width, height;
    while (element.offsetLeft === void 0) {
        element = element.parentElement;
    }
    width = element.clientWidth;
    height = element.clientHeight;
    top = element.offsetTop;
    left = element.offsetLeft;
    while (element = element.parentElement) {
        top += -(element.scrollTop || 0);
        left += - (element.scrollLeft || 0);
    }
    return { top, left, width, height };
}

function _canExposured(div, exposureKey) {
    let key = div.getAttribute(exposureKey || "exposure-key");
    if (!key) {
        return true;
    }
    if (!key || __keys__.indexOf(key) < 0) {
        return true;
    }
    return false;
}

function _checkVisible(div, showAll = false) {
    try {
        let { w, h } = _getViewportSize();
        let { top, left, width, height } = _getPositionSize(div);
        if (showAll || div.getAttribute("exposure-showall")) {
            return width > 0 && height > 0 && top >= 0 && top + height < h && left >= 0 && left + width < w;
        }
        return width > 0 && height > 0 && top + height >= 0 && top < h && left + width >= 0 && left < w;
    } catch (error) {
    }
    return false;
}

function _addEvent(elem, event, fn) {
    if (elem.addEventListener != null) {
        return elem.addEventListener(event, fn, false);
    } else if (elem.attachEvent != null) {
        return elem.attachEvent("on" + event, fn);
    } else {
        return elem[event] = fn;
    }
}

export function initExposure() {
    let _handleChanged = () => {
        __changeds__.forEach(scroll => {
            scroll && scroll();
        });
    }
    _addEvent(window, 'touchmove', _handleChanged);
    _addEvent(window, 'scroll', _handleChanged);
    _addEvent(window, 'resize', _handleChanged);
    _addEvent(document, 'DOMContentLoaded', _handleChanged);
    setInterval(_handleChanged, 50);
}

export function exposure({ selector, exposureKey, delayTime, displayAll, extraData, handleExposure }) {
    let _checkExposure = () => {
        let selectorAll = document.documentElement.querySelectorAll(selector) || [];
        selectorAll.forEach(div => {
            try {
                let show = _checkVisible(div, displayAll);
                let time = +(div.getAttribute("exposure-time") || '-1');
                if (show && (time <= 0 || delayTime <= 0 || (time + delayTime) < Date.now()) && _canExposured(div, exposureKey)) {
                    div.setAttribute("exposure-time", Date.now());
                    handleExposure && handleExposure(div, extraData || {});
                }
            } catch (error) {
            }
        });
    }
    _onChanged(_checkExposure);
    _checkExposure();
}