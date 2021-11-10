import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { Product } from "../typings/product";

export interface RootStore {
  products: {
    all: Product[];
    alreadyExists: boolean;
    selected: Product;
  };
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
