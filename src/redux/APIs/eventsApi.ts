import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Event {
    eventId: number;
    userId: number;
    text: string;
    image: string;
    timestamp: string;  // LocalDateTime can be converted to a string
    isEdited: boolean;
  }

  export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8084' }),
    endpoints: (builder) => ({
      getAllEvents: builder.query<Event[], void>({
        query: () => '',
      }),
    }),
  });
  
  export const { useGetAllEventsQuery } = eventsApi;