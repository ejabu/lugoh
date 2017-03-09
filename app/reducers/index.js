// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import verseIndex from './verseIndex';
import result from './result';
import playback from './playback';
import {note, filter} from './note';

const rootReducer = combineReducers({
  verseIndex,
  note,
  filter,
  playback,
  result,
  routing
});

export default rootReducer;
