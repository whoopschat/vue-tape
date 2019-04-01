import { encodeBase64, decodeBase64 } from "./_base64";

let _listeners = {}
let _hrefs = {};

function _key() {
    return encodeBase64(window.location.href);
}

function _checkHref(href) {
    Object.keys(_hrefs).forEach(h => {
        if (href.indexOf(decodeBase64(h)) >= 0) {
            _hrefs[h]++;
        }
    });
}

function _pushHref() {
    let key = _key();
    if (!_hrefs[key] || _hrefs[key] <= 0) {
        _hrefs[key] = 1;
    } else {
        _hrefs[key]++;
    }
}

function _popHref() {
    let key = _key();
    if (_hrefs[key] && _hrefs[key] > 0) {
        _hrefs[key]--;
    }
}

function _resetHref(value = 0) {
    let key = _key();
    if (_hrefs[key] && _hrefs[key] > 0) {
        _hrefs[key] = value;
    }
}

function _lenHref() {
    let key = _key();
    return _hrefs[key] || 0;
}

function _pushState() {
    let state = {
        title: _lenHref(),
        url: window.location.href
    }
    _pushHref();
    window.history.pushState(state, state.title, state.url);
}

export function back() {
    _resetHref(1);
    let key = _key();
    delete _listeners[key];
    window.history.go(-1);
}

export function backListener(listener) {
    if (listener && typeof listener == 'function') {
        let key = _key();
        _pushState();
        _listeners[key] = listener;
    }
}

export function initBack() {
    window.addEventListener("popstate", function () {
        let len = _lenHref();
        if (len > 0) {
            let key = _key();
            let listener = _listeners[key];
            if (listener) {
                if (len > 1) {
                    _resetHref();
                    _pushState();
                    return;
                }
                let flag = listener();
                if (flag) {
                    _popHref();
                    _pushState();
                    return;
                }
            }
            window.history.go(-1);
        } else {
            _checkHref(location.href);
        }
    });
}