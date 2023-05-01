import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "../reducers/currentUserReducer";

const combinedReducers = combineReducers({
  currentUser: currentUserReducer,
});

const store = configureStore({
  reducer: combinedReducers,
});

export default store;
