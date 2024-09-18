import React, { useState } from 'react';
import { AppBar, Box, Button, Typography, IconButton, Avatar, Menu, MenuItem, Toolbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const CustomAppBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Sample user profile picture URL; replace this with the user's actual profile picture
    const profilePictureUrl = ''; // If no picture is set, it will use the default avatar

    // Helper function to check if a button is active
    const isActive = (path: string) => location.pathname === path;

    // Handle menu open/close
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handle navigation from menu items
    const handleMenuItemClick = (path: string) => {
        navigate(path);
        handleMenuClose();
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#FFCC00', width: '100vw', left: 0 }}>
            <Toolbar>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
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
                        {/* Text Section */}
                        <Box display="flex" flexDirection="column" alignItems="flex-end" mr={1}>
                            <Typography variant="body2" color="#000">
                                John Doe
                            </Typography>
                            <Typography variant="body2" color="#000">
                                @JohnDoe01
                            </Typography>
                        </Box>

                        {/* Profile Icon */}
                        <IconButton onClick={handleMenuOpen}>
                            <Avatar src={profilePictureUrl} sx={{ width: 30, height: 30, backgroundColor: '#d3d3d3' }} />
                        </IconButton>

                        {/* Dropdown Menu */}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => handleMenuItemClick('/profile')}>Profile</MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick('/settings')}>Settings</MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick('/landing')}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;