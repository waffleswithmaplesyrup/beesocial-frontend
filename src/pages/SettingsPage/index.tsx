import { Box, Typography, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { THEMES } from '../../redux/slices/darkThemeSlice';
import CustomAppBar from '../../components/CustomAppBar';
import ToggleThemeButton from '../../components/ToggleThemeButton'; // Adjust the import path as needed
import SunMoonAnimation from '../../components/SunMoonAnimation'; // Adjust the import path as needed

function SettingsPage() {
    // Get the current theme preference from the Redux store
    const themePreference = useSelector((state: RootState) => state.darkTheme.preference);
    
    // Determine the background color based on the theme
    const pageBgColor = themePreference === THEMES.DARK ? '#000033' : '#ADD8E6';

    return (
        <Box minHeight="100vh" width="100vw" bgcolor={pageBgColor} sx={{ paddingTop: '64px', overflow: 'hidden' }}>
            {/* Custom AppBar */}
            <CustomAppBar />

            {/* Sun and Moon Animation */}
            <SunMoonAnimation />

            {/* Settings Content */}
            <Container maxWidth="md" sx={{ paddingTop: '370px' }} > 
                <Typography variant="h4" color="text.primary" gutterBottom>
                    Settings
                </Typography>
                <Box mt={3}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Theme Settings
                    </Typography>
                    <ToggleThemeButton />
                </Box>
            </Container>
        </Box>
    );
}

export default SettingsPage;