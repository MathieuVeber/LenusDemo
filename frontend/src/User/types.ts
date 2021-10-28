import { Measurement } from "../Measurement/types";
import { ErrorEnum } from "../utils/errors";

export interface User {
  _id: string;
  name: string;
  measurements: Measurement[];
}

export interface UserState {
  current?: User;
  loading: boolean;
  error?: ErrorEnum;
}
