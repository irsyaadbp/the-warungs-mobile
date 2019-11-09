import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export const register = input => {
  return {
    type: 'USER_REGISTER',
    payload: axios.post(`${Config.API_URL}/user/register`, input),
  };
};

export const login = input => {
  return {
    type: 'USER_LOGIN',
    payload: axios.post(`${Config.API_URL}/user/login`, input),
  };
};

export const getUser = () => {
  return {
    type: 'GET_USER',
    payload: AsyncStorage.getItem('@user'),
  };
};
