/* eslint-disable no-unused-vars */
// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Resizable from 'react-resizable-box';

import styles from './Home.css';
import Submenu from './Submenu/Submenu';
import Result from './Result/Result';
import * as CounterActions from '../actions/counter';
import Content from './Content/Content';


import keymap from './keymap'
import { ShortcutManager, Shortcuts } from 'react-shortcuts'

const shortcutManager = new ShortcutManager(keymap)

import { toPlay, toStop } from '../actions/playback';

@connect(
  state => ({
    result: state.result }),
  )
export default class Home extends Component {
  // KALAU INI GAK DI COMMENT, NAV BAR HARUS CONNECT LAGI. KALAU DI
  // COMMENT, tinggal pas {...this.props}
  // static propTypes = {
  //   counter: React.PropTypes.number.isRequired,
  // }

  constructor(props) {
    super(props);
    this.state = {
      width: '220px',
      query: '',
    };
  }

  searchCallback = (query) => {
    var toSet2 = { query:  query }
    this.setState(toSet2);
  }

  getChildContext() {
      return { shortcuts: shortcutManager }
  }
  static childContextTypes = {
    shortcuts: React.PropTypes.object.isRequired
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
    var submenuStyle = {
      // background: "#eee",
      display: "inline-block",
      // background: "#fff",//backgroundsubmenu
      background: "#fafafa",//backgroundsubmenu
      height: "100vh",
      width: "100%",
      borderRight: "1px solid rgba(0,0,0,.07)",

    };
    var submenuDraggableStyle = {
      display: "inline-block",
      zIndex:"9",
    };
    var mainContentStyle = {
      // background: "#eee",
      background: "#fff",
      // border: "3px solid black",
      display: "inline-block",
      position: "absolute",
      top:"0px",
      left:this.state.width,
      right:"0px",
      bottom:"0px",
      zIndex:"5",
      overflowY:"auto",

    };
    var handleStyle = {
      right: {
        position: 'absolute',
        width: '30px',
        height: '100%',
        top: '50px',
        right: '-30px',
        cursor: 'ew-resize'
      },
    }

    var onResizeStopEja = function(direction, styleSize, clientSize, delta){
      var toSet = { width: 'calc('+this.state.width+' - '+delta.width+'px )' }
      var width_awal = 320;
      var width_akhir = styleSize.width;
      var delta = width_awal - width_akhir
      var toSet2 = { width:  styleSize.width+ 'px' }
      this.setState(toSet2);
    }
    var isResizableDict = {top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}
    return (
      <div className={styles.container}>
        <Shortcuts
          name = 'App'
          handler = {this._handleShortcuts}>


          <Resizable
          customClass="submenu"
          width={220}
          height={"100%"}
          minWidth={160}
          minHeight={160}
          maxWidth={480}
          maxHeight={480}
          isResizable={ isResizableDict }
          handleStyle = {handleStyle}
          customStyle={submenuDraggableStyle}
          onResizeStop = {onResizeStopEja.bind(this)}
          >
            <div style={submenuStyle}>
              <Submenu searchCallback={this.searchCallback}/>
            </div>
          </Resizable>
          <div style={mainContentStyle}>
            <Content query={this.state.query}/>
          </div>
        </Shortcuts>
      </div>

    );
  }
}
