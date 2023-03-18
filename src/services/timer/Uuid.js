let _gid = 0;
let _tid = 0;

export function getGID() {
    return _gid++;
}

export function getTID() {
    return (_tid++) * 100000;
}