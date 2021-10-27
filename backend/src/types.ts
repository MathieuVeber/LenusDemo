import { Request } from "express";
import { IUser } from "./models/users";

interface InjectedProperties {
  user?: IUser;
}

export type InjectedRequest = Request & InjectedProperties;
