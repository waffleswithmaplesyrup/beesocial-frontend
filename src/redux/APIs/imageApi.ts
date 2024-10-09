import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export interface Content {
//     contentId: number;
//     text: string;
//     image: string;
//     timestamp: string;  // LocalDateTime can be converted to a string
//     repostedContent: Content | null;
//     userId: number;
//     firstName: string;
//     lastName: string;
//     profilePhoto: string;
//   }

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
  
  export const { useGetImageQuery } = imageApi;