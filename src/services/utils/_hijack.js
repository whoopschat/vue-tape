let _listeners = {};
let _inited = false;
let _type = `hijack-session-${Date.now().toString(36)}`;

function _push(key, len = 1) {
    for (let index = 0; index < len; index++) {
        window.history.pushState({ key, type: _type }, null, window.location.href);
    }
}

function _init() {
    if (_inited) {
        return;
    }
    _inited = true;
    window.addEventListener("popstate", (event) => {
        try {
            if (event && event.state && event.state.key && event.state.type == _type) {
                let key = event.state.key;
                let listener = _listeners[key];
                if (listener) {
                    let flag = listener();
                    if (flag) {
                        _push(key, 1);
                    } else {
                        window.history.go(-1);
                        removeBackListener(key);
                    }
                } else {
                    window.history.go(-1);
                }
            }
        } catch (error) {
        }
    });
}

export function addHijack(key, listener) {
    _init();
    if (key && listener && typeof listener == 'function') {
        _listeners[key] = listener;
        _push(key, 2);
    }
}

export function removeHijack(key) {
    try {
        if (_listeners[key]) {
            delete _listeners[key];
        }
    } catch (error) {
    }
}
