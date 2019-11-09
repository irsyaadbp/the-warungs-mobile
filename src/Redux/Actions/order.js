import axios from 'axios';
import Config from 'react-native-config';

export const getRecentOrder = (token, params) => {
  return {
    type: 'GET_RECENT_ORDER',
    payload: axios.get(`${Config.API_URL}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }),
  };
};

export const getProductInOrder = (token, params) => {
  return {
    type: 'GET_PRODUCT_IN_ORDER',
    payload: axios.get(`${Config.API_URL}/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }),
  };
};

export const addItemInOrder = product => {
  return {type: 'ADD_ITEM_IN_ORDER', product};
};

export const removeItemInOrder = product => {
  return {type: 'REMOVE_ITEM_IN_ORDER', product};
};

export const quantityChange = product => {
  return {type: 'QUANTITY_CHANGE_IN_ORDER', product};
};

export const checkoutOrder = (token, order) => {
  return {
    type: 'CHECKOUT_IN_ORDER',
    payload: axios.post(`${Config.API_URL}/order`, order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  };
};
