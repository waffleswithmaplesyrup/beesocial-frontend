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
    baseQuery: fetchBaseQuery({ 
      baseUrl: 'http://localhost:8080/event-management-service',
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    
    }),
    endpoints: (builder) => ({
      getAllEvents: builder.query<Event[], void>({
        query: () => '',
      }),
      getUserById: builder.query<User, number>({
        query:(id)=>`/user/${id}`
      }),
      postEvent: builder.mutation<Event, FormData>({
        query: (formData) => ({
            url: '/events',
            method: 'POST',
            body: formData,
        })
      }),
      postAddApplicant: builder.mutation<void, {eventId:number, userId:number}>({
        query: ({eventId, userId}) =>({
          url: '/addApplicant',
          method: "POST",
          params:{
            eventId: eventId,
            userId: userId
          }
        })
      }),
      getImage: builder.query<string, string>({
        query: (filename)=>({
            url:`/getImage`,
            method:'GET',
            params:{
                image: filename,
            },
            responseHandler: (response) => response.blob().then(blob => URL.createObjectURL(blob)),
        })
      }),
      getApplicantById: builder.query<User[], number>({
        query:(id)=>`/applied/${id}`
      }),
      putEditEventById: builder.query<Event, number>({
        query:(eventId)=>({
          url:`/${eventId}`,
          method: 'PUT',
          body: Event
        })
      }),
    }),
  });
  
  export const { useGetAllEventsQuery, useGetUserByIdQuery, usePostEventMutation, useGetImageQuery, usePostAddApplicantMutation, useGetApplicantByIdQuery, usePutEditEventByIdQuery } = eventsApi;