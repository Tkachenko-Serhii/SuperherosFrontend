import { configureStore } from "@reduxjs/toolkit";
import { superheroApi } from "./superheros/superheroSlice";

const store = configureStore({
  reducer: {
    [superheroApi.reducerPath]: superheroApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(superheroApi.middleware),
});

export default store;
