import axiosInstance from "../src/Api";

const baseURL = "https://s3-ap-southeast-1.amazonaws.com/he-public-data";

let APIService = {
  getBeerCraftData: async endpoint => {
    var url = baseURL + endpoint;
    return axiosInstance.get(url);
  },
  getBeerCraftImages: async endpoint => {
    var url = baseURL + endpoint;
    return axiosInstance.get(url);
  },
  post: async (endpoint, postData) => {
    var url = baseURL + endpoint;
    return axiosInstance.post(url, postData);
  }
};

export { APIService };
