import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const { userState } = user;
  return (
    user && (
      <div>
        <EditProfile user={userState} />
      </div>
    )
  );
};

export default Profile;
