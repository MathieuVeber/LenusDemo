import { Response, NextFunction } from "express";

import { InjectedRequest } from "../types";
import { IUser, User } from "../models/users";
import { ErrorEnum } from "../ErrorType";

const loadUser = async (
  req: InjectedRequest,
  res: Response,
  next: NextFunction
) => {
  let user: IUser | null;
  try {
    user = await User.findById(req.params.userId, "_id name");
  } catch (error) {
    return res.status(500).send(ErrorEnum.SERVER_ERROR);
  }
  if (!user) {
    return res.status(404).send(ErrorEnum.USER_NOT_FOUND);
  }
  req.user = user;
  next();
};

export default loadUser;
