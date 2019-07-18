function _getStyle(el, attr) {
    try {
        return el.currentStyle ? el.currentStyle[attr] : getComputedStyle(el, false)[attr];
    } catch (error) {
    }
}

function _getScroll(element) {
    let scrollTop = 0;
    let scrollLeft = 0;
    try {
        if (element && _getStyle(element, 'position') != 'fixed') {
            let next = () => {
                element = element.parentElement || element.offsetParent;
                return element && _getStyle(element, 'position') != 'fixed';
            }
            while (next()) {
                scrollTop += -(element.scrollTop || 0);
                scrollLeft += - (element.scrollLeft || 0);
            }
        }
    } catch (error) {
    }
    return { scrollTop, scrollLeft };
}

function _getElement(el) {
    if (typeof el === 'string') {
        try {
            el = document.documentElement.querySelector(el);
        } catch (error) {
        }
    }
    return el;
}

export function getPosition(el) {
    let element = _getElement(el);
    if (arguments.length != 1 || element == null) {
        return null;
    }
    let scrollTop = 0;
    let scrollLeft = 0;
    let offsetTop = 0;
    let offsetLeft = 0;
    let offsetWidth = 0;
    let offsetHeight = 0;
    try {
        let scroll = _getScroll(element);
        scrollTop = scroll.scrollTop || 0;
        scrollLeft = scroll.scrollLeft || 0;
        offsetTop = element.offsetTop || 0;
        offsetLeft = element.offsetLeft || 0;
        offsetWidth = element.offsetWidth || element.clientWidth || 0;
        offsetHeight = element.offsetHeight || element.clientHeight || 0;
        while (element = element.offsetParent || element.parentNote || element.parentElement) {
            offsetTop += element.offsetTop;
            offsetLeft += element.offsetLeft;
        }
    } catch (error) {
    }
    return {
        top: offsetTop + scrollTop,
        left: offsetLeft + scrollLeft,
        width: offsetWidth,
        height: offsetHeight,
    }
}