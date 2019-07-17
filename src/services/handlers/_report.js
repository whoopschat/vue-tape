import { getAppName } from "../_app";
import { attachEvent } from "../utils/_event";
import { checkInView, onInViewChanged, offInViewChanged } from "../utils/_inview";
import { createBindingId, setBinding, removeBinding, getBinding } from "../utils/_bind";
import { isDebug } from "../utils/_debug";
import { getVue } from "../__vue";

let _handler = null;

function _canExposure(el) {
    try {
        let key = el.getAttribute("exposure-key");
        if (!key) {
            return true;
        }
        if (!key || __reports__.indexOf(key) < 0) {
            __reports__.push(key);
            return true;
        }
    } catch (error) {
    }
    return false;
}

function _addExposure(el, handler) {
    let checkExposure = () => {
        try {
            let show = checkInView(el);
            let time = el.getAttribute("exposure-time");
            if (show && !time && _canExposure(el)) {
                el.setAttribute("exposure-time", Date.now());
                handler && handler(el);
            }
        } catch (error) {
        }
    }
    onInViewChanged(createBindingId('exposure', el), checkExposure);
    checkExposure();
}

function _removeExposure(el) {
    offInViewChanged(createBindingId('exposure', el));
}

function _resetExposure(el) {
    try {
        el.setAttribute("exposure-time", "");
    } catch (error) {
    }
}

export function _initReport() {
    getVue().directive('report', {
        bind: function (el, binding) {
            setBinding('exposure', el, binding);
            if (binding.rawName == 'v-report' || binding.rawName == 'v-report:click') {
                attachEvent(el, 'click', () => {
                    reportEvent('click', getBinding(el));
                });
            }
            if (binding.rawName == 'v-report' || binding.rawName == 'v-report:exposure') {
                _addExposure(el, (el) => {
                    reportEvent('exposure', getBinding(el));
                });
            }
        },
        update: function (el, binding) {
            setBinding('exposure', el, binding);
            _resetExposure(el);
        },
        unbind: function (el) {
            removeBinding('exposure', el);
            _removeExposure(el);
        },
    })
}

export function setReportHandler(handler) {
    if (handler && typeof handler == 'function') {
        _handler = handler;
    }
}

export function reportEvent(event, data) {
    let eventData = {
        event: event,
        page: getAppName()
    }
    if (data !== undefined) {
        eventData.data = data;
    }
    _handler && _handler(eventData);
    isDebug() && console.log('report', eventData)
}