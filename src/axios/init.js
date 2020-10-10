import { get } from 'idb-keyval';
export const axios = require('axios');

axios.defaults.baseURL = 'https://marshal24.ru/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

get('AUTH_TOKEN').then(AUTH_TOKEN => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
});


