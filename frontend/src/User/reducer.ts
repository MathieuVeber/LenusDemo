import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../utils/store";
import { User, UserState } from "./types";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../utils/redux";
import { getUser } from "./actions";
import { ErrorEnum } from "../utils/errors";

export const initialState: UserState = {
  current: undefined,
  loading: false,
  error: undefined,
};

export const currentUserSelector = (state: RootState): User | undefined =>
  state.user.current;
export const errorSelector = (state: RootState): ErrorEnum | undefined => {
  return state.user.error;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state) => {
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.current = action.payload.user;
      })
      .addMatcher(isPendingAction("user/"), (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addMatcher(isRejectedAction("user/"), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(isFulfilledAction("user/"), (state) => {
        state.loading = false;
      });
  },
});

export const { resetError } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
