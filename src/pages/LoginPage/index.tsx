import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginRequest } from "../../types/authTypes.ts";
import { useLoginUserMutation } from "../../redux/APIs/authApi.ts";
import { useGetUserByEmailQuery } from "../../redux/APIs/userApi.ts";

const LoginPage: React.FC = () => {
    const [loginRequest, setLoginRequest] = useState<LoginRequest>({
        email: '',
        password: '',
    });
    const { data: getUserResponse, error: getUserErrorResponse, isLoading } = useGetUserByEmailQuery(loginRequest.email);
    const [loginUser] = useLoginUserMutation();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await loginUser(loginRequest).unwrap();
            if (response.status === 200) {
                // Store token in localStorage
                localStorage.setItem('token', response.token);
                // Check if getUserResponse is available
                if (getUserResponse) {
                    // Serialize and store user data in localStorage
                    localStorage.setItem('user', JSON.stringify(getUserResponse));
                }
                // Navigate to the home page after login
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        }

    };

    const handleCreateAccount = () => {
        // Redirect to create account page logic
        console.log('Create new account clicked');
        navigate('/registration');
    };

    return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                padding={2}
                bgcolor="background.default"
            >
                <Typography variant="h4" color="primary" gutterBottom>
                    Bee Social
                </Typography>
                <Divider sx={{ width: '100%', marginBottom: 2 }} />
                <Typography variant="h6" color="text.primary" gutterBottom>
                    Log in to your Account
                </Typography>
                <Box component="form" sx={{ width: '100%', maxWidth: 400 }}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        placeholder="user@example.com"
                        value={loginRequest.email}
                        onChange={(e) => setLoginRequest({ ...loginRequest, email: e.target.value })}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        placeholder="********"
                        value={loginRequest.password}
                        onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 2 }}
                        onClick={handleLogin}
                    >
                        Log in
                    </Button>
                    <Divider sx={{ width: '100%', marginBottom: 2 }} />
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleCreateAccount}
                    >
                        Create new account
                    </Button>
                </Box>
            </Box>
    );
};

export default LoginPage;