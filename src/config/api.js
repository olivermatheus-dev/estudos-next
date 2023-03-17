import axios from "axios";

const apiURLs = {
  development: "https://ceostab.cyclic.app/",
  production: "https://ceostab.cyclic.app/",
};

const apiNoToken = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

export { apiNoToken };
