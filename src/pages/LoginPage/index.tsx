import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Divider, Snackbar, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginRequest } from "../../types/types.ts";
import { useLoginUserMutation } from "../../redux/APIs/authApi.ts";
import { useGetUserByEmailQuery } from "../../redux/APIs/userApi.ts";

const LoginPage: React.FC = () => {
    const [validationErrors, setValidationErrors] = useState({
        email: false,
        password: false,
    });
    const [helperTexts, setHelperTexts] = useState({
        email: '',
        password: '',
    });
    const [loginRequest, setLoginRequest] = useState<LoginRequest>({
        email: '',
        password: '',
    });
    const [skip, setSkip] = useState(true);
    const { data: userResponse } = useGetUserByEmailQuery(loginRequest.email, { skip });
    const [loginUser] = useLoginUserMutation();
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity (success, error)
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;

        // Email Validation
        if (!loginRequest.email) {
            setValidationErrors((prev) => ({ ...prev, email: true }));
            setHelperTexts((prev) => ({ ...prev, email: 'Email is required'}));
            isValid = false;
        } else {
            setValidationErrors((prev) => ({ ...prev, email: false }));
            setHelperTexts((prev) => ({ ...prev, email: '' }));
        }

        if (!loginRequest.password) {
            setValidationErrors((prev) => ({ ...prev, password: true }));
            setHelperTexts((prev) => ({ ...prev, password: 'Password is required' }));
            isValid = false;
        } else if (loginRequest.password.length < 8) {
            setValidationErrors((prev) => ({...prev, password: true}));
            setHelperTexts((prev) => ({...prev, password: 'Password must be at least 8 characters'}));
            isValid = false;
        } else {
            setValidationErrors((prev) => ({ ...prev, password: false }));
            setHelperTexts((prev) => ({ ...prev, password: '' }));
        }
        return isValid;
    }

    const handleLogin = async () => {
        try {
            if (!validateForm()){
                console.log('Form is invalid');
                return;
            }
            const response = await loginUser(loginRequest).unwrap();
            if (response.status === 200) {
                // Store token in localStorage
                localStorage.setItem('token', response.token);
                // Request User
                setSkip(false);
            }
        } catch (error) {
            const message = error.data?.message || 'An unknown error occurred';
            const status = error.data?.status || 500;
            if (status === 401) {
                // Show error notification with the error message from the response
                setSnackbarMessage(message);
                setSnackbarSeverity('error'); // Show error color
                setSnackbarOpen(true); // Open the Snackbar
                setValidationErrors({ email: true, password: true });
            }
            if (status === 400) {
                const fieldErrors = error.data?.fieldErrors || {};
                setSnackbarMessage(message);
                setSnackbarSeverity('error'); // Show error color
                setSnackbarOpen(true); // Open the Snackbar
                setValidationErrors({
                    email: !!fieldErrors.email,
                    password: !!fieldErrors.password });
            }
        }
    };

    // Handle after user data is fetched
    useEffect(() => {
        if (userResponse) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(userResponse));
            console.log("User, " + userResponse.email + ", successfully logged in");

            // Navigate to the home page after successful login and user data fetch
            navigate('/home');
        }
    }, [userResponse, navigate]);

    const handleCreateAccount = () => {
        // Redirect to create account page logic
        console.log('Create new account clicked');
        navigate('/registration');
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
                <Typography
                    variant="h4"
                    color="primary"
                    gutterBottom
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                >
                    Bee Social
                </Typography>
                <Divider sx={{ width: '100%', marginBottom: 2 }} />
                <Typography variant="h6" color="text.primary" gutterBottom>
                    Log in to your Account
                </Typography>
                <Box component="form" sx={{ width: '100%', maxWidth: 400 }}>
                    <TextField
                        error={validationErrors.email}
                        helperText={helperTexts.email}
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        placeholder="user@example.com"
                        value={loginRequest.email}
                        onChange={(e) => setLoginRequest({ ...loginRequest, email: e.target.value })}
                    />
                    <TextField
                        error={validationErrors.password}
                        helperText={helperTexts.password}
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
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={5000}
                        onClose={handleSnackbarClose}
                    >
                        <Alert
                            severity={snackbarSeverity}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
    );
};

export default LoginPage;