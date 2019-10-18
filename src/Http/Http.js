import axios from "axios";
import ls from "local-storage";

const instance = axios.create({
  baseURL: process.env.ORIGIN,
  headers: {
    authorization: "Bearer " + ls.get("token") || ""
  }
});

export default instance;
