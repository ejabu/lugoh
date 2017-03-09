// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import styles from './Note.css';

@connect(state => ({playback: state.playback, note: state.note, filter: state.filter, selected: state.selected}),)
export default class Note extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "source": ""
    };
    this.focus = this.focus.bind(this);
    this.textInput
  }
  renderRow(item, index) {
    return (
      <div key={index}></div>

    );
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        if (event.target.value.indexOf(':') > -1) {
          this.props.searchCallback(event.target.value)
        } else {
          var neQuery = QueryParser(event.target.value)
        }
      }
    }
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }
  render() {
    const {note, filter, selected, dispatch} = this.props;
    console.log('RERENDER');
    return (
      <div className={styles.transWrapper}>
        Note Starts here {selected}
        <SearchBar filterText={filter} dispatch={dispatch}/>

        <ProductTable selected={selected} products={note} filterText={filter} dispatch={dispatch} handleKeyDown={this.handleKeyDown}/>
      </div>
    );
  }
}
function SearchBar(props) {
  return (
    <div>

      <input type="text" placeholder="Search..." value={props.filterText} onChange={(evt) => {
        props.dispatch({type: 'FILTER_TEXT', text: evt.target.value})
      }}/>
    </div>

  );

}

function ProductTable(props) {
  var handleOnFocus = (params) => {
    var index = props.products.findIndex(item => item.id === params.obj.id);
    // if (event.key === 'Enter') {
    props.dispatch({type: 'SELECT_ROW', index: index})
  }
  var filterText = props.filterText;
  var product = props.products.map(function(product, index) {
    if (product.note.indexOf(filterText) === -1) {
      return;
    }
    console.log(props.selected, index);
    const isFocus = props.selected == index
      ? true
      : false;
    console.log(isFocus);
    return (<ProductRow focus={isFocus} product={product} key={product.id} dispatch={props.dispatch} handleKeyDown={props.handleKeyDown} handleOnFocus={handleOnFocus}/>)
  });
  return (
    <div>

      <button type="button" onClick={() => props.dispatch({
        type: 'ADD_PRODUCT',
        obj: {
          id: (+ new Date() + Math.floor(Math.random() * 999999)).toString(36),
          note: "",
          time: 0
        }
      })} className="btn btn-success pull-right">Add</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Time</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>
          {product}

        </tbody>

      </table>
    </div>
  );

}

function ProductRow(props) {

  return (
    <tr className="eachRow">
      <EditableCell dispatch={props.dispatch} handleKeyDown={props.handleKeyDown} handleOnFocus={props.handleOnFocus} cellData={{
        "type": "time",
        value: props.product.time,
        id: props.product.id
      }}/>
      <EditableCell focus={props.focus} dispatch={props.dispatch} handleKeyDown={props.handleKeyDown} handleOnFocus={props.handleOnFocus} cellData={{
        type: "note",
        value: props.product.note,
        id: props.product.id
      }}/>

      <td className="del-cell">
        <input type="button" onClick={() => props.dispatch({type: 'DELETE_PRODUCT', obj: props.product})} value="X" className="del-btn"/>
      </td>
    </tr>
  );

}
function EditableCell(props) {
  return (
    <td>
      <input autoFocus type='text' id={props.cellData.id} value={props.cellData.value} name={props.cellData.type} onBlur ={(evt) => {
        evt.preventDefault();
        props.dispatch({type: 'DESELECT_ROW'})
      }} onFocus ={(evt) => {
        evt.preventDefault();
        props.handleOnFocus({
          obj: {
            id: evt.target.id
          }
        })
      }} onChange ={(evt) => {
        evt.preventDefault();
        props.dispatch({
          type: 'UPDATE_PRODUCT',
          obj: {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
          }
        })
      }} ref={function(input) {
        if (input != null) {
          console.log(props);
          if (props.focus == true) {
            input.focus();
          }
        }
      }}
      />
    </td>
  );

}
