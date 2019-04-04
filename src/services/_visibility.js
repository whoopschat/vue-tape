import { reportEvent } from "./_report";
import { getAppName } from "./_app";

let __shows__ = [];
let __hides__ = [];

export function _initVisibility() {
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
    reportEvent({
        event: 'onshow',
        page: getAppName()
    })
    __shows__.forEach(show => {
        show && show();
    });
    document.addEventListener(visibilityChange, () => {
        if (!document[hidden]) {
            reportEvent({
                event: 'onshow',
                page: getAppName()
            })
            __shows__.forEach(show => {
                show && show();
            });
        } else {
            reportEvent({
                event: 'onhide',
                page: getAppName()
            })
            __hides__.forEach(hide => {
                hide && hide();
            });
        }
    });
}

export function onShow(show) {
    if (show && typeof show == 'function' && __shows__.indexOf(show) < 0) {
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