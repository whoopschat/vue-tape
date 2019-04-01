import { encodeBase64, decodeBase64 } from './_base64'

export function setStorage(key, value) {
    localStorage.setItem(`storage_data_${key}`, encodeBase64(JSON.stringify(value)));
}

export function getStorage(key, value) {
    let data = localStorage.getItem(`storage_data_${key}`);
    if (data) {
        try {
            return JSON.parse(decodeBase64(data));
        } catch (error) {
        }
    }
    return value;
}

export function checkStorage(key, value) {
    let data = localStorage.getItem(`storage_data_${key}`);
    if (value) {
        return data && data == encodeBase64(JSON.stringify(value));
    } else {
        return !!data;
    }
}