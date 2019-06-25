import { attachEvent } from "./_event";

let _init = false;
let _visible_changeds = {};

function __getViewportSize() {
    return {
        w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}

function __getPositionSize(element) {
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

function __init() {
    if (_init) {
        return;
    }
    _init = true;
    let _handleChanged = () => {
        Object.keys(_visible_changeds).forEach(key => {
            let handle = _visible_changeds[key];
            if (handle && typeof handle == 'function') {
                handle();
            }
        });
    }
    attachEvent(window, 'touchmove', _handleChanged);
    attachEvent(window, 'scroll', _handleChanged);
    attachEvent(window, 'resize', _handleChanged);
    attachEvent(document, 'DOMContentLoaded', _handleChanged);
    setInterval(_handleChanged, 50);
}

export function checkInView(div, offset) {
    __init();
    try {
        let { w, h } = __getViewportSize();
        let { top, left, width, height } = __getPositionSize(div);
        return width > 0 && height > 0 && top + height >= 0 && top < h && left + width >= 0 && left < w;
    } catch (error) {
    }
    return false;
}

export function offInViewChanged(key) {
    if (key) {
        delete _visible_changeds[key];
    }
}

export function onInViewChanged(key, handle) {
    __init();
    if (key && handle && typeof handle == 'function') {
        _visible_changeds[key] = handle;
    }
}