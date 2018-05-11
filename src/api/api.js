import axios from 'axios'

let host = 'http://127.0.0.1:8000';

export const getBlogList = params => { return axios.get(`${host}/posts/`, {params: params}) };

