import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UsersCard from "./UsersCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      const action = dispatch(addFeed(res.data));
      console.log(action);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  console.log(feed);
  // if (!feed) return;
  console.log(feed);
  if (feed.length <= 0)
    return (
      <h1 className="flex justify-center m-10 text-2xl font-serif">
        No User Found
      </h1>
    );
  return (
    feed && (
      <div className="flex justify-center m-5">
        <UsersCard user={feed[0]} />
        {console.log(feed[0])}
      </div>
    )
  );
};

export default Feed;
