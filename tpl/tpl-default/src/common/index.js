import vue from 'vue';
import state from './state';
import config from './config';
import 'vue-tape';

export function init(page, name) {
    // install Tape to window
    TapeInstaller.install(vue);
    // init page
    Tape.initPage({ name, page, state, config, width: 750, stateKey: '#vue-tape-name#' });
}