export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export interface RegisterResponse {
    status: number;
    message: string;
    fieldErrors?: { [key: string]: string };
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: number;
    message: string;
    token: string;
    fieldErrors?: { [key: string]: string };
}

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profilePhoto: string;
    role: string;
}

export interface Event {
    eventId: number;
    userId: number;
    text: string;
    image: string;
    timestamp: string;  // LocalDateTime can be converted to a string
    isEdited: boolean;
}