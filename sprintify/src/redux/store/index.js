import currentUserReducer from "../reducers/currentUserReducer";
import getBoardsReducer from "../reducers/getBoardsReducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage"; // default value: localStorage

import { encryptTransform } from "redux-persist-transform-encrypt";
import reducer from "../reducers/updateAccessTokenReducer";

const persistConfig = {
  storage: localStorage,
  key: "root",
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_ENV_SECRET_KEY,
    }),
  ],
};

const combinedReducers = combineReducers({
  currentUser: currentUserReducer,
  boardsOfUser: getBoardsReducer,
  access: reducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

const persistedStore = persistStore(store);

export { persistedStore, store };
