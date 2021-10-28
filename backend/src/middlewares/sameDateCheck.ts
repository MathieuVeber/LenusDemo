import { Request, Response, NextFunction } from "express";

import { IUser, User } from "../models/users";
import { ErrorEnum } from "../errors";
import { InjectedRequest } from "../types";

/**
 * Must be used after `loadUser` and `validate` middlewares
 */
const sameDateCheck = async (
  req: InjectedRequest,
  res: Response,
  next: NextFunction
) => {
  let user: IUser | null;
  try {
    user = await User.findOne({
      _id: req.user!._id,
      measurements: {
        $elemMatch: {
          _id: { $ne: req.params.measurementId },
          date: req.body.date,
        },
      },
    });
  } catch (error) {
    return res.status(500).send(ErrorEnum.SERVER_ERROR);
  }
  if (user) {
    return res.status(400).send(ErrorEnum.SAME_DATE_MEASUREMENT);
  }
  next();
};

export default sameDateCheck;
