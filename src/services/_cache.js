import { encodeBase64 } from "./_base64";
import { setStorage, getStorage } from "./_storage";

function _createKey(key) {
    return `cache_${encodeBase64(key)}`;
}

export function getCache(key, expires) {
    let { time = 0, data } = getStorage(_createKey(key), {});
    if (data && (!expires || Math.abs(Date.now() - time) <= expires)) {
        return Promise.resolve(data);
    }
    return Promise.reject('not cache');
}

export function setCache(key, data) {
    setStorage(_createKey(key), {
        data: data,
        time: Date.now()
    });
}