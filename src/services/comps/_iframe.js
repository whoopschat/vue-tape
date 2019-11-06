import { createHtmlComponent } from "./_component";

let _inited = false;
let _showIframe = null;
let _hideIframe = null;

function _initIframe() {
    if (_inited) {
        return;
    }
    _inited = true;
    const comp = createHtmlComponent('', { num: 0 });
    const instance = new comp();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    _showIframe = (url = '', sandbox = '') => {
        instance.html = `<iframe src="${url}" 
        sandbox="${sandbox}" 
        frameborder="0" 
        width="100%" 
        height="100%" 
        scrolling="no" 
        class="--vue-tape-iframe"/>`;
    }
    _hideIframe = () => {
        instance.html = '';
    }
}

export function showIframe(url = '', sandbox = 'allow-same-origin allow-scripts') {
    _initIframe();
    _showIframe && _showIframe(url, sandbox);
}

export function hideIframe() {
    _hideIframe && _hideIframe();
}