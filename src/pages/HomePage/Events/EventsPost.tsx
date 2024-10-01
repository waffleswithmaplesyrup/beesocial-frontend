import { Card, Box, TextField, Button, Snackbar, IconButton } from "@mui/material";
import { Image } from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from "react";
import { useGetUserByIdQuery, usePostEventMutation } from "../../../redux/APIs/eventsAPI";

const EventsPost: React.FC<{ userId: number, refetchEvents: () => void }> = ({ userId, refetchEvents }) => {
  const { data: user, error, isLoading } = useGetUserByIdQuery(userId);
  const [postEvent, { isLoading: isPosting }] = usePostEventMutation();

  const [text, setText] = useState(''); // State for the input text
  const [image, setImage] = useState<File | null>(null); // State for the selected image
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success'); // Snackbar severity

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user</p>;

  const profilePic = user?.profilePhoto;

  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

// Handle event submission
const handlePostEvent = async () => {
    // Check if either text is filled or an image is selected
    if (!text.trim() && !image) return; // Prevent posting if both are empty

    try {
        // Create FormData instance
        const formData = new FormData();
        const eventPayload = {
            userId, // assuming userId is available
            text: text.trim() || "", // Use empty string if text is not provided
        };

        // Append the event data as a JSON string
        formData.append('event', new Blob([JSON.stringify(eventPayload)], { type: 'application/json' }));

        // Append the image file if selected
        if (image) {
            formData.append('image', image);
        }

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        // Call the mutation to post the event
        await postEvent(formData).unwrap();

        // Clear input fields after successful post
        setText('');
        setImage(null);
        setPreviewImage(null);

        setSnackbarMessage('Successfully Posted');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        refetchEvents(); // Refetch events after successful post
    } catch (error) {
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
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
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
                alt="User"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Image sx={{ fontSize: 40, color: 'gray' }} />
            )}
          </Box>

          <TextField
            multiline
            label="Share an Update"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          {/* Image input and preview */}
          <Box sx={{ flex: 1, marginLeft: 6 }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="upload-image"
            />
            <label htmlFor="upload-image">
              <Button component="span" sx={{ minWidth: 'auto' }}>
                <Image />
              </Button>
            </label>
            {previewImage && (
              <img src={previewImage} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />
            )}
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePostEvent}
            disabled={isPosting || (!text.trim() && !image)}
          >
            {isPosting ? 'Posting...' : 'Post'}
          </Button>
        </Box>
      </Card>

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
