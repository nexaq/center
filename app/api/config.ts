import axios from "axios";

export const CENTER_API_HOST = "http://localhost:3012";

export const api = axios.create({ baseURL: CENTER_API_HOST });