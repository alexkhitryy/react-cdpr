import { Product } from "../../typings/product";
import {
  ProductsActionTypes,
  GET_PRODUCTS_LIST,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  CHECK_PRODUCTS,
  SELECT_PRODUCT,
  RESET_SELECTED,
} from "../types/products";

const INITIAL_STATE = {
  all: [],
  alreadyExists: false,
  selected: {},
};

const productsReducer = (
  state = INITIAL_STATE,
  action: ProductsActionTypes
) => {
  switch (action.type) {
    case GET_PRODUCTS_LIST: {
      return {
        ...state,
        all: action.all,
      };
    }
    case ADD_PRODUCT: {
      return {
        ...state,
      };
    }
    case CHECK_PRODUCTS: {
      return {
        ...state,
        alreadyExists: action.alreadyExists,
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        all: [
          ...state.all.filter((product: Product) => product.id !== action.id),
        ],
      };
    }
    case SELECT_PRODUCT: {
      return {
        ...state,
        selected: state.all.filter(
          (product: Product) => product.id === action.id
        )[0],
      };
    }
    case RESET_SELECTED: {
      return {
        ...state,
        selected: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default productsReducer;
