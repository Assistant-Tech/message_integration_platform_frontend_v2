import axios from "axios";

const API_COUNTRIES_BASE_URL = "https://countriesnow.space/api/v0.1";

const apiCountries = axios.create({
  baseURL: API_COUNTRIES_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default apiCountries;
