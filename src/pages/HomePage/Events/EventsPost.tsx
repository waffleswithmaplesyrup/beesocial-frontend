import { Card, Box, TextField, Button, Snackbar, IconButton } from "@mui/material";
import { Image } from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import Check Circle Icon
import CloseIcon from '@mui/icons-material/Close'; // Import Close Icon
import React, { useState } from "react";
import { useGetUserByIdQuery, usePostEventMutation } from "../../../redux/APIs/eventsAPI";

const EventsPost: React.FC<{ userId: number, refetchEvents:()=>void}> = ({ userId, refetchEvents }) => {
    const { data: user, error, isLoading } = useGetUserByIdQuery(userId);
    const [postEvent, { isLoading: isPosting }] = usePostEventMutation();

    const [text, setText] = useState(''); // State to manage the input text
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState(''); // State for Snackbar message
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success'); // State for Snackbar severity

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading user</p>;

    const profilePic = user?.profilePhoto;

    // Handle the post event submission
    const handlePostEvent = async () => {
        if (!text.trim()) {
            // Prevent posting if text is empty
            return;
        }

        try {
            // Call the mutation to post the event
            await postEvent({
                userId, // Pass the userId
                text,   // Pass the input text
            }).unwrap();

            // Clear the input field after successful post
            setText('');

            // Set success message and open Snackbar
            setSnackbarMessage('Successfully Posted');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            refetchEvents();
        } catch (error) {
            console.error('Failed to post event:', error);
            // Set error message and open Snackbar
            setSnackbarMessage('Error posting event');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    // Handle Snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Card sx={{ padding: 5, borderRadius: '10px' }}>
                {/* Container for image and name, placed side by side */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    {/* Hexagon Image Holder */}
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#ddd',
                            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            marginRight: 2,
                        }}
                    >
                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt="Event"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <Image sx={{ fontSize: 40, color: 'gray' }} /> // Placeholder icon if no image
                        )}
                    </Box>

                    {/* Text Input for the Post */}
                    <TextField
                        multiline
                        label="Share an Update"
                        fullWidth
                        value={text}
                        onChange={(e) => setText(e.target.value)} // Update text state
                    />
                </Box>

                {/* Post Button */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                    <Box sx={{ flex: 1, marginLeft:6}}>
                        <Button sx={{minWidth:'auto'}}><Image/></Button>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handlePostEvent}
                            disabled={isPosting || !text.trim()} // Disable if posting or input is empty
                        >
                            {isPosting ? 'Posting...' : 'Post'}
                        </Button>
                    </Box>
                </Box>
            </Card>

            {/* Snackbar for feedback messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
                message={
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        {snackbarSeverity === 'success' ? (
                            <CheckCircleIcon style={{ color: 'green', marginRight: 8 }} />
                        ) : (
                            <CloseIcon style={{ color: 'red', marginRight: 8 }} />
                        )}
                        {snackbarMessage}
                    </span>
                }
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </div>
    );
};

export default EventsPost;
