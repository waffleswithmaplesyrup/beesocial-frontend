import { useNavigate } from "react-router-dom";
import UploadContent from "./UploadContent"
import { Box } from "@mui/material";
import { Content, useGetAllContentQuery } from "../../../redux/APIs/contentApi";
import ContentCard from "./ContentCart";

function ForYouPage() {

  const { data: contentList, error: contentListError, isLoading: contentListLoading, refetch } = useGetAllContentQuery();

  const navigate = useNavigate();
  
  const userIsLoggedIn = localStorage.getItem('user') !== null;
  
  if (!userIsLoggedIn) {
    // reroute the user back to login page if they're not logged in
    navigate('/login');
  }
  
  const storedUser = userIsLoggedIn ? JSON.parse(localStorage.getItem('user') as string) : null;

  // Conditional rendering based on the loading and error states
  if (contentListLoading) return <p>Loading...</p>;
  if (contentListError) return <p>Error loading content</p>;

  return (
    <div>
      <UploadContent userInfo={storedUser} refetchContent={refetch} />
      {/* Display the contents */}
      <Box sx={{ border: 1, borderRadius: '10px', padding: 1 }}>
          {contentList?.map((content: Content) => (
            <div key={content.contentId} style={{ padding: 3 }}>
              <ContentCard content={content} text={content.text} contentImage={content.image} userId={content.userId} />
            </div>
          ))}
      </Box>
    </div>
  )
}

export default ForYouPage
