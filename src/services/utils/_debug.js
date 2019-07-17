let _debug = false;

export function showDebug(data) {
    isDebug() && showToast(data);
}

export function setDebug(debug) {
    _debug = !!debug;
}

export function isDebug() {
    return _debug;
}