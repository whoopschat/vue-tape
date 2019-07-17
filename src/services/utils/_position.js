function _getScroll(element) {
    let scrollTop = 0;
    let scrollLeft = 0;
    try {
        while (element = element.parentElement) {
            scrollTop += -(element.scrollTop || 0);
            scrollLeft += - (element.scrollLeft || 0);
        }
    } catch (error) {
    }
    return {
        scrollTop,
        scrollLeft
    };
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
        offsetWidth = element.offsetWidth || 0;
        offsetHeight = element.offsetHeight || 0;
        while (element = element.offsetParent) {
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