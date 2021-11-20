import axios from "axios";
import swal from "sweetalert";
import authService from "./authService";


axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.response.use(null, error => {
  console.log("error.response", error.response)
  if(error.response && error.response.status === 401){     
      window.location = "/";     
      swal("", "Unauthorized Access", "error");  
  }
  else {
      swal("Unexpected Error",  error.response.data, "error");
  }

  return Promise.reject(error);
});

const setApiTokenHeader = () => {
  const token = authService.getApiToken();
  if (!token) {
    window.location = "/";
    return null;
  }
  return {
    'Authorization': `Bearer ${token}`
  };
};

export function getMethod(url, isApiToken = false) {
  let header = {};
  isApiToken
    ? (header = setApiTokenHeader() ? { headers: setApiTokenHeader() } : null)
    : (header = null);
  if (header) {
    return axios.get(url, header);
  }
  return axios.get(url);
}

export function postMethod(url, data, isApiToken = false) {
  let header = {};
  isApiToken
    ? (header = setApiTokenHeader() ? { headers: setApiTokenHeader() } : null)
    : (header = null);

  if (header) {
    return axios.post(url, data, header);
  }
  return axios.post(url, data);
}

export function putMethod(
  url,
  data = {},
  isApiToken = false,
) {
  let header = {};
  isApiToken
    ? (header = setApiTokenHeader() ? { headers: setApiTokenHeader() } : null)
    : (header = null);

  if (header) {
    return axios.put(url, data, header);
  }
  return axios.put(url, data);
}
export function deleteMethod(
  url, 
  isApiToken = false,
) {
  let header = {};
  isApiToken
    ? (header = setApiTokenHeader() ? { headers: setApiTokenHeader() } : null)
    : (header = null);   
  if (header) {
    return axios.delete(url, header);
  } 
  return axios.delete(url);
}

export default {
    putMethod,
    getMethod,
    postMethod,
    deleteMethod,
  };