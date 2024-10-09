import { Card, Box, Typography } from "@mui/material";
import React from "react";
import { useGetImageQuery } from "../../../redux/APIs/imageApi";
import { Content } from "../../../redux/APIs/contentApi";
// import { useGetUserByIdQuery, useGetImageQuery } from "../../../redux/APIs/eventsApi";

const ContentCard: React.FC<{ content: Content, text: string, contentImage: string | null, userId: number }> = ({ content, text, contentImage, userId }) => {
  // const { data: user, error: userError, isLoading: userLoading } = useGetUserByIdQuery(userId);

  // Conditionally determine if we should fetch the image, and ensure the contentImage is a string
  const imageToFetch = content.image ? content.image : "";  // Assign an empty string if contentImage is null
  const shouldFetchImage = imageToFetch.trim() !== "";
  const { data: imageUrl, error: imageError, isLoading: imageLoading } = useGetImageQuery(imageToFetch, {
    skip: !shouldFetchImage,  // Skip image query if the image string is empty
  });

  if (shouldFetchImage && imageLoading) return <p>Loading...</p>;
  if (shouldFetchImage && imageError) return <p>Error loading data</p>;

  const profilePic = content.profilePhoto;
  const name = content.firstName + " " + content.lastName;
  console.log("image url: ", imageUrl);
  return (
    <div>
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

        {content.text && (
          <Typography marginTop={3} marginLeft={7} marginBottom={contentImage ? 2 : 0} style={{ whiteSpace: 'pre-wrap' }}>
            {content.text}
          </Typography>
        )}

        {shouldFetchImage && imageUrl && (
          <img src={imageUrl} width="90%" style={{ marginLeft: 55 }} alt="Content" />
        )}
      </Card>
    </div>
  );
};

export default ContentCard;
