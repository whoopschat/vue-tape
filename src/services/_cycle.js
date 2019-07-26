import { showToast } from "./comps/_toast";
import { isDebug } from "./utils/_debug";

let _time = 0;
let _shows = [];
let _hides = [];
let _errors = [];

function _getSSLTime(connectEnd, secureConnectionStart) {
    let ssl_time = 0;
    if (secureConnectionStart) {
        ssl_time = connectEnd - secureConnectionStart;
    }
    return ssl_time;
}

function _getPerformanceInfo() {
    let timing = window.performance.timing;
    let startTime = timing.navigationStart || timing.fetchStart;
    if (startTime <= 0) {
        return {};
    }
    let url = location.href;
    let tcp_time = timing.connectEnd - timing.connectStart;
    let unload_time = timing.unloadEventEnd - timing.unloadEventStart;
    let white_time = timing.responseStart - startTime;
    let onload_time = timing.loadEventStart - startTime;
    let domready_time = timing.domContentLoadedEventStart - startTime;
    let response_time = timing.responseStart - timing.requestStart;
    let download_time = timing.responseEnd - timing.responseStart;
    let ssl_time = _getSSLTime(timing.connectEnd, timing.secureConnectionStart);
    return {
        url,
        tcp_time,
        unload_time,
        white_time,
        onload_time,
        domready_time,
        response_time,
        download_time,
        ssl_time
    }
}

function _visibilityChangeInfo() {
    let hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    }
    return { hidden, visibilityChange }
}

export function _handleError(e, print = true) {
    print && console.error(e);
    isDebug() && showToast(e);
    _errors.forEach(error => {
        error && error(e);
    });
}

export function _initLifeCycle() {
    _time = performance.now();
    let { hidden, visibilityChange } = _visibilityChangeInfo();
    document.addEventListener(visibilityChange, () => {
        if (!document[hidden]) {
            _time = performance.now();
            _shows.forEach(show => {
                show && show();
            });
        } else {
            _hides.forEach(hide => {
                hide && hide({
                    time: performance.now() - _time
                });
            });
        }
    }, false);
}

export function onLoad(callback) {
    let _onload = function (info) {
        callback && callback(info);
    };
    let _pollingDocument = function () {
        if (!!document && document.readyState == 'complete') {
            _onload(_getPerformanceInfo());
        } else {
            setTimeout(_pollingDocument, 16);
        }
    };
    setTimeout(_pollingDocument, 16);
}

export function onShow(show) {
    if (show && typeof show == 'function' && _shows.indexOf(show) < 0) {
        try {
            let { hidden } = _visibilityChangeInfo();
            if (!document[hidden]) {
                show && show()
            }
        } catch (error) {
        }
        _shows.push(show);
    }
}

export function offShow(show) {
    let index = _shows.indexOf(show);
    if (index >= 0) {
        _shows.splice(index, 1);
    }
}

export function onHide(hide) {
    if (hide && typeof hide == 'function' && _hides.indexOf(hide) < 0) {
        _hides.push(hide);
    }
}

export function offHide(hide) {
    let index = _hides.indexOf(hide);
    if (index >= 0) {
        _hides.splice(index, 1);
    }
}

export function onError(error) {
    if (error && typeof error == 'function' && _errors.indexOf(error) < 0) {
        _errors.push(error);
    }
}