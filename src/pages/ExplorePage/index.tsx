import { Box, Typography } from '@mui/material';
import CustomAppBar from '../../components/CustomAppBar';
function ExplorePage() {
  
  return (
    <Box minHeight="100vh" bgcolor="background.default">
      {/* Custom AppBar */}
      <CustomAppBar />
      <Typography variant="h6" color="text.primary">
        Explore content
      </Typography>
    </Box>
  )
}

export default ExplorePage
