import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const firebaseApi = createApi({
    reducerPath: 'firebaseApi',
    baseQuery:fetchBaseQuery({ baseUrl: 'http://localhost:8080/firebase-storage-service/api/firebase' }),
    endpoints: (builder) => ({
        getSignedUrl: builder.mutation<{ signedUrl: string; fileName: string }, { fileName: string; contentType: string }>({
            query: (fileData) => ({
                url: '/generate-upload-url',
                method: 'POST',
                params: fileData, // fileName and contentType passed as query params
            }),
        }),
        saveMetadata: builder.mutation<void, { fileName: string; userId: string; fileType: string }>({
            query: (metadata) => ({
                url: '/save-metadata',
                method: 'POST',
                params: metadata, // file metadata passed as query params
            }),
        }),
    }),
});

export const { useGetSignedUrlMutation, useSaveMetadataMutation } = firebaseApi;

