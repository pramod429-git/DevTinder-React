import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  //we are telling we need to connect backend
  return io(BASE_URL);
};
