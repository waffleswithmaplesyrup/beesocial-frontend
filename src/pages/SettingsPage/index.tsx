import { Box, Typography, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CustomAppBar from '../../components/CustomAppBar';
import ToggleThemeButton from '../../components/ToggleThemeButton'; // Adjust the import path as needed
import SunMoonAnimation from '../../components/SunMoonAnimation'; // Adjust the import path as needed
import { useState, useEffect } from 'react';
import { THEMES } from '../../redux/slices/darkThemeSlice';

function SettingsPage() {
    // Get the current theme preference from the Redux store
    const themePreference = useSelector((state: RootState) => state.darkTheme.preference);
    
    // State to control font color change
    const [isFontUpdated, setIsFontUpdated] = useState(false);

    // Update font color only after the animation completes
    useEffect(() => {
        setIsFontUpdated(false); // Reset font update
        const timer = setTimeout(() => {
            setIsFontUpdated(true);
        }, 3000); // 3 seconds delay to match the animation duration

        return () => clearTimeout(timer);
    }, [themePreference]);

    return (
        <Box minHeight="100vh" width="100vw" sx={{ position: 'relative', overflow: 'hidden' }}>
            {/* Custom AppBar */}
            <CustomAppBar />

            {/* Sun and Moon Animation as the main background */}
            <SunMoonAnimation />

            {/* Settings Content in front of the animation */}
            <Container 
                maxWidth="md" 
                sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '20px',
                    zIndex: 1, 
                    color: isFontUpdated ? (themePreference === THEMES.LIGHT ? '#000' : 'text.primary') : 'transparent', // Change font color based on the state and theme
                    transition: 'color 0.5s ease', // Smooth transition for font color change
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Settings
                </Typography>
                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        Theme Settings
                    </Typography>
                    {/* Toggle Theme Button */}
                    <Box 
                        sx={{ 
                            opacity: isFontUpdated ? 1 : 0, // Change opacity based on the state
                            transition: 'opacity 0.5s ease', // Smooth transition for opacity change
                        }}
                    >
                        <ToggleThemeButton />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default SettingsPage;