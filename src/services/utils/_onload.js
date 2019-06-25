export function checkOnload(callback) {
    let _onload = function () {
        callback && callback();
    };
    let _timer;
    let _pollingDocument = function () {
        if (!!document && document.readyState == 'complete') {
            _timer && clearTimeout(_timer);
            _onload();
        } else {
            _timer = setTimeout(_pollingDocument, 1);
        }
    };
    _timer = setTimeout(_pollingDocument, 1);
}