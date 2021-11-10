const base_URL = "http://yhrtwesdfd.cdprojektred.com:3000/api";

export const getProductsURL = () => `${base_URL}/Products`;
export const deleteProductURL = (productId: number) =>
  `${base_URL}/Products/${productId}`;
export const checkProductsURL = (name: any) =>
  `${base_URL}/Products/count?where=${name}`;
export const replaceProductURL = (productId: number) =>
  `${base_URL}/Products/${productId}`;
