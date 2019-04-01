import { getVue, setKey } from './_vue';
import { pixelToRem } from './_rempixel';
import { setConfig } from './_config';
import { initState } from './_vuex';

export function init({ app, state, config, width = 750, }, stateKey) {
    let vue = getVue();
    vue.config.productionTip = false;
    setKey(stateKey || 'default');
    setConfig(config);
    pixelToRem(width);
    initState(state);
    new vue({
        el: '#app',
        render: h => h(app),
    });
}