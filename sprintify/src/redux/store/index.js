import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../reducers/currentUserReducer";
import getBoardsReducer from "../reducers/getBoardsReducer";
import addBoardReducer from "../reducers/addBoardReducer"; // import the new reducer

const combinedReducers = combineReducers({
  currentUser: currentUserReducer,
  boardsOfUser: getBoardsReducer,
  addBoard: addBoardReducer, // add the new reducer to the combinedReducers object
});

const store = configureStore({
  reducer: combinedReducers,
});

export default store;
