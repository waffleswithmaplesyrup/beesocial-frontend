import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Event {
    eventId: number;
    userId: number;
    text: string;
    image: string;
    timestamp: string;  // LocalDateTime can be converted to a string
    isEdited: boolean;
  }
interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    profilePhoto: string;
    role: string;
}

  export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8084' }),
    endpoints: (builder) => ({
      getAllEvents: builder.query<Event[], void>({
        query: () => '',
      }),
      getUserById: builder.query<User, number>({
        query:(id)=>`/user/${id}`
      }),
      postEvent: builder.mutation<Event, Partial<Event>>({
        query:(newEvent)=>({
            url: '/events',
            method: 'POST',
            body: newEvent,
        }),
      })
    }),
  });
  
  export const { useGetAllEventsQuery, useGetUserByIdQuery, usePostEventMutation } = eventsApi;