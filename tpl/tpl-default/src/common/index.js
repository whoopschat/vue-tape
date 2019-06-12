import './style.less';
import vue from 'vue';
import config from './config';
import 'vue-tape';

export function init(app, name) {
    // install Tape to window
    TapeInstaller.install(vue);
    // set debug mode
    Tape.setDebug(!config.PROD);
    // set report handler
    Tape.setReportHandler((eventData) => {
        // handle your report
    });
    // init app
    Tape.initApp({
        app,
        name,
        config,
        width: 750,
        unit: 100,
        el: '#app'
    });
}