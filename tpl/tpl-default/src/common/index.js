import vue from 'vue';
import state from './state';
import config from './config';
import 'vue-tape';

export function initPage(page) {
    // install VTape to window
    VTapeInstaller.install(vue);
    // init page
    VTape.initPage({ page, state, config, width: 750, stateKey: '#vue-tape-name#' });
}