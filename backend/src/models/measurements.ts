import { Schema, Types } from "mongoose";
import Joi from "joi";

export interface IMeasurement extends Types.Subdocument {
  _id: string;
  bodyWeight: number;
  happinessLevel: number;
  hipWidth: number;
  date: number;
}

export const measurementDatabaseSchema = new Schema({
  bodyWeight: { type: Number, required: true, min: 0 },
  happinessLevel: { type: Number, required: true, min: 0, max: 10 },
  hipWidth: { type: Number, required: false, min: 0 },
  date: { type: Date, required: true, unique: true },
});

export const measurementValidationSchema = Joi.object({
  bodyWeight: Joi.number().required().min(0),
  happinessLevel: Joi.number().required().min(0).max(10),
  hipWidth: Joi.number().min(0),
  date: Joi.date().required(),
});
