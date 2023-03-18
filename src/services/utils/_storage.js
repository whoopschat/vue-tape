import { toAny } from './_toany';

export function removeLocalStorage(key) {
  localStorage.removeItem(`${key}`);
}

export function setLocalStorage(key, value) {
  if (value === undefined || value === null) {
    localStorage.removeItem(`${key}`)
    return;
  }
  localStorage.setItem(`${key}`, toAny(value, ""));
}

export function getLocalStorage(key, def) {
  let data = localStorage.getItem(`${key}`);
  return toAny(data, def);
}