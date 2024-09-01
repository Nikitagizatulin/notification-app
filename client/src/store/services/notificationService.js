import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const { REACT_APP_API_URL } = process.env;

export const notificationManagementApi = createApi({
  reducerPath: 'notificationManagementApi',
  tagTypes: ['Notification'],
  baseQuery: fetchBaseQuery({
    baseUrl: REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNotificationDetails: builder.query({
      query: (params) => ({
        url: '/api/notification-details',
        method: 'GET',
        params,
      }),
      providesTags: ['Notification'],
    }),
    updateNotificationDetails: builder.mutation({
      query: (data) => ({
        url: `api/notification-details`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationDetailsQuery,
  useUpdateNotificationDetailsMutation,
} = notificationManagementApi;
