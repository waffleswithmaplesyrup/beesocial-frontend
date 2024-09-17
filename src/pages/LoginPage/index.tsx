import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Handle login logic here
        console.log('Login clicked');
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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