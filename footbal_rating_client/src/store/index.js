import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authReducer, setCredentials } from "./slices/authSlice";
import { fixtureApi, useFetchFixtureQuery } from "./apis/fixtureApi";
import { dateReducer, setPickerDate } from "./slices/dateSlice";
import {
  scoresReducer,
  addPoint,
  resetScores,
  allowUser,
  disallowUser,
  addUserPointsFromDb,
  addTotalPointsFromDb,
} from "./slices/scoresSlice";
import { pathReducer, changePath } from "./slices/pathSlice";

const store = configureStore({
  reducer: {
    date: dateReducer,
    auth: authReducer,
    scores: scoresReducer,
    path: pathReducer,
    [fixtureApi.reducerPath]: fixtureApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(fixtureApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  store,
  setPickerDate,
  setCredentials,
  useFetchFixtureQuery,
  addPoint,
  resetScores,
  allowUser,
  disallowUser,
  addUserPointsFromDb,
  addTotalPointsFromDb,
  changePath,
};
