import './style'
import { create } from './services'

const _tape = {};

let _installed = false;

function setGlobal(key, value, vue) {
    if (key && value && typeof key == 'string') {
        if (tape && typeof window !== 'undefined') {
            window[key] = value;
        }
        if (vue && vue.prototype) {
            vue.prototype[key] = value;
        }
    }
}

_tape.install = function (vue, alias = 'VTape') {
    if (_installed || !vue) {
        return;
    }
    let tape = create(vue);
    setGlobal('VTape', tape, vue);
    if (alias != 'VTape') {
        setGlobal(alias, tape, vue);
    }
    _installed = true;
}

if (typeof window !== 'undefined') {
    window['VTapeInstaller'] = _tape;
}

module.exports = _tape;