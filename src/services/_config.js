let confs = {};

export function _initConfig(config) {
    Object.assign(confs, config || {})
}

export function getConfig(key, def) {
    let instant = confs;
    if (key) {
        let keys = key.split('.');
        while (keys.length > 0) {
            instant = instant[keys.shift()];
        }
    }
    return instant || def;
}