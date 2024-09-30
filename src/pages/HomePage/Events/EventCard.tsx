import { Image } from "@mui/icons-material";
import { Card, Box, Typography } from "@mui/material";
import React from "react";


const EventCard: React.FC = () => {
    const profilePic = "https://media.allure.com/photos/649ca84564be53f2d2c8e9dc/1:1/w_1378,h_1378,c_limit/henry%20cavill%20salt-and-pepper%20era.jpg";
    const name = "Henry Cavill"
    const username = "@HenbeeCavill"
    const eventText = "Event details go here"
    const eventImg = "https://nus.edu.sg/cfg/images/default-source/events-attachment/fdm-presents-introduction-to-sql-october-edm-2023.png?sfvrsn=5644f4ea_2"

    return (
        <div>
            <Card sx={{ border: '1px solid black', borderRadius: '10px', boxShadow: 'none', padding: 2 }}>
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
                    <Typography marginTop={3} marginBottom={ eventImg? 2:0}>
                    {eventText}
                    </Typography>
                )}
                {eventImg &&(
                      <img src={eventImg} width='100%'/>
                )}
            </Card>
        </div>
    );
};

export default EventCard;
