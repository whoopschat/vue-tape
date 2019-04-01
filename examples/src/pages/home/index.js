import './index.css';
import vue from 'vue';
import app from './index.vue';
import state from '../state';
import config from '../config';
import vtape from 'vue-tape';

vue.use(vtape);

Tape.init({ app, state, config, width: 750 }, 'home');
