import { Product } from "../../typings/product";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const CHECK_PRODUCTS = "CHECK_PRODUCTS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const GET_PRODUCTS_LIST = "GET_PRODUCTS_LIST";
export const REPLACE_PRODUCT = "REPLACE_PRODUCT";
export const SELECT_PRODUCT = "SELECT_PRODUCT";
export const RESET_SELECTED = "RESET_SELECTED";

export interface GetProductsListAction {
  all: Product[];
  type: typeof GET_PRODUCTS_LIST;
}

export interface AddProductAction {
  type: typeof ADD_PRODUCT;
}

export interface DeleteProductAction {
  id: number;
  type: typeof DELETE_PRODUCT;
}

export interface CheckProductsAction {
  alreadyExists: boolean;
  type: typeof CHECK_PRODUCTS;
}

export interface SelectProductAction {
  id: number;
  type: typeof SELECT_PRODUCT;
}

export interface ResetSelectedAction {
  type: typeof RESET_SELECTED;
}

export interface ReplaceProductAction {
  type: typeof REPLACE_PRODUCT;
}

export type ProductsActionTypes =
  | AddProductAction
  | CheckProductsAction
  | DeleteProductAction
  | GetProductsListAction
  | ReplaceProductAction
  | ResetSelectedAction
  | SelectProductAction;
