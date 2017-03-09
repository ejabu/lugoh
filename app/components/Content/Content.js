// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Content.css';
import Note from '../Note/Note';

import keymap from './keymap'
import { ShortcutManager, Shortcuts } from 'react-shortcuts'

const shortcutManager = new ShortcutManager(keymap)

import { toPlay, toStop } from '../../actions/playback';
import { nextRow, prevRow } from '../../actions/note';

@connect(state => ({ playback: state.playback, note: state.note, selected: state.selected}),)
export default class Content extends Component {




  constructor(props) {
    super(props);
    this.state = {
      "source": ""
    };
    console.log('keymap');
    console.log(keymap);
    console.log(shortcutManager);
  }

  getChildContext() {
      return { shortcuts: shortcutManager }
  }
  static childContextTypes = {
    shortcuts: React.PropTypes.object.isRequired
  }
  _handleShortcuts = (action, event) => {
    const { dispatch, note, selected } = this.props;
      switch (action) {
        case 'PREV_ROW':

          prevRow(dispatch,selected, )

          break
        case 'NEXT_ROW':
          nextRow(dispatch, note, selected, )
          break
        case 'MOVE_LEFT':
          toPlay(dispatch)
          break
        case 'MOVE_RIGHT':
          toStop(dispatch)
          break
        case 'MOVE_UP':
          break
        case 'COPY':
          break
      }
    }
  render() {
    return (
      <div className={styles.transWrapper}>
        hehe
        <Shortcuts
                name = 'App'
                handler = {this._handleShortcuts}
              >
                <div>Make something amazing today</div>
                <Note/>
              </Shortcuts>
      </div>
    );
  }
}
