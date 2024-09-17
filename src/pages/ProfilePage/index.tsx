import { useParams } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import CustomAppBar from '../../components/CustomAppBar';

function ProfilePage() {
  const { profileId } = useParams<string>();
  
  return (
    <Box minHeight="100vh" bgcolor="background.default">
    {/* Custom AppBar */}
    <CustomAppBar />
    <Typography variant="h6" color="text.primary">
      Profile content {profileId}
    </Typography>
  </Box>
  )
}

export default ProfilePage
