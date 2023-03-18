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
        obj = toAny(obj, {})[key];
      }
    }
  }
  return toAny(obj, defaultValue);
}