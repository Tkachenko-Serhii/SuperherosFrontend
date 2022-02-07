import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import superherosActions from "./superherosActions";

const filter = createReducer("", {
  [superherosActions.changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  filter,
});
