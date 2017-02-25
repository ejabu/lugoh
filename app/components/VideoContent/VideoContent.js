// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import styles from './VideoContent.css';
import $ from 'jquery';
import { toPlay, toStop } from '../../actions/playback';



@connect(state => ({ playback: state.playback}),)
export default class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "currentTime": 0,
      "source": "E:/kursi3d.mp4",
    };
    // this.intervalListener;

  }

  static internalListener;

  onDrop = (event) => {
    event.stopPropagation();
    var res2 = document.getElementById("myFile").files[0].path.replace(/\\/g, "/");
    var toSet2 = {
      source: res2,
      "currentTime": 0,

    }
    const { dispatch } = this.props;

    this.stop()
    this.setState(toSet2);
    toStop(dispatch)
  }

  intervalTrigger() {
    var self = this;
    self.harusInter = setInterval(function() {
      var initTime = document.getElementById("myVid").currentTime
      var res = parseInt(initTime)
      self.setState({"currentTime": res})
    }, 500);
    return self.harusInter
  };

  start = () => {

    $("video")[0].play()
    console.log('this start ejaaaaaa');
    console.log(this);
    this.intervalListener = this.intervalTrigger()
  }
  stop = () => {

    $("video")[0].pause()
    window.clearInterval(this.intervalListener);
  }

  startClick = (event) => {
    event.stopPropagation();
    const { dispatch } = this.props;
    toPlay(dispatch)
  }
  stopClick = (event) => {
    event.stopPropagation();
    const { dispatch } = this.props;
    toStop(dispatch)
  }




  componentWillUpdate(nextProps, nextState) {
    if (this.props.playback == "STOP" && nextProps.playback == "PLAY") {
      this.start()
    }
    else if (this.props.playback == "PLAY" && nextProps.playback == "STOP") {
      this.stop()
    }
  }
  render() {
    function toHHMMSS(sec_num) {
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ':' + minutes + ':' + seconds;
    }
    var timeString = toHHMMSS(this.state.currentTime)
    console.log('reRender');
    return (
      <div className={styles.transWrapper}>
        {this.props.playback}
        {this.state.currentTime}
        {timeString}
        <video id="myVid" src={this.state.source}>
          Your browser does not support HTML5 video.</video>
        <button onClick={this.startClick.bind(this)}>start</button>
        <button onClick={this.stopClick.bind(this)}>pause</button>
        <input id="myFile" type='file' multiple ref='fileInput' onChange={this.onDrop.bind(this)}/>
      </div>
    );
  }
}
