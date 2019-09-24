import { getUserId } from '../_user';

export function setStorage(key, value) {
    localStorage.setItem(`storage_data_${getUserId()}${key}`, JSON.stringify(value));
}

export function getStorage(key, value) {
    let data = localStorage.getItem(`storage_data_${getUserId()}${key}`);
    if (data) {
        try {
            return JSON.parse(data);
        } catch (error) {
        }
    }
    return value;
}