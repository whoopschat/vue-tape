import { frameLoop } from "../utils/_loop";
import { isDebug } from "../utils/_debug";
import { showToast } from "../comps/_toast";
import { reportEvent } from "./_report";

let __time__ = 0;
let __shows__ = [];
let __hides__ = [];
let __errors__ = [];

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
    let unload_time = timing.unloadEventEnd - timing.unloadEventStart;
    let tcp_time = timing.connectEnd - timing.connectStart;
    let white_time = timing.responseStart - startTime;
    let onload_time = timing.loadEventStart - startTime;
    let domready_time = timing.domContentLoadedEventStart - startTime;
    let response_time = timing.responseStart - timing.requestStart;
    let download_time = timing.responseEnd - timing.responseStart;
    let ssl_time = _getSSLTime(timing.connectEnd, timing.secureConnectionStart);
    return {
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

export function _initLifeCycle() {
    let hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
    __time__ = performance.now();
    onLoad((info) => {
        reportEvent('onload', info);
        reportEvent('onshow');
    });
    document.addEventListener(visibilityChange, () => {
        if (!document[hidden]) {
            frameLoop(() => {
                reportEvent('onshow');
                __time__ = performance.now();
                __shows__.forEach(show => {
                    show && show();
                });
            }, 5, 1)
        } else {
            frameLoop(() => {
                reportEvent('onhide', {
                    time: performance.now() - __time__
                })
                __hides__.forEach(hide => {
                    hide && hide();
                });
            }, 5, 1)
        }
    });
}

export function _handleError(e, print = true) {
    reportEvent('onerror', e);
    __errors__.forEach(error => {
        error && error(e);
    });
    print && console.error(e);
    isDebug() && showToast(e);
}

export function onLoad(callback) {
    let _onload = function (info) {
        callback && callback(info);
    };
    let _pollingDocument = function () {
        if (!!document && document.readyState == 'complete') {
            _onload(_getPerformanceInfo());
        } else {
            frameLoop(_pollingDocument, 1, 1);
        }
    };
    frameLoop(_pollingDocument, 1, 1);
}

export function onShow(show) {
    if (show && typeof show == 'function' && __shows__.indexOf(show) < 0) {
        frameLoop(() => {
            show && show();
        }, 5, 1);
        __shows__.push(show);
    }
}

export function offShow(show) {
    let index = __shows__.indexOf(show);
    if (index >= 0) {
        __shows__.splice(index, 1);
    }
}

export function onHide(hide) {
    if (hide && typeof hide == 'function' && __hides__.indexOf(hide) < 0) {
        __hides__.push(hide);
    }
}

export function offHide(hide) {
    let index = __hides__.indexOf(hide);
    if (index >= 0) {
        __hides__.splice(index, 1);
    }
}

export function onError(error) {
    if (error && typeof error == 'function' && __errors__.indexOf(error) < 0) {
        __errors__.push(error);
    }
}