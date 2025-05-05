import React, { createContext, useContext, useReducer } from "react";

interface AppState {
  likedProducts: Set<string>;
  dislikedProducts: Set<string>;
  cartProducts: Set<string>;
}

type AppAction =
  | { type: "LIKE"; productId: string }
  | { type: "DISLIKE"; productId: string }
  | { type: "ADD_TO_CART"; productId: string }
  | { type: "RESET" };

const initialState: AppState = {
  likedProducts: new Set(),
  dislikedProducts: new Set(),
  cartProducts: new Set(),
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "LIKE":
      return {
        ...state,
        likedProducts: new Set(state.likedProducts).add(action.productId),
        dislikedProducts: (() => {
          const updatedDislikedProducts = new Set(state.dislikedProducts);
          updatedDislikedProducts.delete(action.productId);
          return updatedDislikedProducts;
        })(),
      };
    case "DISLIKE":
      return {
        ...state,
        dislikedProducts: new Set(state.dislikedProducts).add(action.productId),
        likedProducts: (() => {
          const updatedLikedProducts = new Set(state.likedProducts);
          updatedLikedProducts.delete(action.productId);
          return updatedLikedProducts;
        })(),
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartProducts: new Set(state.cartProducts).add(action.productId),
      };
    case "RESET":
      return {
        likedProducts: new Set(),
        dislikedProducts: new Set(),
        cartProducts: new Set(),
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
