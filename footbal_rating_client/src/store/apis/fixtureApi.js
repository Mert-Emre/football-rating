import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fixtureApi = createApi({
  reducerPath: "fixture",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://football-rating-server.onrender.com/api",
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      fetchFixture: builder.query({
        providesTags: (result, error, date) => {
          return [date];
        },
        query: (date) => {
          return { url: `/fixture/${date}`, method: "GET" };
        },
      }),
      detailedMatch: builder.query({
        query: (id) => {
          return { url: `/match/${id}`, method: "GET" };
        },
      }),
      checkUserScore: builder.query({
        query: (matchId) => {
          return { url: `/check-user-score/${matchId}`, method: "POST" };
        },
      }),
    };
  },
});

export const { useFetchFixtureQuery, useDetailedMatchQuery } = fixtureApi;
export { fixtureApi };
