import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';


export const fetchUsers = async () => axios.get(`${BASE_URL}/users`).then((res) => res.data);


export const fetchUserById = async (id) =>
  axios.get(`${BASE_URL}/users/${id}`).then((res) => res.data);


export const fetchAlbums = async () => axios.get(`${BASE_URL}/albums`).then((res) => res.data);


export const fetchAlbumsByUser = async (userId) =>
  axios.get(`${BASE_URL}/users/${userId}/albums`).then((res) => res.data);


export const fetchAlbumById = async (id) =>
  axios.get(`${BASE_URL}/albums/${id}`).then((res) => res.data);


export const fetchPhotosByAlbum = async (albumId) =>
  axios.get(`${BASE_URL}/albums/${albumId}/photos`).then((res) => res.data);
