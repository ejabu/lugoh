// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Note.css';


@connect(state => ({ playback: state.playback, note: state.note, filter: state.filter, selected: state.selected}),)
export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "source": ""
    };
  }
  renderRow(item, index) {
    return (
      <div key={index}>


      </div>

    );
  }

  handleKeyDown = (event) => {
    console.log('tes');
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        if (event.target.value.indexOf(':') > -1) {
          this.props.searchCallback(event.target.value)
        }
        else{
          var neQuery = QueryParser(event.target.value)
          // quranDB.find(neQuery).sort({c:1,v:1}).exec(this.doSomething)
        }
      }
    }
  }

  render() {
    const { note, filter,selected, dispatch } = this.props;
    console.log("rerede");
    console.log(note, filter, selected);
    return (
      <div className={styles.transWrapper}>
        Note Starts here
        {selected}
        <SearchBar filterText={filter} dispatch={dispatch}/>

        <ProductTable
          products={note}
          filterText={filter}
          dispatch={dispatch}
          handleKeyDown={this.handleKeyDown}
        />
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
  var product = props.products.map(function(product) {
    if (product.note.indexOf(filterText) === -1) {
      return;
    }
    return (<ProductRow
              product={product}
              key={product.id}
              dispatch={props.dispatch}
              handleKeyDown={props.handleKeyDown}
              handleOnFocus={handleOnFocus}

            />)
  });
  return (
    <div>

      <button type="button" onClick={() => props.dispatch({
        type: 'ADD_PRODUCT',
        obj: {
          id: (+ new Date() + Math.floor(Math.random() * 999999)).toString(36),
          note: "",
          time: 0,
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
      <EditableCell
        dispatch={props.dispatch}
        handleKeyDown={props.handleKeyDown}
        handleOnFocus={props.handleOnFocus}
        cellData={{
        "type": "time",
        value: props.product.time,
        id: props.product.id
      }}/>
      <EditableCell
        dispatch={props.dispatch}
        handleKeyDown={props.handleKeyDown}
        handleOnFocus={props.handleOnFocus}
        cellData={{
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
      <input type='text' id={props.cellData.id} value={props.cellData.value} name={props.cellData.type}
         onKeyDown ={(evt) => {
           evt.preventDefault()
           console.log('tez');
         }}
         onFocus ={(evt) => {


           props.handleOnFocus({
             obj: {
               id: evt.target.id,

             }})

         }}
        onChange ={(evt) => {
          evt.preventDefault()
          console.log('tez2');
        props.dispatch({
          type: 'UPDATE_PRODUCT',
          obj: {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
          }
        })
      }}
      />
    </td>
  );

}
