// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Note.css';


@connect(state => ({ playback: state.playback, note: state.note, filter: state.filter}),)
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
  render() {
    const { note, filter, dispatch } = this.props;
    console.log("rerede");
    console.log(note, filter);
    return (
      <div className={styles.transWrapper}>
        Note Starts here
        <SearchBar filterText={filter} dispatch={dispatch}/>

        <ProductTable
          products={note}
          filterText={filter}
          dispatch={dispatch}
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

  var filterText = props.filterText;
  var product = props.products.map(function(product) {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    return (<ProductRow product={product} key={product.id} dispatch={props.dispatch}/>)
  });
  return (
    <div>

      <button type="button" onClick={() => props.dispatch({
        type: 'ADD_PRODUCT',
        obj: {
          category: "",
          id: (+ new Date() + Math.floor(Math.random() * 999999)).toString(36),
          name: "",
          price: "",
          qty: 0
        }
      })} className="btn btn-success pull-right">Add</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>price</th>
            <th>quantity</th>
            <th>category</th>
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
        cellData={{
        "type": "name",
        value: props.product.name,
        id: props.product.id
      }}/>
      <EditableCell
        dispatch={props.dispatch}
        cellData={{
        type: "price",
        value: props.product.price,
        id: props.product.id
      }}/>
      <EditableCell
        dispatch={props.dispatch}
        cellData={{
        type: "qty",
        value: props.product.qty,
        id: props.product.id
      }}/>
      <EditableCell
        dispatch={props.dispatch}
        cellData={{
        type: "category",
        value: props.product.category,
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
      <input type='text' id={props.cellData.id} value={props.cellData.value} name={props.cellData.type} onChange ={(evt) => {
        props.dispatch({
          type: 'UPDATE_PRODUCT',
          obj: {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
          }
        })
      }}/>
    </td>
  );

}
