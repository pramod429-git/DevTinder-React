import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const handleReview = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err);
    }
  };
  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/review/received", {
        withCredentials: true,
      });
      const store = dispatch(addRequests(res.data.connectionRequest));
      console.log(store);
      console.log(store.payload[0]._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="m-10 flex justify-center text-2xl font-semibold">
        No Requests
      </h1>
    );

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-center font-semibold text-gray-600 text-xl m-5">
          REQUESTS
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>NAME</th>
              <th>ABOUT</th>
              <th>GENDER</th>
              <th>AGE</th>
              <th>DATE</th>
              <th>REVIEW</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {requests.map((request) => {
              const { _id, firstName, lastName, age, gender, about, photoUrl } =
                request.fromUserId;
              //return <h1 key={connection._id}>{firstName + " " + lastName}</h1>;
              return (
                <tr key={_id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={photoUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {firstName + " " + lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{about}</td>
                  <td>{gender}</td>
                  <td>{age}</td>

                  <td>{request.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleReview("Rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleReview("Accepted", request._id)}
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
