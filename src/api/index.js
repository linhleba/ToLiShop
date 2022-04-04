import apiCaller from '../utils/apiCaller';
import * as Config from '../constants/Config';
import axios from 'axios';

export const signIn = (formData) =>
  apiCaller('api/account/login', 'post', formData);
export const signUp = (formData) =>
  apiCaller('api/account/create', 'post', formData);

export const getBook = () => apiCaller('api/book', 'get');
export const findBook = (id) => apiCaller(`api/book/${id}`, 'get');
