import React from 'react';
import { AppBar, Box, Button, Typography, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const CustomAppBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper function to check if a button is active
    const isActive = (path: string) => location.pathname === path;

    return (
        <AppBar position="static" sx={{ backgroundColor: '#FFCC00', padding: '10px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                {/* Logo Section */}
                <Box display="flex" alignItems="center">
                    <IconButton edge="start" color="inherit" onClick={() => navigate('/home')}>
                        <img src="/public/favicon.ico" alt="Bee Social Logo" style={{ height: '30px' }} />
                    </IconButton>
                </Box>

                {/* Navigation Buttons */}
                <Box>
                    <Button 
                        color="inherit" 
                        onClick={() => navigate('/home')}
                        sx={{
                            backgroundColor: isActive('/home') ? '#424242' : 'inherit',
                            color: isActive('/home') ? '#fff' : '#000',
                            borderRadius: 2,
                            margin: '0 10px'
                        }}
                    >
                        Home
                    </Button>
                    <Button 
                        color="inherit" 
                        onClick={() => navigate('/explore')}
                        sx={{
                            backgroundColor: isActive('/explore') ? '#424242' : 'inherit',
                            color: isActive('/explore') ? '#fff' : '#000',
                            borderRadius: 2,
                            margin: '0 10px'
                        }}
                    >
                        Explore
                    </Button>
                    <Button 
                        color="inherit" 
                        onClick={() => navigate('/notifications')}
                        sx={{
                            backgroundColor: isActive('/notifications') ? '#424242' : 'inherit',
                            color: isActive('/notifications') ? '#fff' : '#000',
                            borderRadius: 2,
                            margin: '0 10px'
                        }}
                    >
                        Notifications
                    </Button>
                    <Button 
                        color="inherit" 
                        onClick={() => navigate('/messages')}
                        sx={{
                            backgroundColor: isActive('/messages') ? '#424242' : 'inherit',
                            color: isActive('/messages') ? '#fff' : '#000',
                            borderRadius: 2,
                            margin: '0 10px'
                        }}
                    >
                        Messages
                    </Button>
                </Box>

                {/* User Info Section */}
                <Box display="flex" alignItems="center">
                    <Typography variant="body2" color="text.primary">
                        John Doe
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '8px' }}>
                        @JohnDoe01
                    </Typography>
                    <Box 
                        sx={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: '#d3d3d3',
                            borderRadius: '5px',
                            marginLeft: '10px'
                        }}
                    ></Box>
                </Box>
            </Box>
        </AppBar>
    );
};

export default CustomAppBar;