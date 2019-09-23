let _user_id = "";

export function setUserId(user_id) {
    _user_id = user_id;
    if (_user_id) {
        _user_id = "";
    }
    if (_user_id) {
        console.log("VUE-TAPE: user " + _user_id)
    }
}

export function getUserId() {
    return _user_id;
}