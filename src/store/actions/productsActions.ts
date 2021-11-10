import axios from "axios";
import { Dispatch } from "redux";
import {
  checkProductsURL,
  deleteProductURL,
  getProductsURL,
  replaceProductURL,
} from "../../helpers/api";
import { Product } from "../../typings/product";
import {
  ADD_PRODUCT,
  CHECK_PRODUCTS,
  DELETE_PRODUCT,
  GET_PRODUCTS_LIST,
  ProductsActionTypes,
  REPLACE_PRODUCT,
  RESET_SELECTED,
  SELECT_PRODUCT,
} from "../types/products";

const getProductsList =
  () => async (dispatch: Dispatch<ProductsActionTypes>) => {
    const products = await axios.get(getProductsURL());
    dispatch({
      type: GET_PRODUCTS_LIST,
      all: products.data,
    });
  };

const addProduct = (product: Product) => async (dispatch: Dispatch<any>) => {
  await axios.post(getProductsURL(), product);
  dispatch({
    type: ADD_PRODUCT,
  });
  dispatch(getProductsList());
};

const deleteProduct = (id: number) => async (dispatch: Dispatch<any>) => {
  await axios.delete(deleteProductURL(id));
  dispatch({
    type: DELETE_PRODUCT,
  });
  dispatch(getProductsList());
};

const checkProducts =
  (name: any) => async (dispatch: Dispatch<ProductsActionTypes>) => {
    const count = await (
      await axios.get(checkProductsURL(JSON.stringify({ name: name })))
    ).data.count;
    dispatch({
      type: CHECK_PRODUCTS,
      alreadyExists: count > 0 ?? true,
    });
  };

const selectProduct = (id: number): ProductsActionTypes => ({
  id,
  type: SELECT_PRODUCT,
});

const resetSelected = (): ProductsActionTypes => ({
  type: RESET_SELECTED,
});

const replaceProduct =
  (id: number, product: Product) => async (dispatch: Dispatch<any>) => {
    await axios.put(replaceProductURL(id), product);
    dispatch({
      type: REPLACE_PRODUCT,
    });
    dispatch(getProductsList());
  };

export {
  addProduct,
  checkProducts,
  deleteProduct,
  getProductsList,
  replaceProduct,
  resetSelected,
  selectProduct,
};
