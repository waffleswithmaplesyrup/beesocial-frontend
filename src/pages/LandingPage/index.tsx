import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box bgcolor="background.default" color="text.primary" minHeight="100vh">
            {/* Header Section */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding={2}
            >
                <Typography variant="h5" color="primary">
                    <img src="/public/favicon.ico" alt="Bee Social Logo" style={{ height: '30px', marginRight: '8px' }} />
                    Bee Social
                </Typography>
                <Box>
                    <Button color="primary" onClick={() => navigate('/discover')}>Discover</Button>
                    <Button color="primary" onClick={() => navigate('/connect')}>Connect</Button>
                    <Button color="primary" onClick={() => navigate('/opportunities')}>Opportunities</Button>
                    <Button variant="outlined" color="primary" sx={{ marginRight: 1 }} onClick={() => navigate('/login')}>
                        Log in
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => navigate('/registration')}>
                        Sign Up
                    </Button>
                </Box>
            </Box>

            {/* Hero Section */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                padding={4}
                minHeight="50vh"
            >
                <Typography variant="h3" gutterBottom>
                    Join the Buzz and Connect with Friends
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Connect, Collaborate, and Grow with AI-Driven Opportunities and Networking
                </Typography>
                <Box mt={2}>
                    <Button variant="contained" color="secondary" sx={{ marginRight: 2 }} onClick={() => navigate('/registration')}>
                        Sign Up Now
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => navigate('/login')}>
                        Log in
                    </Button>
                </Box>
            </Box>

            {/* Features Section */}
            <Box padding={4}>
                <Typography variant="h4" textAlign="center" gutterBottom>
                    Unlock the Power of Bee Social
                </Typography>
                <Typography variant="subtitle1" textAlign="center" color="text.secondary" gutterBottom>
                    Seamless Networking, Job Opportunities, and AI-Powered Insights
                </Typography>
                <Grid container spacing={4} mt={2}>
                    {[
                        {
                            title: 'Connect with Colleagues and Industry Leaders',
                            description:
                                'Easily find and follow people who share your professional interests and goals. Stay up to date on company updates, networking events, and trending topics.',
                        },
                        {
                            title: 'Discover Opportunities',
                            description:
                                'Leverage AI to match your skills with relevant job opportunities. Apply directly within the platform and track your application progress.',
                        },
                        {
                            title: 'AI-Powered Recommendations',
                            description:
                                'Our advanced AI technology suggests networking events, job opportunities, and even the best content to post, based on your unique profile and skills.',
                        },
                        {
                            title: 'Share and Engage',
                            description:
                                'Post company updates, networking events, or share opportunities to boost your visibility. Comment, like, and follow others to keep the conversation going.',
                        },
                    ].map((feature, index) => (
                        <Grid item xs={12} md={3} key={index}>
                            <Typography variant="h6" gutterBottom>
                                {feature.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {feature.description}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* AI-Powered Tools Section */}
            <Box padding={4} bgcolor="#f5f5f5">
                <Typography variant="h4" textAlign="center" gutterBottom>
                    AI-Powered Tools for Smarter Career Growth
                </Typography>
                <Typography variant="subtitle1" textAlign="center" color="text.secondary" gutterBottom>
                    Our AI Enhances Your Networking, Job Search, and Content Creation
                </Typography>
                <Grid container spacing={4} mt={2}>
                    {[
                        {
                            title: 'Intelligent Opportunity Matching',
                            description:
                                'Find job roles that match your skills and career aspirations.',
                        },
                        {
                            title: 'AI-Assisted Content Creation',
                            description:
                                'Receive real-time feedback and suggestions on your posts and comments.',
                        },
                        {
                            title: 'Advanced Post and Comment Moderation',
                            description:
                                'Our AI ensures a professional and respectful community by flagging inappropriate content for review.',
                        },
                    ].map((tool, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Typography variant="h6" gutterBottom>
                                {tool.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {tool.description}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Footer Section */}
            <Box padding={4} textAlign="center">
                <Typography variant="body2" color="text.secondary">
                    Bee Social’s AI assists with personalized career suggestions, whether it’s recommending the right networking event, suggesting content to post, or flagging posts for moderation. Our AI ensures you get the most out of every interaction and opportunity.
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;