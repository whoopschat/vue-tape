export function onAttachEvent(elem, event, fn) {
  if (elem.addEventListener != null) {
    return elem.addEventListener(event, fn, false);
  } else if (elem.attachEvent != null) {
    return elem.attachEvent("on" + event, fn);
  } else {
    return elem[event] = fn;
  }
}

export function offAttachEvent(elem, event, fn) {
  if (elem.removeEventListener != null) {
    return elem.removeEventListener(event, fn, false);
  } else if (elem.detachEvent != null) {
    return elem.detachEvent("on" + event, fn);
  } else {
    delete elem[event];
  }
}