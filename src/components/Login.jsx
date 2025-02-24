import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const result = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(result.data.data));
      console.log(result);
      return navigate("/");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data || "Login failed. Please try again.");
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password, gender },
        { withCredentials: true }
      );
      console.log(res?.data?.data);
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center my-7">
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src="https://www.logo.wine/a/logo/Tinder_(app)/Tinder_(app)-Logo.wine.svg"
            alt="Tinder"
            className="rounded-xl -mt-16"
          />
        </figure>
        <div className="card-body items-center text-center -mt-20">
          {/* <form
          className="card-body items-center text-center -mt-20"
          onSubmit={isLoggedIn ? handleLogin : setIsLoggedIn(handleSignup)}
        > */}

          {isLoggedIn ? (
            <>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793l6.674 3.217c.206.1.446.1.652 0L15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  className="grow"
                  placeholder="Email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  required
                  autoComplete="email"
                />
              </label>

              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </label>
            </>
          ) : (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Email ID</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
            </>
          )}

          {error && <p className="text-red-700">{error}</p>}

          <div className="card-actions mt-4">
            <button
              onClick={isLoggedIn ? handleLogin : handleSignup}
              className="btn btn-primary w-60 mx-auto "
            >
              {isLoggedIn ? "Login" : "Signup"}
            </button>
            <p
              className="cursor-pointer hover:underline m-auto"
              onClick={() => setIsLoggedIn((value) => !value)}
            >
              {isLoggedIn
                ? "New User? Please Signup"
                : "Existing User? Please Login"}
            </p>
          </div>
          <p className="text-gray-600 font-bold mt-2 pb-2">
            Discuss with Developers
          </p>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Login;
