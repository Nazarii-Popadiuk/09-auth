import axios from "axios"




export const api = axios.create({
  baseURL: 'https://next-v1-notes-api.goit.study',
  withCredentials: true,
});




