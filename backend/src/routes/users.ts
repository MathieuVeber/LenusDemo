import Router from "express";
import { Request, Response } from "express";

import { IUser, User, userValidationSchema } from "../models/users";
import { ErrorEnum } from "../ErrorType";
import validate from "../middlewares/validate";

const router = Router();

router.get("/:userId", async (req: Request, res: Response) => {
  let user: IUser | null;
  try {
    user = await User.findById(req.params.userId);
  } catch (error) {
    return res.status(500).send(ErrorEnum.SERVER_ERROR);
  }
  if (!user) {
    return res.status(404).send(ErrorEnum.USER_NOT_FOUND);
  }
  return res.status(200).json(user);
});

router.post(
  "/",
  validate(userValidationSchema),
  async (req: Request, res: Response) => {
    let user: IUser | null;
    try {
      user = await User.create(req.body);
    } catch (error) {
      return res.status(500).send(ErrorEnum.SERVER_ERROR);
    }
    return res.status(201).json(user);
  }
);

export default router;
