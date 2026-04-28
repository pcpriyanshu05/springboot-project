import axios from 'axios';

const API_BASE = '/api/users';

export const getUsers = () => axios.get(API_BASE);
export const getUserById = (id) => axios.get(`${API_BASE}/${id}`);
export const createUser = (user) => axios.post(API_BASE, user);
export const updateUser = (id, user) => axios.put(`${API_BASE}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_BASE}/${id}`);
