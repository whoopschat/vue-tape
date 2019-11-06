import localForage from "localforage";

export function setStorage(key, value) {
    return localForage.setItem(`tape_data_${key}`, value);
}

export function getStorage(key) {
    return localForage.getItem(`tape_data_${key}`);
}

export function removeStorage(key) {
    return localForage.removeItem(`tape_data_${key}`);
}