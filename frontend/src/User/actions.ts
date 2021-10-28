import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { sortBy } from "lodash";

import { RootState } from "../utils/store";
import { User } from "./types";
import { api, handleAPIError } from "../utils/api";

const DEMO_USER_ID = "6178a45736f452180d6d84cf";

export const getUser = createAsyncThunk<
  { user: User },
  { userId?: string },
  { state: RootState }
>("user/getUser", async ({ userId = DEMO_USER_ID }, thunkAPI) => {
  let response: AxiosResponse<User>;
  try {
    response = await api.get(`/users/${userId}`);
  } catch (error) {
    return thunkAPI.rejectWithValue(handleAPIError(error));
  }

  const sortedMeasurements = sortBy(response.data.measurements, ["date"]);

  return {
    user: {
      ...response.data,
      measurements: sortedMeasurements,
    },
  };
});
