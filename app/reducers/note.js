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
    id: 1,
    category: 'Sporting Goods',
    price: '49.99',
    qty: 12,
    name: 'football'
  }, {
    id: 2,
    category: 'Sporting Goods',
    price: '9.99',
    qty: 15,
    name: 'baseball'
  }, {
    id: 3,
    category: 'Sporting Goods',
    price: '29.99',
    qty: 14,
    name: 'basketball'
  }, {
    id: 4,
    category: 'Electronics',
    price: '99.99',
    qty: 34,
    name: 'iPod Touch'
  }, {
    id: 5,
    category: 'Electronics',
    price: '399.99',
    qty: 12,
    name: 'iPhone 5'
  }, {
    id: 6,
    category: 'Electronics',
    price: '199.99',
    qty: 23,
    name: 'nexus 7'
  }
];


export function note ( state = productList, action) {
   if (action.type == "ADD_PRODUCT") {
  	  return state.concat([action.obj])
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
