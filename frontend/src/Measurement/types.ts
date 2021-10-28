export interface Measurement extends MeasurementContent {
  _id: string;
}

export interface MeasurementContent {
  bodyWeight: number;
  happinessLevel: number;
  date: Date;
}
