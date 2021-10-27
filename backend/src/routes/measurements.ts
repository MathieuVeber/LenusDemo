import { Router, Response } from "express";

import { InjectedRequest } from "../types";
import { IUser, User } from "../models/users";
import { measurementValidationSchema } from "../models/measurements";
import validate from "../middlewares/validate";
import sameDateCheck from "../middlewares/sameDateCheck";
import { ErrorEnum } from "../ErrorType";

const router = Router();

router.post(
  "/",
  validate(measurementValidationSchema),
  sameDateCheck,
  async (req: InjectedRequest, res: Response) => {
    let user: IUser | null;
    try {
      user = await User.findOneAndUpdate(
        {
          _id: req.user!._id,
        },
        {
          $push: { measurements: req.body },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      return res.status(500).send(ErrorEnum.SERVER_ERROR);
    }

    if (!user) {
      return res.status(404).send(ErrorEnum.USER_NOT_FOUND);
    }

    return res
      .status(201)
      .json(
        user.measurements.find(
          (measurement) => (measurement.date = req.body.date)
        )
      );
  }
);

router.put(
  "/:measurementId",
  validate(measurementValidationSchema),
  sameDateCheck,
  async (req: InjectedRequest, res: Response) => {
    let user: IUser | null;
    try {
      user = await User.findOneAndUpdate(
        {
          _id: req.user!._id,
          measurements: { $elemMatch: { _id: req.params.measurementId } },
        },
        {
          $set: { "measurements.$": req.body },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      return res.status(500).send(ErrorEnum.SERVER_ERROR);
    }

    if (!user) {
      return res.status(404).send(ErrorEnum.MEASUREMENT_NOT_FOUND);
    }

    return res
      .status(200)
      .json(
        user.measurements.find(
          (measurement) => (measurement.date = req.body.date)
        )
      );
  }
);

router.delete(
  "/:measurementId",
  async (req: InjectedRequest, res: Response) => {
    let user: IUser | null;
    try {
      user = await User.findOneAndUpdate(
        {
          _id: req.user!._id,
          measurements: { $elemMatch: { _id: req.params.measurementId } },
        },
        {
          $pull: { measurements: { _id: req.params.measurementId } },
        }
      );
    } catch (error) {
      return res.status(500).send(ErrorEnum.SERVER_ERROR);
    }

    if (!user) {
      return res.status(404).send(ErrorEnum.MEASUREMENT_NOT_FOUND);
    }

    return res.sendStatus(204);
  }
);

export default router;
