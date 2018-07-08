import axios from 'axios';
import store from '../store';
import { getToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

const host = 'http://127.0.0.1:8000';

const service = axios.create({
  baseURL: host, // api的base_url
  timeout: 5000 // 请求超时时间
})

service.interceptors.request.use(
  config => {
    // console.log('axios request====================>');
    // console.log(config);
    if (store.getters.token) {
      config.headers.Authorization = `JWT ${getToken()}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  response => {
    // console.log('axios response====================>');
    // console.log(response);
    const res = response.data
    return response;
  },
  error => {
    let res = error.response;
    return Promise.reject(res.data)
  }
);

export default service
