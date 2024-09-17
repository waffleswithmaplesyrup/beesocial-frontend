import { Box, Typography } from '@mui/material';
import CustomAppBar from '../../components/CustomAppBar';
function ExplorePage() {
  
  return (
    <Box minHeight="100vh" bgcolor="background.default" sx={{ paddingTop: '64px' }}>
      {/* Custom AppBar */}
      <CustomAppBar />
      <Typography variant="h6" color="text.primary">
        Explore page content
      </Typography>
    </Box>
  )
}

export default ExplorePage
