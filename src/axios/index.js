import axios from 'axios';
import store from '../store/store';

axios.interceptors.request.use(
  config => {
    // console.log('axios request====================>');
    // console.log(config);
    if (store.state.userInfo.token) {
      config.headers.Authorization = `JWT ${store.state.userInfo.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    // console.log('axios response====================>');
    // console.log(response);
    return response;
  },
  error => {
    let res = error.response;
    console.log(res.status);
    return Promise.reject(error.response.data)
  }
);
