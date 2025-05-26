import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import booksReducer from "./bookSlice";
import borrowReducer from "./borrowSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "books", "borrows"], // add "borrows"
};

// Combine reducers first
const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
  borrows: borrowReducer, // add this
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
