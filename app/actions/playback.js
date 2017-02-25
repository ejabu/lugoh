// @flow
export const PLAY = 'PLAY';
export const STOP = 'STOP';

function play() {
  console.log('playy');
  return {
    type: PLAY,
  };
}
export function toPlay(dispatch) {
  dispatch(play());
}
function stop() {
  console.log('stopy');
  return {
    type: STOP,
  };
}
export function toStop(dispatch) {
  dispatch(stop());
}
