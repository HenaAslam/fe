// reducer.js

import { UPDATE_ACCESS_TOKEN } from "../actions";

const initialState = {
  accessToken: null,
  // ...
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    // ...
    default:
      return state;
  }
}

export default reducer;
