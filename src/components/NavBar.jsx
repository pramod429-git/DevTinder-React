import axios from "axios";
import { FaComputer } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { userState } = user;
  console.log(user);

  const handleLogout = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(addUser());
    navigate("/login");
  };
  return (
    <div className="navbar bg-accent">
      <div className="flex-1 mx-5">
        <span className="text-black flex items-center">
          <Link to="/" className="btn btn-ghost text-lg">
            <FaComputer className="text-2xl" />
            <span>Dev-Tinder</span>
          </Link>
        </span>
      </div>

      {userState && (
        <div className="flex-none gap-2 mx-5">
          <div className="form-control flex">
            <p className="-pt-3">Welcome {userState.firstName}</p>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link to="/logout" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
