// @flow
export const PLAY = 'PLAY';
export const STOP = 'STOP';

function play() {
  return {
    type: PLAY,
  };
}
export function toPlay(dispatch) {
  dispatch(play());
}
function stop() {
  return {
    type: STOP,
  };
}
export function toStop(dispatch) {
  dispatch(stop());
}
