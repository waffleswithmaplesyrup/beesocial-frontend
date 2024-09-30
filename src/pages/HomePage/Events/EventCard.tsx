import { Image } from "@mui/icons-material";
import { Card, Box, Typography } from "@mui/material";
import React from "react";
import { useGetUserByIdQuery } from "../../../redux/APIs/eventsAPI";


const EventCard: React.FC<{text: string, eventImage: string, userId:number}> = ({text, eventImage, userId}) => {
    const {data: user, error, isLoading} = useGetUserByIdQuery(userId);
    if(isLoading) return <p>Loading...</p>
    if(error) return <p>Error loading user</p>
    const profilePic = user?.profilePhoto
    const name = user?.firstName+" "+user?.lastName
    const username = user?.username
    const eventText = text
    const eventImg = eventImage

    return (
        <div>
            <Card sx={{padding: 5, boxShadow:1, borderRadius:'10px'}}>
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
                            marginRight: 2 // Adds space between the image and the text
                        }}
                    >
                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt="Event"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover' // Ensures the image covers the entire hexagon
                                }}
                            />
                        ) : (
                            <Image sx={{ fontSize: 40, color: 'gray' }} /> // Placeholder icon if no image
                        )}
                    </Box>
                    <Typography variant="body1" color="text.primary" fontWeight="bold">
                        {name}
                    </Typography>
                    <Typography marginLeft={3} color="grey">
                        {username}
                    </Typography>
                </Box>
                {eventText &&(
                    <Typography marginTop={3} marginLeft={7} marginBottom={ eventImg? 2:0} >
                    {eventText}
                    </Typography>
                )}
                {eventImg &&(
                      <img src={eventImg} width='90%' style={{ marginLeft: 55}}/>
                )}
            </Card>
        </div>
    );
};

export default EventCard;
