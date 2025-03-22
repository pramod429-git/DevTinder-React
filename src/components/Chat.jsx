import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const userId = user?.userState?._id;
  const [newMessage, setNewMessage] = useState("");
  console.log(newMessage);
  console.log(user?.useState?._id);
  // const userId = user.userState._id;
  // console.log(userId);
  const [message, setMessage] = useState([]);
  const { targetUserId } = useParams();
  console.log(targetUserId);
  const firstName = user?.userState?.firstName;
  console.log(firstName);

  useEffect(() => {
    if (!userId) return;
    //as soon as page load socket connection is made
    const socket = createSocketConnection();
    //join chat event is emitted
    socket.emit("joinChat", {
      firstName: user?.userState?.firstName,
      photoUrl: user?.userState?.photoUrl,
      userId,
      targetUserId,
    });

    socket.on("messageRecieved", ({ photoUrl, firstName, text }) => {
      console.log(firstName + " : " + text);
      setMessage((message) => [...message, { photoUrl, firstName, text }]);
    });

    //once the component unload we need to cleanup socket for unpreditable behaviour
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    console.log(newMessage);
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.userState?.firstName,
      photoUrl: user?.userState?.photoUrl,
      text: newMessage,
      userId,
      targetUserId,
    });
  };

  return (
    <>
      {/* Chat Header */}
      <div className="font-semibold text-lg text-center border-b p-2">Chat</div>
      <div className="w-2/4 h-96 border border-black rounded-lg p-4 m-auto mt-5 flex flex-col-reverse overflow-y-scroll ">
        {/* Messages Area */}
        <div className="chat chat-start  ">
          <div className="">
            {message.map((msg, index) => {
              return (
                <div key={index}>
                  <div className="flex">
                    <p className="chat-header">{msg.firstName}</p>
                    <p className="chat-footer opacity-50 px-3">12.45pm </p>
                  </div>

                  <div className="flex px-2">
                    <div className="chat-bubble flex w-auto m-1">
                      <div className="chat-image avatar ">
                        <div className="w-10 rounded-full ">
                          <img
                            alt="Tailwind CSS chat bubble component"
                            src={msg.photoUrl}
                          />
                        </div>
                      </div>
                      {msg.text}
                    </div>
                    <div className="chat-footer opacity-50 mt-10">seem</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Input Box (Outside Chat Box) */}
      <form
        className="w-2/4 m-auto flex items-center gap-2 mt-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border rounded-md outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={sendMessage}
        >
          Send
        </button>
      </form>
    </>
  );
};

export default Chat;
