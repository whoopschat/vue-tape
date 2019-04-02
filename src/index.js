import './style'
import { create } from './services'

const _tape = {};

let _installed = false;

_tape.install = function (vue) {
    if (_installed || !vue) {
        return;
    }
    let tape = create(vue);
    if (tape && typeof window !== 'undefined') {
        window['Tape'] = tape;
    }
    vue.prototype['Tape'] = tape;
    _installed = true;
}

if (typeof window !== 'undefined') {
    window['TapeInstaller'] = _tape;
}

module.exports = _tape;