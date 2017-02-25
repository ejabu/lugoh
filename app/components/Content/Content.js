// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Content.css';

import keymap from './keymap'
import { ShortcutManager } from 'react-shortcuts'

const shortcutManager = new ShortcutManager(keymap)
import { Shortcuts } from 'react-shortcuts'

import { toPlay, toStop } from '../../actions/playback';

@connect(state => ({ playback: state.playback}),)
export default class Content extends Component {


  static childContextTypes = {
    shortcuts: React.PropTypes.object.isRequired
  }

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

  _handleShortcuts = (action, event) => {
    console.log('action');
    console.log(action);
    const { dispatch } = this.props;
    console.log(event);
      switch (action) {
        case 'MOVE_LEFT':
          console.log('moving left')
          toPlay(dispatch)
          break
        case 'MOVE_RIGHT':
          toStop(dispatch)
          console.log('moving right')
          break
        case 'MOVE_UP':
          console.log('moving up')
          break
        case 'COPY':
          console.log('copying stuff')
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
              </Shortcuts>
      </div>
    );
  }
}
