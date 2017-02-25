// @flow
import { PLAY } from '../actions/playback';

export default function playback(state: 'STOP', action: Object) {
  switch (action.type) {
    case PLAY:
      return action.type
    default:
      return 'STOP'
  }
}
