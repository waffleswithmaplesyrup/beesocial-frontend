import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetUserResponse {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
    profilePhoto: string;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/user-management-service',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUserByEmail: builder.query<GetUserResponse, string> ({
            query: (email) => `user?email=${email}`,
        }),
    }),
});

export const { useGetUserByEmailQuery } = userApi;