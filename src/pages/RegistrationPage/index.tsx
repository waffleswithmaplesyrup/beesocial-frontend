import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Divider, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RegisterRequest } from "../../types/types.ts";
import { useRegisterUserMutation } from "../../redux/APIs/authApi.ts";


const RegistrationPage: React.FC = () => {
    const [validationErrors, setValidationErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        phoneNumber: false,
    });
    const [helperTexts, setHelperTexts] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
    });
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
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Snackbar severity (success, error, warning)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Close the Snackbar after some time or when user clicks away
    const handleSnackbarClose = () => {
        if (snackbarSeverity === 'success') {
            navigate('/login');
        }
        setIsLoading(false);
        setSnackbarOpen(false);
    };

    const handleLogin = () => {
        // Redirect to login page logic
        console.log('Login clicked');
        navigate('/login');
    };

    // Form Validation
    const validateForm = () => {
        let isValid = true;

        // First Name Validation
        if (!registerRequest.firstName) {
            setValidationErrors((prev) => ({ ...prev, firstName: true }));
            setHelperTexts((prev) => ({ ...prev, firstName: 'First name is required' }));
            isValid = false;
        } else if (registerRequest.firstName.length < 3 || registerRequest.firstName.length > 30) {
            setValidationErrors((prev) => ({ ...prev, firstName: true }));
            setHelperTexts((prev) => ({ ...prev, firstName: 'First name must be 3-30 characters' }));
            isValid = false;
        } else {
            setValidationErrors((prev) => ({ ...prev, firstName: false }));
            setHelperTexts((prev) => ({ ...prev, firstName: '' }));
        }

        // Last Name Validation
        if (!registerRequest.lastName) {
            setValidationErrors((prev) => ({ ...prev, lastName: true }));
            setHelperTexts((prev) => ({ ...prev, lastName: 'Last name is required' }));
            isValid = false;
        } else if (registerRequest.lastName.length < 3 || registerRequest.lastName.length > 30) {
            setValidationErrors((prev) => ({ ...prev, lastName: true }));
            setHelperTexts((prev) => ({ ...prev, lastName: 'Last name must be 3-30 characters' }));
            isValid = false;
        } else {
            setValidationErrors((prev) => ({ ...prev, lastName: false }));
            setHelperTexts((prev) => ({ ...prev, lastName: '' }));
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!registerRequest.email) {
            setValidationErrors((prev) => ({ ...prev, email: true }));
            setHelperTexts((prev) => ({ ...prev, email: 'Email is required' }));
            isValid = false;
        } else if (!emailRegex.test(registerRequest.email)) {
            setValidationErrors((prev) => ({ ...prev, email: true }));
            setHelperTexts((prev) => ({ ...prev, email: 'Invalid email address' }));
            isValid = false;
        } else {
            setValidationErrors((prev) => ({ ...prev, email: false }));
            setHelperTexts((prev) => ({ ...prev, email: '' }));
        }

        // Password Validation
        if (!registerRequest.password) {
            setValidationErrors((prev) => ({ ...prev, password: true }));
            setHelperTexts((prev) => ({ ...prev, password: 'Password is required' }));
            isValid = false;
        } else if (registerRequest.password.length < 8) {
            setValidationErrors((prev) => ({ ...prev, password: true }));
            setHelperTexts((prev) => ({ ...prev, password: 'Password must be at least 8 characters' }));
            isValid = false;
        } else {
            setValidationErrors((prev) => ({ ...prev, password: false }));
            setHelperTexts((prev) => ({ ...prev, password: '' }));
        }

        // Phone Number Validation
        const phoneRegex = /^[0-9\s-()+]+$/;
        if (!registerRequest.phoneNumber) {
            setValidationErrors((prev) => ({ ...prev, phoneNumber: true }));
            setHelperTexts((prev) => ({ ...prev, phoneNumber: 'Phone number is required' }));
            isValid = false;
        } else if (!phoneRegex.test(registerRequest.phoneNumber)) {
            setValidationErrors((prev) => ({ ...prev, phoneNumber: true }));
            setHelperTexts((prev) => ({ ...prev, phoneNumber: 'Invalid phone number format' }));
            isValid = false;
        } else {
            setValidationErrors((prev) => ({ ...prev, phoneNumber: false }));
            setHelperTexts((prev) => ({ ...prev, phoneNumber: '' }));
        }

        return isValid;
    };

    const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning') => {
        setSnackbarMessage(message); // Show message
        setSnackbarSeverity(severity); // Show severity color
        setSnackbarOpen(true); // Open the Snackbar
    };

    // Register
    const handleRegister = async () => {
        setIsLoading(true);
        // Validate Form
        if (!validateForm()) {
            showSnackbar('Form is invalid!', 'error');
            setIsLoading(false);
            return;
        }
        try {
            // Request to register user
            const response = await registerUser(registerRequest).unwrap();
            // Success
            showSnackbar(response.message || ' User has been successfully registered!', 'success');
        } catch (error) {
            if (error.status === 409) {
                setValidationErrors((prev) => ({ ...prev, email: true }));
                setHelperTexts((prev) => ({ ...prev, email: error.data?.message || 'Email already exists' }));
            }
            // Error: Extract the status and message from the error response
            const errorMessage = error.data?.message || 'Registration failed. Please try again.';
            showSnackbar(errorMessage, 'error');
            setIsLoading(false);
        }
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
                    Register a new Account
                </Typography>
                <Box component="form" sx={{ width: '100%', maxWidth: 400 }}>
                    <TextField
                        error={validationErrors.firstName}
                        helperText={helperTexts.firstName}
                        label="First Name"
                        type="firstName"
                        fullWidth
                        margin="normal"
                        placeholder=""
                        value={registerRequest.firstName}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, firstName: e.target.value })}
                    />
                    <TextField
                        error={validationErrors.lastName}
                        helperText={helperTexts.lastName}
                        label="Last Name"
                        type="lastName"
                        fullWidth
                        margin="normal"
                        placeholder=""
                        value={registerRequest.lastName}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, lastName: e.target.value })}
                    />
                    <TextField
                        error={validationErrors.email}
                        helperText={helperTexts.email}
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        placeholder="user@example.com"
                        value={registerRequest.email}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, email: e.target.value })}
                    />
                    <TextField
                        error={validationErrors.password}
                        helperText={helperTexts.password}
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        placeholder="********"
                        value={registerRequest.password}
                        onChange={(e) => setRegisterRequest({ ...registerRequest, password: e.target.value })}
                    />
                    <TextField
                        error={validationErrors.phoneNumber}
                        helperText={helperTexts.phoneNumber}
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
                        {isLoading ? (<CircularProgress size={24} color={"inherit"}/>) : ('Register')}
                    </Button>
                    <Divider sx={{ width: '100%', marginBottom: 2 }} />
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
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