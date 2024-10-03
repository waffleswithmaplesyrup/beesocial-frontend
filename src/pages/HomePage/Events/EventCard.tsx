import { Card, Box, Typography, Button, Snackbar, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useGetUserByIdQuery, useGetImageQuery, usePostAddApplicantMutation, useGetApplicantByIdQuery } from "../../../redux/APIs/eventsApi";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ViewAttendeesModal from "./ViewAttendeesModal";

type OnCloseHandler = (event: React.SyntheticEvent<{}, Event>, reason: "backdropClick" | "escapeKeyDown") => void;

const EventCard: React.FC<{ text: string, eventImage: string | null, userId: number, eventId: number }> = ({ text, eventImage, userId, eventId }) => {
  const { data: user, error: userError, isLoading: userLoading } = useGetUserByIdQuery(userId); // this is the user in the event
  const { refetch: refetchApplicants } = useGetApplicantByIdQuery(eventId);
  
  const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  const [postApplicant, {isLoading: isJoining}] = usePostAddApplicantMutation();

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const[openModal, setOpenModal] = useState(false)
  const handleOpenModal = ()=>setOpenModal(true)
  const handleCloseModal: OnCloseHandler = (event, reason) => {
    console.log('Modal closed due to:', reason);
    setOpenModal(false);
  };

  // Conditionally determine if we should fetch the image, and ensure the eventImage is a string
  const imageToFetch = eventImage ? eventImage : "";  // Assign an empty string if eventImage is null
  const shouldFetchImage = imageToFetch.trim() !== "";
  const { data: imageUrl, error: imageError, isLoading: imageLoading } = useGetImageQuery(imageToFetch, {
    skip: !eventImage,  // Skip image query if the image string is empty
  });

  if (userLoading || (shouldFetchImage && imageLoading)) return <p>Loading...</p>;
  if (userError || (shouldFetchImage && imageError)) return <p>Error loading data</p>;

  const profilePic = user?.profilePhoto;
  const name = user?.firstName + " " + user?.lastName;

  const handleJoinEvent=async()=>{
    if(!storedUser){
      console.log('no stored user')
      return;
    }
    try{
      await  postApplicant({eventId, userId:storedUser.userId}).unwrap()
      console.log (`${storedUser.firstName} ${storedUser.lastName} joined the event with ID: ${eventId}`)
      setSnackbarMessage(`Successfully joined ${storedUser.firstName} ${storedUser.lastName}'Event`)
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      refetchApplicants()
    }catch(error){
      console.log(error)
      if (error && typeof error === 'object' && 'data' in error){
        if(error.data == "user already applied"){
          console.log(error.data)
          setSnackbarMessage(`Already Joined The Event`)
          setSnackbarSeverity('error')
          setSnackbarOpen(true)
          return;
        }else{
          setSnackbarMessage(`Error: ${error.data}`)
          setSnackbarSeverity('error')
          setSnackbarOpen(true)
        }
      }
    }
  }

  const handleSnackbarClose=()=> setSnackbarOpen(false)

  return (
    <Box>
      <Card sx={{ padding: 5, boxShadow: 1, borderRadius: '10px' }}>
        {/* Container for image and name, placed side by side */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Hexagon Image Holder */}
          <Box
            sx={{
              width: 40, // Adjust the size as needed
              height: 40,
              backgroundColor: '#ddd', // Placeholder background color
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // Hexagon shape
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden', // Ensures the image doesn't spill out of the container
              marginRight: 2, // Adds space between the image and the text
            }}
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Event"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Ensures the image covers the entire hexagon
                }}
              />
            ) : (
              <Box sx={{ width: '100%', height: '100%', backgroundColor: 'gray' }} />
            )}
          </Box>
          <Typography variant="body1" color="text.primary" fontWeight="bold">
            {name}
          </Typography>
        </Box>

        {text && (
          <Typography marginTop={3} marginLeft={7} marginBottom={eventImage ? 2 : 0} style={{ whiteSpace: 'pre-wrap' }}>
            {text}
          </Typography>
        )}

        {shouldFetchImage && imageUrl && (
          <img src={imageUrl} width="90%" style={{ marginLeft: 55 }} alt="Event" />
        )}
       
        {storedUser.userId !== userId ?(
          <Box sx={{display:'flex', justifyContent:'flex-end', paddingTop:2}}>
            <Button
            variant="contained"
              color="secondary"
              onClick={handleJoinEvent}
            >
              {isJoining? 'Joining...' : 'Join'}
            </Button>
          </Box>
        ):(
          <Box sx={{display:'flex', justifyContent:'flex-end', paddingTop:2}}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenModal}
            >
              Attendees
            </Button>
          </Box>
        )}
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
      <ViewAttendeesModal eventId={eventId} open={openModal} onClose={handleCloseModal}/>
    </Box>
  );
};

export default EventCard;
