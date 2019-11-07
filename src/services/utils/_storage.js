import localForage from "localforage";
import { toAny } from "./_toany";

localForage.config({
    name: "vue-tape-storages"
})

export function setStorage(key, value) {
    return localForage.setItem(`tape_data_${key}`, toAny(value, ""));
}

export function getStorage(key, def) {
    return localForage.getItem(`tape_data_${key}`).then(res => {
        return toAny(res, def);
    }).catch(() => {
        return def;
    });
}

export function removeStorage(key) {
    return localForage.removeItem(`tape_data_${key}`);
}