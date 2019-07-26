function _loadJS(js, cb) {
    try {
        var _protocol = location.protocol != 'file:' ? location.protocol : 'http:';
        var _script = document.createElement("script");
        _script.type = "text/javascript";
        if (js.indexOf('//') == 0) {
            _script.src = _protocol + js;
        } else {
            _script.src = js;
        }
        document.body.appendChild(_script);
        _script.onload = function () {
            cb && cb();
        }
    } catch (error) {
        cb && cb();
    }
}

export function loadJs(js, cb) {
    if (!js) {
        return cb && cb();
    }
    var index = 0;
    var list = js.split(',');
    list.forEach(function (js) {
        _loadJS(js, function () {
            index++;
            if (index == list.length) {
                cb && cb();
            }
        })
    });
}