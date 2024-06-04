import { Action, InitialState } from "./types";

let initialState: InitialState = {
  userData: { username: "", email: "", id: "" },
  cart: { products: [], id: "" },
  orders:[],
};

export const reducers = (state = initialState, action: Action) => {
  switch (action.type) {
    case "USER_DATA":
      return { ...state, userData: action.payload };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "SET_ORDER":
      return { ...state, orders: action.payload };

    default:
      return state;
  }
};