import { GET_BOARDS, ADD_BOARD } from "../actions";

const initialState = {
  results: [],
};
const getBoardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOARDS:
      const boardExists = state.results.some(
        (board) => board.id === action.payload.id
      );
      if (boardExists) {
        return state;
      }
      return {
        ...state,
        results: [...state.results, action.payload],
      };
    case ADD_BOARD:
      const boardExistss = state.results.some(
        (board) => board.id === action.payload.id
      );
      if (boardExistss) {
        return state;
      }
      return {
        ...state,
        results: [...state.results, action.payload],
      };
    //

    default:
      return state;
  }
};

export default getBoardsReducer;
