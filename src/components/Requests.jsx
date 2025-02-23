import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/review/received", {
        withCredentials: true,
      });
      const store = dispatch(addRequests(res.data.connectionRequest));
      console.log(store);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No Requests</h1>;

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
                    <button className="btn btn-secondary">Accept</button>
                    <button className="btn btn-primary mx-2">Reject</button>
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
