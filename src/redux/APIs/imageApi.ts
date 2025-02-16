import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ImagePath {
    imagePath: string;
  }

  export const imageApi = createApi({
    reducerPath: 'imageApi',
    baseQuery: fetchBaseQuery({ 
      baseUrl: 'http://localhost:8080/image-management-service',
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    
    }),
    endpoints: (builder) => ({
      uploadImage: builder.mutation<ImagePath, FormData>({
        query: (formData) => ({
          url: '/uploadImage',
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
  
  export const { useGetImageQuery, useUploadImageMutation } = imageApi;