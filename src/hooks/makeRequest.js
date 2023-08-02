import axios from "axios";


const baseURL = import.meta.env.VITE_SECRET_API_URL


// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;

// const currentUser =  user && JSON.parse(user).currentUser;

export const publicRequest = axios.create({baseURL})