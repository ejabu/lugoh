// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import styles from './Content.css';


@connect(state => ({ playback: state.playback}),)
export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "source": ""
    };
  }

  render() {
    return (
      <div className={styles.transWrapper}>
        hehe

      </div>
    );
  }
}
