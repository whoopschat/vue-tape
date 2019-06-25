import { randomGUID } from "./_random";

let __bindings__ = {};

export function createBindingId(key, el) {
    try {
        if (el) {
            let id = el.getAttribute(`bind-${key}-id`);
            if (!id) {
                id = randomGUID();
                el.setAttribute(`bind-${key}-id`, id);
            }
            return id;
        }
    } catch (error) {
    }
}

export function removeBinding(key, el) {
    let binds = __bindings__[key];
    if (binds) {
        let id = createBindingId(key, el);
        if (id) {
            delete binds[id];
        }
    }
}

export function getBinding(key, el) {
    let binds = __bindings__[key];
    if (!binds) {
        binds = __bindings__[key] = {};
    }
    let id = createBindingId(key, el);
    if (id) {
        return binds[id];
    }
}

export function setBinding(key, el, binding) {
    let binds = __bindings__[key];
    if (!binds) {
        binds = __bindings__[key] = {};
    }
    let id = createBindingId(key, el);
    if (id) {
        binds[id] = binding;
    }
}