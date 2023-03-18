import { toAny } from "./_toany";
import { onAttachEvent } from "./_event";

let _inited = false;
let _callbacks = [];

function _handleChanged(msg) {
  if (msg && msg.data) {
    let message = toAny(msg.data, {});
    _callbacks.forEach(callback => {
      callback && callback(message);
    });
  }
}

function _initMessage() {
  if (_inited) {
    return;
  }
  _inited = true;
  onAttachEvent(window, 'message', _handleChanged);
}

export function offWindowMessage(callback) {
  let indexOf = _callbacks.indexOf(callback);
  if (indexOf >= 0) {
    _callbacks.splice(indexOf, 1);
  }
}

export function onWindowMessage(callback) {
  _initMessage();
  if (callback && typeof callback == 'function' && _callbacks.indexOf(callback) < 0) {
    _callbacks.push(callback);
  }
}

export function postMessageToParent(data = {}) {
  try {
    window.parent.postMessage(toAny(data, {}), '*');
  } catch (error) {
  }
}