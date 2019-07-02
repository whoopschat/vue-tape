function _loadJS(js, cb) {
    var _script = document.createElement("script");
    _script.type = "text/javascript";
    var rev = Math.floor(Date.now() / (60 * 1000)).toString(36);
    if (js.indexOf("?") >= 0) {
        _script.src = `${js}&x_rev=${rev}`;
    } else {
        _script.src = `${js}?x_rev=${rev}`;
    }
    document.body.appendChild(_script);
    _script.onload = function () {
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