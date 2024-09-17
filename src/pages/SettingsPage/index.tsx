import { Box, Typography } from '@mui/material';
import CustomAppBar from '../../components/CustomAppBar';
function SettingsPage() {
  
  return (
    <Box minHeight="100vh" bgcolor="background.default" sx={{ paddingTop: '64px' }}>
      {/* Custom AppBar */}
      <CustomAppBar />
      <Typography variant="h6" color="text.primary">
        Settings content
      </Typography>
    </Box>
  )
}

export default SettingsPage
