import './style.less';
import vue from 'vue';
import config from './config';
import vue_tape from 'vue-tape';

vue.use(vue_tape);

export function init(app, name) {
    // set debug mode
    Tape.setDebug(!config.PROD);
    // init app
    Tape.initApp({
        app,
        name,
        config,
        width: 750,
        minWidth: 750,
        remUnit: 100,
        el: '#app'
    });
}