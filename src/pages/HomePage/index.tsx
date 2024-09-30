import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import CustomAppBar from '../../components/CustomAppBar';
import EventsPage from './Events/EventsPage';

const HomePage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box minHeight="100vh" bgcolor="background.default" sx={{ paddingTop: '64px' }}> 
            {/* Custom AppBar */}
            <CustomAppBar />

            {/* Tabs Section */}
            <Box sx={{ width: '100%', marginTop: 2 }}>
                <Tabs value={selectedTab} onChange={handleTabChange} centered>
                    <Tab label="For You" />
                    <Tab label="Events" />
                    <Tab label="Opportunities" />
                </Tabs>
            </Box>

            {/* Tab Content */}
            <Box padding={3}>
                {selectedTab === 0 && (
                    <Typography variant="h6" color="text.primary">
                        For You content
                    </Typography>
                )}
                {selectedTab === 1 && (
                    <>
                        {/* <Typography variant="h6" color="text.primary">
                            Events content
                        </Typography> */}
                        <EventsPage/>
                    </>
                )}
                {selectedTab === 2 && (
                    <Typography variant="h6" color="text.primary">
                        Opportunities content
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;