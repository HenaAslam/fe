import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "../reducers/currentUserReducer";
import getBoardsReducer from "../reducers/getBoardsReducer";

const combinedReducers = combineReducers({
  currentUser: currentUserReducer,
  boardsOfUser: getBoardsReducer,
});

const store = configureStore({
  reducer: combinedReducers,
});

export default store;
