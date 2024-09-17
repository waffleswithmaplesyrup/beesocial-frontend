
import { Box, Typography, Container } from '@mui/material';
import CustomAppBar from '../../components/CustomAppBar';
import ToggleThemeButton from '../../components/ToggleThemeButton'; // Adjust the import path as needed
import SunMoonAnimation from '../../components/SunMoonAnimation'; // Adjust the import path as needed

function SettingsPage() {
    return (
        <Box minHeight="100vh" bgcolor="background.default" sx={{ paddingTop: '64px' }}>
            {/* Custom AppBar */}
            <CustomAppBar />

            {/* Sun and Moon Animation */}
            <Box sx={{ width: '100%', overflow: 'hidden' }}> 
                <SunMoonAnimation />
            </Box>

            {/* Settings Content */}
            <Container maxWidth="md" sx={{ padding: 0 }}> {/* Remove default padding */}
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