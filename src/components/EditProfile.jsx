import { useState } from "react";
import UsersCard from "./UsersCard";
import axios from "axios";
// import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { LiaUserEditSolid } from "react-icons/lia";

const EditProfile = ({ user }) => {
  if (!user) return;
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState(user?.error || "");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    try {
      setError(""); //Clear previous errors not clear the current error
      const res = await axios.patch(
        //Since I am getting CORS error for PACTH method added not used BASE_URL
        // Matches Vite proxy setup
        "/api/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        {
          // Include cookies
          withCredentials: true,
          // Allowed headers
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data);
    }
  };
  return (
    <div className="flex justify-center my-7">
      <div className="flex justify-center items-center mx-3">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body items-center text-center -mt-6">
            <label className="form-control w-full max-w-xs">
              <div>
                <p className="font-semibold text-2xl text-gray-700 ">
                  Edit Profile
                </p>
                <p className="pl-36">
                  <LiaUserEditSolid />
                </p>
              </div>
              <div className="label">
                <span className="label-text">Image</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={photoUrl}
                onChange={(e) => {
                  setPhotoUrl(e.target.value);
                  setError("");
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setError("");
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setError("");
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setError(""); //Clear error when user types
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setError("");
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Bio"
                type="text"
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                  setError("");
                }}
              ></textarea>
            </label>
            {error && <p className="text-red-700">{error}</p>}
            <div className="card-actions mt-4">
              <button className="btn btn-primary w-60" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <UsersCard
          user={{ firstName, lastName, age, gender, photoUrl, about }}
        />
      </div>
      <div>
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile saved successfully.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
