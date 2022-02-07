import { createAction } from "@reduxjs/toolkit";

const changeFilter = createAction("superheros/changeFilter");

const superherosActions = { changeFilter };

export default superherosActions;
