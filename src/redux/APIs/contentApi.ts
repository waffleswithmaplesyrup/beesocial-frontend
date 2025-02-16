import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Content {
    contentId: number;
    text: string;
    image: string;
    timestamp: string;  // LocalDateTime can be converted to a string
    repostedContent: Content | null;
    userId: number;
    firstName: string;
    lastName: string;
    profilePhoto: string;
  }

  export const contentApi = createApi({
    reducerPath: 'contentApi',
    baseQuery: fetchBaseQuery({ 
      baseUrl: 'http://localhost:8080/content-management-service',
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    
    }),
    endpoints: (builder) => ({
      getAllContent: builder.query<Content[], void>({
        query:()=>"/getAllContent"
      }),
      getAllContentFromUser: builder.query<Content[], void>({
        query:(userId)=>`/getAllContentFromUser/${userId}`
      }),
      createContent: builder.mutation<Content, FormData>({
        query: (formData) => ({
          url: '/createContent',
          method: 'POST',
          body: formData,
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
      })
    }),
  });
  
  export const { useGetAllContentQuery, useGetAllContentFromUserQuery, useCreateContentMutation, useGetImageQuery } = contentApi;