// import axios from "axios";
// import { showErrorNotification } from "../../utility/index";

// import { getApiParams } from "../../utility/getApiParams";
// import { clearToken, getToken } from "../../utility/localStorageUtils";

// // Step-1: Create a new Axios instance with a custom config.
// // The timeout is set to 20s. If the request takes longer than
// // that then the request will be aborted.
// export const privateRequest = axios.create({
//   timeout: 20000,
//   baseURL: import.meta.env.VITE_BASE_URL,
// });


// // Step-2: Create request, response & error handlers
// const requestHandler = (request) => {
//   // Token will be dynamic so we can use any app-specific way to always
//   // fetch the new token before making the call

//   if (request.params) {
//     request.params = getApiParams(request.params); // Clean the query parameters
//   }
//   request.headers.Authorization = `Basic ${getToken()}`;
//   request.headers.ContentType = "multipart/form-data";
//   return request;
// };

// const responseHandler = (response) => {
//   return response;
// };

// const errorHandler = (error) => {

//   return Promise.reject(error);
// };

// const responseErrorHandler = (error) => {

//   if (error.response) {
//     const { status, data: { message } } = error.response

//     switch (status) {
//       case 401:
//         showErrorNotification(`Error ${status}`, "Token Expired! Please Login again")
//         setTimeout(() => {
//           window.location = '/';
//           clearToken()
//         }, 1000)
//         break;
//       case 400:
//         showErrorNotification(`Error ${status}`, message || "Inavalid Input/ Bad Request")
//         break;
//       case 403:
//         showErrorNotification(`Error ${status}`, message || "Access Denied/ Forbidden")
//         break;
//       case 404:
//         showErrorNotification(`Error ${status}`, message || "Item doesn't exist")
//         break;
//       case 405:
//         showErrorNotification(`Error ${status}`, message || "Invalid Request")
//         break;
//       case 422:
//         showErrorNotification(`Error ${status}`, message || "Already Exists")
//         break;
//       case 504:
//         showErrorNotification(`Error ${status}`, message || "Network Error")
//         break;
//       case 500:
//           showErrorNotification(`Error ${status}`, message || "Network Error")
//           break;
//       default:
//         showErrorNotification(`Error ${status}`, message || "Some Error Occurred")
//         break;
//     }
//   }
//   else {
//     if (error.name !== 'CanceledError') showErrorNotification('Error 500', "Some Error Occurred");
//   }

//   return Promise.reject(error)
// }

// // Step-3: Configure/make use of request & response interceptors from Axios
// // Note: You can create one method say configureInterceptors, add below in that,
// // export and call it in an init function of the application/page.
// privateRequest.interceptors.request.use(
//   (request) => requestHandler(request),
//   (error) => errorHandler(error)
// );

// privateRequest.interceptors.response.use(
//   (response) => responseHandler(response),
//   responseErrorHandler
// );

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

