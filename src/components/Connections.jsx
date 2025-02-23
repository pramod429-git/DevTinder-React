import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConnection();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No connections</h1>;

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-center font-semibold text-gray-600 text-xl m-5">
          CONNECTIONS
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>NAME</th>
              <th>ABOUT</th>
              <th>GENDER</th>
              <th>AGE</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {connections.map((connection) => {
              const { firstName, lastName, age, gender, about, photoUrl } =
                connection;
              //return <h1 key={connection._id}>{firstName + " " + lastName}</h1>;
              return (
                <tr key={connection._id}>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Connections;
