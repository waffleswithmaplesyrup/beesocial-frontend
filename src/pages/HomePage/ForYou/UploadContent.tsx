import { Card, Box, TextField, Button, Snackbar, IconButton } from "@mui/material";
import { Image } from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from "react";
import { useCreateContentMutation } from "../../../redux/APIs/contentApi";
import { useUploadImageMutation } from "../../../redux/APIs/imageApi";

interface UserInfo {
  userId: number,
  firstName: string,
  lastName: string,
  profilePhoto: string | null
}

const UploadContent: React.FC<{ userInfo: UserInfo, refetchContent: () => void }> = ({ userInfo, refetchContent }) => {

  const userId = userInfo.userId;
  
  const [postContent, { isLoading: isPosting }] = useCreateContentMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const [text, setText] = useState(''); // State for the input text
  const [image, setImage] = useState<File | null>(null); // State for the selected image
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success'); // Snackbar severity

  const profilePic = userInfo?.profilePhoto;

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

  // Handle content submission
  const handlePostContent = async () => {
    // Check if either text is filled or an image is selected
    if (!text.trim() && !image) return; // Prevent posting if both are empty

    try {
      // Create FormData instance
      const formData = new FormData();
      const contentPayload = {
        userId, // assuming userId is available
        text: text.trim() || "", // Use empty string if text is not provided
      };

      // Append the image file if selected
      if (image) {
        formData.append('image', image);
        // upload image returning the image path
        const data = await uploadImage(formData).unwrap();
        // add image path to contentPayload
        contentPayload.image = data.imagePath;

        // remove image from formData
        formData.delete("image");
      }

      // Append the content data as a JSON string
      formData.append('content', new Blob([JSON.stringify(contentPayload)], { type: 'application/json' }));

      // Call the mutation to post the content
      await postContent(formData).unwrap();

      // Clear input fields after successful post
      setText('');
      setImage(null);
      setPreviewImage(null);

      setSnackbarMessage('Successfully Posted');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      refetchContent(); // Refetch content after successful post
    } catch (error) {
      console.log(error);
      setSnackbarMessage('Error posting content');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }; 

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ border: 1, borderRadius: '10px', padding: 1, marginBottom: 1 }}>
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
            onClick={handlePostContent}
            disabled={isPosting || isUploading || (!text.trim() && !image)}
          >
            {isPosting || isUploading ? 'Posting...' : 'Post'}
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
    </Box>
  );
};

export default UploadContent;
