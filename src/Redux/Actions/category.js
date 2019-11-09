import axios from 'axios';
import Config from 'react-native-config';

export const getCategory = (token, params) => {
  return {
    type: 'GET_CATEGORY',
    payload: axios.get(`${Config.API_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }),
  };
};

export const createNewCategory = (token, input) => {
  return {
    type: 'NEW_CATEGORY',
    payload: axios.post(`${Config.API_URL}/category`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  };
};

export const editCategory = (token, input) => {
  return {
    type: 'EDIT_CATEGORY',
    payload: axios.put(`${Config.API_URL}/category/${input.id}`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  };
};

export const deleteCategory = (token, id) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: axios.delete(`${Config.API_URL}/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  };
};
