import { get } from "./_get";

export function join(host, path, split = "/") {
  let hosts = `${host}`.split(split);
  let bases = hosts.filter((item, index) => {
    return !!item && index != hosts.length - 1;
  });
  let paths = `${path}`.split(split).filter(item => {
    return !!item && item != "."
  });
  let newPaths = [];
  let nextDiscard = false;
  [...bases, ...paths].forEach((item) => {
    if (item == "..") {
      nextDiscard = true;
    } else if (nextDiscard) {
      nextDiscard = false;
    } else {
      newPaths.push(item);
    }
  })
  return newPaths.join(split)
}

export function stringifyQuery(query) {
  return Object.keys(query).map(key => {
    const value = query[key];
    return `${key}=${encodeURIComponent(value)}`;
  }).join('&');
}

export function decodeQuery(query) {
  return Object.keys(query).reduce((result, key) => {
    const value = query[key];
    result[key] = decodeURIComponent(value);
    return result;
  }, {});
}

export function parseQueryParams(path) {
  let url = '';
  let params = {};
  if (!path || typeof path !== 'string') {
    return { url, params }
  }
  let queryString = '';
  let routeString = '';
  let indexE = path.indexOf('?');
  let indexW = path.indexOf('#');
  let indexQ = path.indexOf('=');
  if (indexE >= 0) {
    url = path.substring(0, indexE);
    queryString = path.substring(indexE + 1, indexW > 0 ? indexW : path.length);
  } else if (indexQ >= 0) {
    url = '';
    queryString = path;
  } else {
    url = path;
    queryString = '';
  }
  if (indexW >= 0) {
    routeString = path.substring(indexW + 1, path.length)
  }
  queryString.split('&').map(item => {
    let index = item.indexOf("=");
    if (index > 0) {
      let key = item.substring(0, index);
      let value = item.substring(index + 1);
      params[key] = decodeURIComponent(value);
    }
  });
  try {
    // route string params
    if (routeString.indexOf('?') >= 0) {
      routeString.split('?').pop().split('&').map(item => {
        let index = item.indexOf("=");
        if (index > 0) {
          let key = item.substring(0, index);
          let value = item.substring(index + 1);
          params[key] = decodeURIComponent(value);
        }
      });
    }
  } catch (error) {
  }
  return { url, params };
}

export function appendQueryParams(path, query = {}) {
  const { url, params } = parseQueryParams(path);
  Object.keys(query).forEach(key => {
    let value = query[key];
    if (value !== undefined && value !== null) {
      params[key] = value;
    } else {
      delete params[key];
    }
  });
  const queryString = Object.keys(params).map(key => {
    const value = params[key];
    return `${key}=${encodeURIComponent(value)}`;
  }).join('&');;
  if (!url) {
    return queryString;
  }
  if (!queryString) {
    return url;
  }
  return `${url}?${queryString}`;
}

export function getQueryString(key, def) {
  let params = {};
  try {
    if (typeof window != "undefined") {
      params = parseQueryParams(window.location.href).params;
    }
  } catch (error) {
  }
  return get(params, key, def);
}

export function genUrl(path, querys = {}, append = false, appendProtocol = true) {
  if (typeof window != "undefined" && path) {
    if (window.location && appendProtocol) {
      let index = path.indexOf('//')
      if (index === 0) {
        path = window.location.protocol + path;
      } else if (index === -1) {
        path = window.location.protocol + '//' + window.location.host + "/" + join(window.location.pathname, path);
      }
    }
    let { url, params } = parseQueryParams(path);
    if (append) {
      return appendQueryParams(url, Object.assign({}, params, querys || {}));
    } else {
      return appendQueryParams(url, Object.assign({}, querys || {}));
    }
  }
  return path;
}