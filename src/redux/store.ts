"use client";
import { legacy_createStore as createStore } from "redux";
import { reducers } from "./reducers";

const mystore = createStore(reducers);

export default mystore;




//  store.ts
// "use client";
// import { legacy_createStore as createStore } from "redux";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import { reducers } from "./reducers";
// import { composeWithDevTools } from 'redux-devtools-extension'; // Optional: for Redux DevTools support

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// const mystore = createStore(persistedReducer, composeWithDevTools());

// export const persistor = persistStore(mystore);
// export default mystore;
