export function _pixelToRem(maxWidth = 750, remUnit = 100) {
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
        const rem = Math.min(maxWidth, clientWidth) / (maxWidth / remUnit);
        docEl.style.fontSize = rem + 'px';
        const defaultFontSize = parseFloat(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size'));
        if (defaultFontSize !== rem) {
            if (defaultFontSize < rem) {
                docEl.style.fontSize = (rem + (rem - defaultFontSize)) + 'px';
            }
            else {
                docEl.style.fontSize = (rem - (defaultFontSize - rem)) + 'px';
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