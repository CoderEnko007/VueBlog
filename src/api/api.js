import axios from 'axios'

let host = 'http://127.0.0.1:8000';

export const getBlogList = params => { return axios.get(`${host}/posts/`, {params: params}) };
export const getBlogDetail = post_id => { return axios.get(`${host}/posts/${post_id}`+'/')};
export const getCategory = params => { return axios.get(`${host}/categorys`, {params: params})};
