import { toAny } from "./_toany";

export function get(object, path, defaultValue) {
  let obj = object;
  if (path) {
    if (typeof path === 'string') {
      const reg = /[^\[\].]+/g
      path = path.match(reg);
    }
    if (path instanceof Array) {
      for (const key of path) {
        if (!obj) {
          return defaultValue;
        }
        if (typeof obj === 'object') {
          obj = obj[key];
        } else {
          obj = undefined;
        }
      }
    }
  }
  return toAny(obj, defaultValue);
}