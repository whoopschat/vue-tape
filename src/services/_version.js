let _page = '';

export function getVersion() {
    return '${lib_version}';
}

export function setPageName(page) {
    _page = page;
}

export function getPageName() {
    return _page;
}