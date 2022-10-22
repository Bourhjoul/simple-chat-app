import { EnhancedStore } from "@reduxjs/toolkit";
import { getStoredState, REHYDRATE } from "redux-persist";

export default function crossBrowserListener(
  store: EnhancedStore<any>,
  persistConfig: any
) {
  return async function () {
    let state = await getStoredState(persistConfig);

    store.dispatch({
      type: REHYDRATE,
      key: persistConfig.key,
      payload: state,
    });
  };
}
