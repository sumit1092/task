import axios from "axios";
import store from "../../redux/store";
import { startLoading, stopLoading, setGlobalError } from "../../redux/slices/appSlice";
import { signOut } from "../../redux/slices/authSlice";
import { getToken } from "../../utility/localStorageUtils";

const privateRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

privateRequest.interceptors.request.use(
  (config) => {
    store.dispatch(startLoading());
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log("Token:", token);
    return config;
  },
  (error) => {
    store.dispatch(stopLoading());
    return Promise.reject(error);
  }
);

privateRequest.interceptors.response.use(
  (res) => {
    store.dispatch(stopLoading());
    return res;
  },
  (error) => {
    store.dispatch(stopLoading());
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || error?.message || "Something went wrong";
    store.dispatch(setGlobalError(message));
    if (status === 401) {
      store.dispatch(signOut());
    }
    return Promise.reject(error);
  }
);

export default privateRequest;

