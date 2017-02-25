// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import verseIndex from './verseIndex';
import result from './result';
import playback from './playback';

const rootReducer = combineReducers({
  verseIndex,
  playback,
  result,
  routing
});

export default rootReducer;
