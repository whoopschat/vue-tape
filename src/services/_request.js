import { isDebug } from "./_debug";
import { setCache, getCache } from "./_cache";

function _parseQuery(path) {
  let url = '';
  let params = {};
  if (!path || typeof path !== 'string') {
    return { url, params }
  }
  let queryString = '';
  let indexA = path.indexOf('?');
  if (indexA >= 0) {
    url = path.substring(0, indexA);
    queryString = path.substring(indexA + 1, path.length);
  } else {
    url = path;
    queryString = '';
  }
  queryString.split('&').map(item => {
    let arr = item.split('=');
    if (arr.length > 1) {
      params[arr[0]] = decodeURIComponent(arr[1]);
    }
  });
  return { url, params };
}

function _queryString(path, data) {
  let { url, params } = _parseQuery(path);
  Object.assign(params, data);
  const queryString = Object.keys(params).map(key => {
    const value = params[key];
    return `${key}=${encodeURIComponent(value)}`;
  }).join('&');
  return `${url}?${queryString}`;
}

const _xhrRequest = (options) => {
  var method = options['method'] || 'GET';
  var url = options['url'] || '';
  var header = options['header'] || {};
  var data = options['data'] || {};
  var json = options['json'] || false;
  var req = new XMLHttpRequest();
  var requestId = Date.now().toString(36);
  req.timeout = Math.min(1000, options['timeout'] || 5000);
  if (method.toUpperCase() == 'GET') {
    url = _queryString(url, data);
  }
  req.open(method.toUpperCase(), url, true);
  if (header) {
    for (var k in header) {
      req.setRequestHeader(k, header[k]);
    }
  }
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      var header = req.getAllResponseHeaders();
      var headers = {};
      if (header) {
        var hs = header.split('\n');
        hs.forEach(element => {
          if (element) {
            var vs = element.split(': ');
            if (vs.length > 1) {
              headers[vs[0]] = vs[1];
            }
          }
        });
      }
      if (req.status >= 200 && req.status < 300) {
        var res = { errMsg: 'request:ok' }
        try {
          var data = JSON.parse(req.response);
          res.data = data;
        } catch (error) {
          res.data = req.response;
        }
        res.header = headers;
        res.statusCode = req.status;
        res.requestId = requestId;
        options.success && options.success(res);
      } else {
        options.fail && options.fail({
          errMsg: 'request:fail',
          data: req.response,
          header: headers,
          requestId,
        });
      }
    }
  }
  if (json) {
    req.send(JSON.stringify(data));
  } else {
    var formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
    req.send(formData);
  }
  return req;
}

function _realRequest(options, key) {
  return new Promise((resolve, reject) => {
    _xhrRequest(Object.assign({}, options, {
      success: resolve,
      fail: reject
    }));
  }).catch(res => {
    isDebug() && console.log(res.errMsg, res);
    throw res;
  }).then(res => {
    isDebug() && console.log(res.errMsg, res);
    setCache(key, res);
    return res;
  });
}

export function request(options) {
  let key = JSON.stringify(options);
  let cache = +(options.cache);
  if (cache > 0) {
    return getCache(key, cache).then(res => {
      Object.assign(res, { errMsg: 'request:cache' })
      isDebug() && console.log(res.errMsg, res);
      return res;
    }).catch(() => {
      return _realRequest(options, key);
    })
  } else {
    return _realRequest(options, key)
  }
}