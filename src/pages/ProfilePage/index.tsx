import { useParams } from "react-router-dom";

function ProfilePage() {

  const { profileId } = useParams<string>();

  
  return (
    <div>
      profile page {profileId}
    </div>
  )
}

export default ProfilePage
