import { Box, Typography } from "@mui/material"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function ErrorPage() {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      // goes back to previous page after 2 seconds
      navigate(-1);
    }, 2000);
  }, [navigate]);

  return (
    <Box
      component='div'
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
      }}
    >
      <SentimentVeryDissatisfiedIcon fontSize='large' />
      <Typography variant="h2">404</Typography>
      <Typography variant="h4">Page not found</Typography>
      <Typography variant="h6">Redirecting back...</Typography>
    </Box>
  )
}

export default ErrorPage
