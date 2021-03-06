// @flow

// export default function note(state = [{text: 'Eja'}], action = {}) {
//   switch (action.type) {
//     case NOTE_ADD:
//       state = [
//         ...action.data
//       ];
//       return state;
//
//     default:
//       return state;
//   }
// }


var productList = [
  {
    id: "1",
    time: 10,
    note: 'Amma',
  }, {
    id: "2",
    time: 20,
    note: 'Amma',
  }, {
    id: "3",
    time: 50,
    note: 'Amma',
  }, {
    id: "4",
    time: 70,
    note: 'Amma',
  }
];


export function note ( state = productList, action) {
   if (action.type == "ADD_PRODUCT") {
     var toAdd = {
       id: (+ new Date() + Math.floor(Math.random() * 999999)).toString(36),
       note: "",
       time: 0
     }
  	  return state.concat([toAdd])
   } else if (action.type == "DELETE_PRODUCT") {
    	var index = state.indexOf(action.obj);
      var new_state = [
        ...state.slice(0, index),
       ...state.slice(index + 1)
      ];
      return new_state;
   } else if (action.type == "UPDATE_PRODUCT") {
    	return state.map((todo, index, arr) => {
      	   if (arr[index].id.toString() === action.obj.id) {
        	     let obj = {};
        	     obj[action.obj.name] = action.obj.value;
        	     return Object.assign({}, todo, obj);
      	   }
      	   return todo
    	})
   } else {
  	  return state;
   }
}
export function filter (state = "", action) {
  if (action.type == "FILTER_TEXT") {
    return action.text;
  } else {
    return state;
  }

}
export function selected (state = -1, action) {
  if (action.type == "SELECT_ROW") {
    return action.index;
  } else if (action.type == "DESELECT_ROW") {
    return -1;
  } else if (action.type == "NEXT_ROW") {
    return state+1;
  } else if (action.type == "PREV_ROW") {
    return state-1;
  } else {
    return state;
  }

}
