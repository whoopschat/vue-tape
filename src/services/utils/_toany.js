function _inferType(value) {
  if (typeof value !== 'string') {
    return typeof value;
  }
  try {
    const parsed = JSON.parse(value);
    return typeof parsed;
  } catch (ex) {
    // might be a pure number
    const number = parseFloat(value);
    if (!isNaN(number) && `${number}` === value) {
      return 'number';
    }
    return 'string';
  }
}

function _toBoolean_(value) {
  return !!value && value != 'false' && value != '0';
}

function _toNumber_(value) {
  if (typeof value === 'number') {
    return value;
  }
  return Number(value);
}

function _toObject_(value) {
  if (typeof value === 'object') {
    return value;
  }
  let p = JSON.parse(value);
  if (typeof p === 'object') {
    return p;
  }
}

function _toString_(value) {
  let type = typeof value;
  if (type === 'string') {
    return value;
  } else if (type === 'boolean') {
    return value ? 'true' : 'false';
  } else if (type === 'number') {
    return `${value}`;
  } else if (type === 'object') {
    return JSON.stringify(value);
  }
}

export function toAny(value, defaultValue) {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  // try to infer type and return
  let type = _inferType(value);
  if (defaultValue !== undefined && defaultValue !== null) {
    type = typeof defaultValue;
  }
  try {
    switch (type) {
      case 'boolean':
        value = _toBoolean_(value);
        break;
      case 'number':
        value = _toNumber_(value);
        break;
      case 'object':
        value = _toObject_(value);
        break;
      case 'string':
        value = _toString_(value);
        break;
      default:
        break;
    }
  } catch (error) {
  }
  if (value === undefined || value === null || typeof value != type) {
    return defaultValue;
  }
  return value;
}