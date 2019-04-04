export function addHook(target, methodName, hook, upsert = false) {
    if (!target) {
        return;
    }
    let method = target[methodName];
    if (!method && !upsert) {
        return;
    }
    if (method) {
        // bind original method to target
        method = method.bind(target);
    }
    Object.defineProperty(target, methodName, {
        value: (...params) => hook(target, methodName, method, ...params),
        enumerable: true,
        writable: true,
        configurable: true,
    });
}