import axios from "axios";

import { ErrorEnum } from "./errors";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const handleAPIError = (error: any): ErrorEnum => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data;
  } else if (axios.isAxiosError(error) && error.request) {
    return ErrorEnum.BAD_CONNECTION;
  } else {
    return ErrorEnum.UNKNOWN_ERROR;
  }
};

export { api, handleAPIError };
