import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import localStorage from "redux-persist/es/storage";
import sessionStorage from "redux-persist/es/storage/session";
import LoginReducer from "../features/Login/loginSlice";
import MessagesReducer from "../features/Messages/MessagesSlice";
import crossBrowserListener from "../utils/crossBrowserListener";

const persistedLoginReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage: sessionStorage,
  },
  LoginReducer
);
const persistedMessagesReducer = persistReducer(
  {
    key: "root-1",
    version: 1,
    storage: localStorage,
  },
  MessagesReducer
);

export const store = configureStore({
  reducer: {
    users: persistedLoginReducer,
    messages: persistedMessagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
window.addEventListener(
  "storage",
  crossBrowserListener(store, {
    key: "root-1",
    version: 1,
    storage: localStorage,
  })
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
