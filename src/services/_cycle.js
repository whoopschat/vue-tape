let _isshow = false;
let _time = 0;
let _shows = [];
let _hides = [];
let _caller_show = null;
let _caller_hide = null;

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

export function _initLifeCycle() {
    _time = performance.now();
    let { hidden, visibilityChange } = _visibilityChangeInfo();
    document.addEventListener(visibilityChange, () => {
        if (document[hidden]) {
            callHide();
        } else {
            callShow();
        }
    }, false);
    window.addEventListener("pageshow", () => {
        callShow()
    }, false);
    onLoad(() => {
        if (!_isshow) {
            callShow()
        }
    })
}

function callShow() {
    _isshow = true;
    if (_caller_show) {
        return;
    }
    _caller_show = setTimeout(() => {
        _caller_show = null;
        _time = performance.now();
        _shows.forEach(show => {
            show && show();
        });
    }, 100);
}

function callHide() {
    _isshow = false;
    if (_caller_hide) {
        return;
    }
    _caller_hide = setTimeout(() => {
        _caller_hide = null;
        _hides.forEach(hide => {
            hide && hide({
                time: performance.now() - _time
            });
        });
    }, 0);
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
    }
    setTimeout(_pollingDocument, 16);
}

export function onShow(show) {
    if (show && typeof show == 'function' && _shows.indexOf(show) < 0) {
        _isshow && show();
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