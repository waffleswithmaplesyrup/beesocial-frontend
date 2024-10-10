import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Event, User } from "../../types/types.ts";

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
      putEditEventById: builder.mutation<Event, Event>({
        query:({eventId, ...updatedEvent})=>({
          url:`/${eventId}`,
          method: 'PUT',
          body: updatedEvent
        })
      }),
      deleteEventById: builder.mutation<string, number>({
        query:(eventId)=>({
          url: `/${eventId}`,
          method:'DELETE'
        })
      })
    }),
  });
  
  export const { useGetAllEventsQuery, useGetUserByIdQuery, usePostEventMutation, useGetImageQuery, usePostAddApplicantMutation, useGetApplicantByIdQuery, usePutEditEventByIdMutation, useDeleteEventByIdMutation } = eventsApi;