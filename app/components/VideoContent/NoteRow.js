// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './NoteRow.css';


@connect(state => ({ playback: state.playback}),)
export default class NoteRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "content": this.props.text
    };
  }
  handleChange(event) {
    const { dispatch } = this.props;
    const content = event.target.value;
    this.setState({ content: content });
  }
  render() {
    const { text } = this.props;
    console.log(this.props);
    return (
      <div className={styles.transWrapper}>
        {text}
        <input
          type="text"
          value={this.state.content}
          // onKeyDown={this.handleKeyDown.bind(this)}
          // onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}
