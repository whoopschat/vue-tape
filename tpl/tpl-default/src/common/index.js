import vue from 'vue';
import state from './state';
import config from './config';
import 'vue-tape';

export function init(app, name) {
    // install Tape to window
    TapeInstaller.install(vue);
    // set debug mode
    Tape.setDebug(process.env.CONF_ENV != 'prod');
    // set report handler
    Tape.setReportHandler((eventData) => {
        // handle your report
    });
    // init app
    Tape.initApp({
        name,
        app,
        state,
        config,
        width: 750,
        el: '#app',
        stateKey: 'abc'
    });
}