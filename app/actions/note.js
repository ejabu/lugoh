
export function nextRow(dispatch, note, selected) {
  if (selected+1 ==note.length ) {
    dispatch({
      type: 'ADD_PRODUCT',

    })
  }
  else{
    dispatch({
      type: 'NEXT_ROW',
    })
  }
}

export function prevRow(dispatch, selected) {
  if (selected==0 ) {
  //doNothing
  }
  else{
    dispatch({
      type: 'PREV_ROW',
    })
  }
}
