import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      // const res = await axios.get(BASE_URL + "/profile/view", {
      //bypassed because of CORS error
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addUser(res.data.data));
    } catch (err) {
      if (err.status === 400) {
        navigate("/login");
      }
      console.log(err.response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
