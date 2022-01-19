let remSize = 14;

function _setFontSize(size) {
    const docEl = document.documentElement;
    docEl.style.fontSize = size + 'px';
    remSize = size;
}

export function remToPixel(rem) {
    return remSize * rem;
}

export function _pixelToRem(remWidth = 750, maxWidth = 750, minWidth = 350, remUnit = 100) {
    const docEl = document.documentElement;
    const dpr = window.devicePixelRatio || 1;
    // adjust body font size
    function setBodyFontSize() {
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px';
        }
        else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize);
        }
    }
    setBodyFontSize();
    // set 1rem = viewWidth / 10
    function setRemUnit() {
        let clientWidth = docEl.clientWidth;
        let rem = Math.max(Math.min(clientWidth, maxWidth), minWidth) / (remWidth / remUnit);
        _setFontSize(rem);
        const defaultFontSize = parseFloat(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size'));
        if (defaultFontSize !== rem) {
            if (defaultFontSize < rem) {
                _setFontSize((rem + (rem - defaultFontSize)))
            }
            else {
                _setFontSize((rem - (defaultFontSize - rem)))
            }
        }
    }
    setRemUnit();
    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit);
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit();
        }
    });
    // detect 0.5px supports
    if (dpr >= 2) {
        const fakeBody = document.createElement('body');
        const testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines');
        }
        docEl.removeChild(fakeBody);
    }
}