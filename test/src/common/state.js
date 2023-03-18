
import vueTape from '../../../src/services';

export function commitState(state) {
  Object.keys(state).forEach((key) => {
    vueTape.state.set(key, state[key]);
  })
}

export function readState(key, def) {
  return vueTape.state.get(key, def);
}

export default {
  state: "state-value"
}
