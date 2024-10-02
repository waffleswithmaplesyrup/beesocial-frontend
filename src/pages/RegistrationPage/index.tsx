import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Divider, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RegisterRequest } from "../../types/authTypes.ts";
import { useRegisterUserMutation } from "../../redux/APIs/authApi.ts";


const RegistrationPage: React.FC = () => {
    const [registerRequest, setRegisterRequest] = useState<RegisterRequest>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
    });
    const [registerUser] = useRegisterUserMutation();
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Snackbar severity (success, error)
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await registerUser(registerRequest).unwrap();
            if (response.status === 201) {
                // Show success notification
                setSnackbarMessage(response.message || 'User has been successfully registered!');
                setSnackbarSeverity('success'); // Show success color
                setSnackbarOpen(true); // Open the Snackbar

                // Navigate to the login page after a delay
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // 2 seconds delay
            } else {
                // Handle unexpected success response with non-201 status
                setSnackbarMessage('Unexpected success response. Please try again.');
                setSnackbarSeverity('warning'); // Show warning color
                setSnackbarOpen(true); // Open the Snackbar
            }

        } catch (error) {
            console.log(error);
            // Extract the status and message from the error response
            const errorMessage = error.data?.message || 'Registration failed. Please try again.';

            // Show error notification with the error message from the response
            setSnackbarMessage(`Error: ${errorMessage}`);
            setSnackbarSeverity('error'); // Show error color
            setSnackbarOpen(true); // Open the Snackbar
        }
    };

    // Close the Snackbar after some time or when user clicks away
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleLogin = () => {
        // Redirect to login page logic
        console.log('Login clicked');
        navigate('/login');
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
                    Register a new Account
                </Typography>
                <Box component="form" sx={{ width: '100%', maxWidth: 400 }}>
                    <TextField
                        label="First Name"
                        type="firstName"
                        fullWidth
                        margin="normal"
                        placeholder=""
                        value={registerRequest.firstName}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, firstName: e.target.value })}
                    />
                    <TextField
                        label="Last Name"
                        type="lastName"
                        fullWidth
                        margin="normal"
                        placeholder=""
                        value={registerRequest.lastName}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, lastName: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        placeholder="user@example.com"
                        value={registerRequest.email}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, email: e.target.value })}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        placeholder="********"
                        value={registerRequest.password}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, password: e.target.value })}
                    />
                    <TextField
                        label="Phone Number"
                        type="phoneNumber"
                        fullWidth
                        margin="normal"
                        placeholder=""
                        value={registerRequest.phoneNumber}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, phoneNumber: e.target.value })}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 2 }}
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                    <Divider sx={{ width: '100%', marginBottom: 2 }} />
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Log in
                    </Button>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={5000}
                        onClose={handleSnackbarClose}
                    >
                        <Alert
                            onClose={handleSnackbarClose}
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

export default RegistrationPage;