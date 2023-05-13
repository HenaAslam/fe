import { ADD_BOARD } from "../actions";

const initialState = {
  board: null,
};

const addBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        board: action.payload,
      };
    default:
      return state;
  }
};

export default addBoardReducer;
