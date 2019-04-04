import vue from 'vue';
import state from './state';
import config from './config';
import 'vue-tape';

export function init(app, name) {
    // install Tape to window
    TapeInstaller.install(vue);
    // set report handler
    Tape.setReportHandler((data) => {
        // console.log(data);
    });
    // init app
    Tape.initApp({ name, app, state, config, width: 750, el: '#app', stateKey: '#vue-tape-name#' });
}