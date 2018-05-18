import axios from 'axios'

let host = 'http://127.0.0.1:8000';

export const getBlogList = params => { return axios.get(`${host}/postList/`, {params: params}) };
export const getBlogDetail = post_id => { return axios.get(`${host}/posts/${post_id}`+'/')};
export const getCategory = params => { return axios.get(`${host}/categorys`, {params: params})};

export const postBlogList = params => { return axios.post(`${host}/posts/`, params) };
export const login = params => { return axios.post(`${host}/login/`, params)};
export const getUserDetail = () => { return axios.get(`${host}/users/1/`) };

export const getAdminList = () => { return axios.get(`${host}/adminList`)};
