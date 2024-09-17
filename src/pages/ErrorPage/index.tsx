import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function ErrorPage() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState<number>(3); // Initialize countdown at 2 seconds

    useEffect(() => {
        // Set an interval to update the countdown every second
        const interval = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        // Navigate back after 2 seconds
        const timeout = setTimeout(() => {
            navigate(-1);
        }, 2000);

        // Clean up intervals and timeouts when the component unmounts
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
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
            <Typography variant="h6" sx={{ fontSize: '3rem', marginTop: 2 }}>
                Redirecting back in {countdown}...
            </Typography>
        </Box>
    );
}

export default ErrorPage;