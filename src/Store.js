import { createContext, useReducer } from "react";

const Store = createContext();

let initialState = {
  cart: {
    cartItem: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : [],
  },
};

let reducer = (state, action) => {
  switch (action.type) {
    case "ADD-TO-CART":
      const newItem = action.payload;
      const existingItem = state.cart.cartItem.find((item) => item._id == newItem._id);
      const cartItem = existingItem
        ? state.cart.cartItem.map((item) => (item._id == existingItem._id ? newItem : item))
        : [...state.cart.cartItem, newItem];
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
      return {
        ...state,
        cart: { ...state.cart, cartItem },
      };

    case "REMOVE-TO-CART": {
      const cartItem = state.cart.cartItem.filter((item) => item._id !== action.payload._id);
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
      return {
        ...state,
        cart: { ...state.cart, cartItem },
      };
    }

    default:
      return state;
  }
};

let userState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "USER-SIGN-IN":
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };

    case "USER_LOGOUT":
      localStorage.removeItem("userInfo");
      return { ...state, userInfo: null };

    default:
      return state;
  }
};

let StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [state2, dispatch2] = useReducer(userReducer, userState);

  let value = { state, dispatch, state2, dispatch2 };

  return <Store.Provider value={value}> {props.children} </Store.Provider>;
};

export { StoreProvider, Store };
