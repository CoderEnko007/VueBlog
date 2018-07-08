import axios from '@/axios/index'

export const login = params => { return axios.post(`/login/`, params)};
export const getInfo = () => { return axios.get(`/users/1`)};

export const getBlogList = params => { return axios.get(`/posts/`, {params: params}) };
export const getBlogDetail = post_id => { return axios.get(`/posts/${post_id}`+'/')};

export const postBlog = params => { return axios.post(`/posts/`, params) };
export const patchBlog = (id, params) => { return axios.patch(`/posts/${id}/`, params) };
export const deleteArticle = post_id => { return axios.delete(`/posts/${post_id}`+'/')};

export const getCategory = params => { return axios.get(`/category`, {params: params})};
export const addCategory = params => { return axios.post(`/category/`, params) };
export const patchCategory = (id, params) => { return axios.patch(`/category/${id}/`, params) };
export const delCategory = id => { return axios.delete(`/category/${id}`+'/')};

export const getTags = params => { return axios.get(`/tags`, {params: params})};
export const addTags = params => { return axios.post(`/tags/`, params) };
export const patchTag = (id, params) => { return axios.patch(`/tags/${id}/`, params) };
export const delTag = id => { return axios.delete(`/tags/${id}`+'/')};
