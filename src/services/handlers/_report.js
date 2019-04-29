import { getVue } from "../__vue";
import { getAppName } from "../_app";
import { isDebug } from "../utils/_debug";

let __handler__ = null;
let __handles__ = {};
let __bindings__ = {};
let __reports__ = [];


function _randomGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
        const t = 16 * Math.random() | 0;
        return (e === "x" ? t : 3 & t | 8).toString(16);
    });
}

function _offChanged(key) {
    if (key) {
        delete __handles__[key];
    }
}

function _onChanged(key, handle) {
    if (key && handle && typeof handle == 'function') {
        __handles__[key] = handle;
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

function _checkVisible(div) {
    try {
        let { w, h } = _getViewportSize();
        let { top, left, width, height } = _getPositionSize(div);
        if (div.getAttribute("report-exposure-all")) {
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

function _createId(el) {
    try {
        if (el) {
            let id = el.getAttribute("report-id");
            if (!id) {
                id = _randomGUID();
                el.setAttribute("report-id", id);
            }
            return id;
        }
    } catch (error) {
    }
}

function _canReport(el) {
    let key = el.getAttribute("report-key");
    if (!key) {
        return true;
    }
    if (!key || __reports__.indexOf(key) < 0) {
        __reports__.push(key);
        return true;
    }
    return false;
}

function _resetExposure(el) {
    try {
        el.setAttribute("report-time", "");
    } catch (error) {
    }
}

function _addExposure(el, handler) {
    let _checkExposure = () => {
        try {
            let show = _checkVisible(el, false);
            let reported = el.getAttribute("report-time");
            if (show && !reported && _canReport(el)) {
                el.setAttribute("report-time", Date.now());
                handler && handler(el);
            }
        } catch (error) {
        }
    }
    _onChanged(_createId(el), _checkExposure);
    _checkExposure();
}

function _delExposure(el) {
    _offChanged(_createId(el));
}

function _removeBinding(el) {
    let id = _createId(el);
    if (id) {
        delete __bindings__[id];
    }
}

function _getBinding(el) {
    let id = _createId(el);
    if (id) {
        return __bindings__[id];
    }
}

function _setBinding(el, binding) {
    let id = _createId(el);
    if (id) {
        __bindings__[id] = binding;
    }
}

function report(event, binding) {
    reportEvent(event, binding.value)
}

export function _initReport() {
    getVue().directive('report', {
        bind: function (el, binding) {
            _setBinding(el, binding);
            if (binding.rawName == 'v-report' || binding.rawName == 'v-report:click') {
                _addEvent(el, 'click', () => {
                    report('click', _getBinding(el));
                });
            }
            if (binding.rawName == 'v-report' || binding.rawName == 'v-report:exposure') {
                _addExposure(el, (el) => {
                    report('exposure', _getBinding(el));
                });
            }
        },
        update: function (el, binding) {
            _resetExposure(el);
            _setBinding(el, binding);
        },
        unbind: function (el) {
            _delExposure(el);
            _removeBinding(el);
        },
    })
    let _handleChanged = () => {
        Object.keys(__handles__).forEach(key => {
            let handle = __handles__[key];
            if (handle && typeof handle == 'function') {
                handle();
            }
        });
    }
    _addEvent(window, 'touchmove', _handleChanged);
    _addEvent(window, 'scroll', _handleChanged);
    _addEvent(window, 'resize', _handleChanged);
    _addEvent(document, 'DOMContentLoaded', _handleChanged);
    setInterval(_handleChanged, 50);
}

export function reportEvent(event, data) {
    let eventData = {
        event: event,
        page: getAppName()
    }
    if (data !== undefined) {
        eventData.data = data;
    }
    __handler__ && __handler__(eventData)
    isDebug() && console.log('report', eventData)
}

export function setReportHandler(handler) {
    if (handler && typeof handler == 'function') {
        __handler__ = handler;
    }
}