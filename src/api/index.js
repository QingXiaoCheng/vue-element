import axios from "axios"; 

export function post(url, data, otherConfig) {
  return axios.post(url, data, otherConfig);
}

export function get(url, data, otherConfig) {
  return axios.get(url, {
      params: data,
      ...otherConfig
  });
}