import { AnyAction } from "@reduxjs/toolkit";

export const isPendingAction =
  (prefix: string) =>
  (action: AnyAction): action is AnyAction =>
    action.type.startsWith(prefix) && action.type.endsWith("/pending");

export const isRejectedAction =
  (prefix: string) =>
  (action: AnyAction): action is AnyAction =>
    action.type.startsWith(prefix) && action.type.endsWith("/rejected");

export const isFulfilledAction =
  (prefix: string) =>
  (action: AnyAction): action is AnyAction =>
    action.type.startsWith(prefix) && action.type.endsWith("/fulfilled");
