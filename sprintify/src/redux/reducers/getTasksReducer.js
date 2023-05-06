import { GET_TASKS } from "../actions";

const initialState = {
  results: [],
};
const getTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        results: [...state.results, action.payload],
      };
    //

    default:
      return state;
  }
};

export default getTasksReducer;
