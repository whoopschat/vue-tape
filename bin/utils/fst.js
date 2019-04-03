const fs = require('fs');
const path = require('path');
const func = require('./func');

function _mkdirsSync(dirname, mode) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (_mkdirsSync(path.dirname(dirname), mode)) {
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
    return false;
}

function _listSync(src) {
    let entrysList = [];
    const fetchFile = (file) => {
        if (!fs.existsSync(file)) {
            return;
        }
        let fileStat = fs.statSync(file);
        if (fileStat.isDirectory()) {
            const fileList = fs.readdirSync(file);
            if (!fileList.length) {
                return;
            }
            fileList.forEach(item => {
                fetchFile(path.join(file, `./${item}`))
            })
        } else {
            entrysList.push(path.relative(src, file));
        }
    }
    fetchFile(src);
    return entrysList;
}


function _copySync(src, dst, filter, options) {
    let content = fs.readFileSync(src, 'utf-8');
    if (filter && filter(src)) {
        Object.keys(options).forEach(key => {
            if (key != options[key]) {
                content = func.stringReplaceAll(content, key, options[key]);
            }
        });
    }
    fs.writeFileSync(dst, content);
}

function copyDirSync(src, dst, filter, options) {
    if (emptySync(src)) {
        return;
    }
    _mkdirsSync(dst);
    _listSync(src).forEach(file => {
        _copySync(path.join(src, file), path.join(dst, file), filter, options);
    })
}

function existsSync(file) {
    return fs.existsSync(file);
}

function emptySync(dir) {
    if (!fs.existsSync(dir)) {
        return true;
    }
    let fileStat = fs.statSync(dir);
    if (fileStat.isDirectory()) {
        const fileList = fs.readdirSync(dir);
        if (!fileList.length) {
            return true;
        }
    }
    return false;
}

module.exports = {
    emptySync,
    existsSync,
    copyDirSync,
}