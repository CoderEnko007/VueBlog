import axios from 'axios';

axios.interceptors.request.use(
  config => {
    // console.log('axios request====================>');
    // console.log(config);
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
  }
);
