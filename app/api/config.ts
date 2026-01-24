import axios from "axios";

export const USER_HOST = import.meta.env.VITE_USER_API;
export const API_HOST = import.meta.env.VITE_LOT_API;

export const userApi = axios.create({ baseURL: USER_HOST });
export const lotApi = axios.create({
    baseURL: API_HOST,
});
