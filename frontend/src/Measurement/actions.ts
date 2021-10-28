import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { Measurement, MeasurementContent } from "./types";
import { currentUserSelector } from "../User/reducer";
import { api, handleAPIError } from "../utils/api";
import { ErrorEnum } from "../utils/errors";
import { RootState } from "../utils/store";
import { getUser } from "../User/actions";

export const addMeasurement = createAsyncThunk<
  { measurement: Measurement },
  { content: MeasurementContent },
  { state: RootState }
>("user/measurement/create", async ({ content }, thunkAPI) => {
  const userId = currentUserSelector(thunkAPI.getState())?._id;
  if (!userId) {
    return thunkAPI.rejectWithValue(ErrorEnum.USER_NOT_FOUND);
  }

  let response: AxiosResponse<Measurement>;
  try {
    response = await api.post(`/users/${userId}/measurements`, content);
  } catch (error) {
    return thunkAPI.rejectWithValue(handleAPIError(error));
  }
  thunkAPI.dispatch(getUser({}));
  return { measurement: response.data };
});

export const updateMeasurement = createAsyncThunk<
  { measurement: Measurement },
  { content: MeasurementContent; measurementId: string },
  { state: RootState }
>("user/measurement/update", async ({ content, measurementId }, thunkAPI) => {
  const userId = currentUserSelector(thunkAPI.getState())?._id;
  if (!userId) {
    return thunkAPI.rejectWithValue(ErrorEnum.USER_NOT_FOUND);
  }

  let response: AxiosResponse<Measurement>;
  try {
    response = await api.put(
      `/users/${userId}/measurements/${measurementId}`,
      content
    );
  } catch (error) {
    return thunkAPI.rejectWithValue(handleAPIError(error));
  }
  thunkAPI.dispatch(getUser({}));
  return { measurement: response.data };
});

export const deleteMeasurement = createAsyncThunk<
  undefined,
  { measurementId: string },
  { state: RootState }
>("user/measurement/delete", async ({ measurementId }, thunkAPI) => {
  const userId = currentUserSelector(thunkAPI.getState())?._id;
  if (!userId) {
    return thunkAPI.rejectWithValue(ErrorEnum.USER_NOT_FOUND);
  }

  try {
    await api.delete(`/users/${userId}/measurements/${measurementId}`);
  } catch (error) {
    return thunkAPI.rejectWithValue(handleAPIError(error));
  }
  thunkAPI.dispatch(getUser({}));
});
