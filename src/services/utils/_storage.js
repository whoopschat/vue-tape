import { encodeBase64, decodeBase64 } from './_base64'
import { getUserId } from '../_user';

export function setStorage(key, value) {
    localStorage.setItem(`storage_data_${getUserId()}${key}`, encodeBase64(JSON.stringify(value)));
}

export function getStorage(key, value) {
    let data = localStorage.getItem(`storage_data_${getUserId()}${key}`);
    if (data) {
        try {
            return JSON.parse(decodeBase64(data));
        } catch (error) {
        }
    }
    return value;
}