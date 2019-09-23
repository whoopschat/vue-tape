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
let _type = _arg(0, 'default');

let tpl = '';
let dir = './';
if (_type == 'page') {
    tpl = 'page';
    dir = `./src/pages/${_arg(1, 'home')}`
} else if (_type == 'init') {
    tpl = 'default';
    dir = `./${_arg(1, '')}`
} else {
    console.log('Usage: vue-tape [options]');
    console.log("       init  -  create vue-tape template project");
    console.log("       page  -  create vue-tape template page");
    console.log('');
    return;
}

let template = path.join(cwd, `./tpl/tpl-${tpl}`);
if (!fst.existsSync(template)) {
    console.log(`Failure : template "${tpl}" not found`);
    console.log('');
    return;
}

let output = path.join(_cwd, dir);

if (!fst.emptySync(output)) {
    console.log(`Failure : directory "${output}" is not empty, ignore`);
    console.log('');
    return;
}

let page_path = _arg(1, 'default').split('/').filter((_, i) => i > 0).map(() => "../");

let replaceOpts = {
    '#vue-tape-version#': version,
    '#vue-tape-name#': path.basename(_cwd) || 'vue-tape-project',
    '#vue-tape-page#': _arg(1, 'default'),
    '#vue-tape-page-path#': page_path.join(''),
}

fst.copyDirSync(template, output, (item) => {
    let ext = path.extname(item);
    return ext == '.vue' || ext == '.html' || ext == '.js' || ext == '.json' || ext == '.txt' || ext == '.md' || ext == '.less';
}, (dst) => dst.replace('npmignore', 'gitignore'), replaceOpts);

console.log(`Success : ${output}`);
console.log('');



