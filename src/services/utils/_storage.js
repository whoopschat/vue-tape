import { toAny } from './_toany';

export function setStorage(key, value) {
    localStorage.setItem(`tape_data_${key}`, toAny(value, ""));
}

export function getStorage(key, def) {
    let data = localStorage.getItem(`tape_data_${key}`);
    return toAny(data, def);
}