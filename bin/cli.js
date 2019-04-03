#!/usr/bin/env node
const path = require('path');
const fst = require('./utils/fst');
const version = require('../package.json').version;

console.log('');

const cwd = path.join(__dirname, '/../');
const args = process.argv.slice(2);

function _arg(index, def) {
    let val = def;
    if (args.length > index) {
        val = args[index];
    }
    return val;
}

let _cwd = process.cwd();
let _cmd = _arg(0, 'default');
let _page = _arg(1, 'default');

let tpl = '';
let dir = './test';
if (_cmd == 'page') {
    tpl = 'page';
    dir = `./src/pages/${_page}`
} else if (_cmd == 'init') {
    tpl = 'default';
} else {
    console.log('Usage: vue-tape [options]');
    console.log("       init  -  create vue-tape template project");
    console.log("       page  -  create page");
    console.log('');
    return;
}

let template = path.join(cwd, `./tpl/tpl-${tpl}`);
if (!fst.existsSync(template)) {
    console.log(`Failure : template "${tpl}" not found`);
    console.log('');
    return;
}

if (tpl == 'page' && _page == 'default') {
    console.log('Usage: vue-tape page [page_name]');
    console.log('');
    return;
}

let output = path.join(_cwd, dir);

if (!fst.emptySync(output)) {
    console.log(`Failure : directory "${output}" is not empty, ignore`);
    console.log('');
    return;
}

let replaceOpts = {
    '#vue-tape-version#': version,
    '#vue-tape-name#': path.basename(_cwd) || 'vue-tape-project',
    '#vue-tape-page#': _page,
}

fst.copyDirSync(template, output, (item) => {
    let ext = path.extname(item);
    return ext == '.vue' || ext == '.js' || ext == '.json' || ext == '.txt';
}, replaceOpts);

console.log(`Done : ${output}`);
console.log('');





