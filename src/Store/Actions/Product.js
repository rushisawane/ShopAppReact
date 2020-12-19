import * as actionTypes from './actionTypes';
import Product from "../../model/product";

export const selectProduct = () => {
  return async (dispatch,getState) => {
    const userId = getState().authReducer.userId;
    try {
      const response = await fetch("https://shopapp-43c5a.firebaseio.com/products.json");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();

      const loadedData = [];

      for (const key in resData) {
        loadedData.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].desc,
            resData[key].price
          )
        );
      }

      dispatch({
        type: actionTypes.SELECT_PRODUCT,
        products: loadedData,
        userProducts: loadedData.filter(prod=>prod.ownerId===userId)
      });
    } catch (error) {
      throw error;
    }
  };
};

