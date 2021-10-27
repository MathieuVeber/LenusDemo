import { Document, Schema, model, Model, Types } from "mongoose";
import Joi from "joi";

import { IMeasurement, measurementDatabaseSchema } from "./measurements";

export interface IUser extends Document {
  _id: string;
  name: string;
  measurements: Types.DocumentArray<IMeasurement>;
}

export const userDatabaseSchema = new Schema({
  name: { type: String, required: true },
  measurements: [{ type: measurementDatabaseSchema, default: [] }],
});

export const User = model<IUser, Model<IUser>>("User", userDatabaseSchema);

export const userValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
});
