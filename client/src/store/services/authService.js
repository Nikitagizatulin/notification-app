// app/services/auth/authService.js
// React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const { REACT_APP_API_URL } = process.env;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    verifyEmail: builder.mutation({
      query: (code) => ({
        url: `api/verification/${code}`,
        method: 'GET',
      }),
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useVerifyEmailMutation } = authApi;
