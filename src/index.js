import './style'
import { create } from './services'

const _instance = {};

let _installed = false;

function setGlobal(key, value, vue) {
    if (key && value && typeof key == 'string') {
        if (typeof window !== 'undefined') {
            window[key] = value;
        }
        if (vue && vue.prototype) {
            vue.prototype[key] = value;
        }
    }
}

_instance.install = function (vue, alias = 'Tape') {
    if (_installed || !vue) {
        return;
    }
    let tape = create(vue);
    setGlobal('Tape', tape, vue);
    if (alias != 'Tape') {
        setGlobal(alias, tape, vue);
    }
    _installed = true;
}

if (typeof window !== 'undefined') {
    window['TapeInstaller'] = _instance;
}

module.exports = _instance;