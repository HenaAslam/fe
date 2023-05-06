import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "../reducers/currentUserReducer";
import getBoardsReducer from "../reducers/getBoardsReducer";
import getTasksReducer from "../reducers/getTasksReducer";

const combinedReducers = combineReducers({
  currentUser: currentUserReducer,
  boardsOfUser: getBoardsReducer,
  tasksOfBoard: getTasksReducer,
});

const store = configureStore({
  reducer: combinedReducers,
});

export default store;
