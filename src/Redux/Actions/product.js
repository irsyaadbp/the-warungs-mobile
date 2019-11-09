import axios from 'axios';
import Config from 'react-native-config';

export const getProduct = (token, params) => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get(`${Config.API_URL}/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }),
  };
};

export const createNewProduct = (token, input) => {
  return {
    type: 'NEW_PRODUCT',
    payload: axios.post(`${Config.API_URL}/product`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  };
};

export const editProduct = (token, input) => {
  return {
    type: 'EDIT_PRODUCT',
    payload: axios.put(`${Config.API_URL}/product/${input.id}`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  };
};

export const deleteProduct = (token, id) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios.delete(`${Config.API_URL}/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  };
};
