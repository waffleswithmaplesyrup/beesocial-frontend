import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../../types/types.ts";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/auth' }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (registerRequest) => ({
                url: 'register',
                method: 'POST',
                body: registerRequest,
            }),
        }),
        loginUser: builder.mutation<LoginResponse, LoginRequest>({
            query: (loginRequest) => ({
                url: 'login',
                method: 'POST',
                body: loginRequest,
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;