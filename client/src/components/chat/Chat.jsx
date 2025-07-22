// import { useContext, useEffect, useRef, useState } from "react";
// import "./chat.scss";
// import { AuthContext } from "../../context/AuthContext";
// import apiRequest from "../../lib/apiRequest";
// import { format } from "timeago.js";
// import { SocketContext } from "../../context/SocketContext";
// import { useNotificationStore } from "../../lib/notificationStore";

// function Chat({ chats }) {
//   const [chat, setChat] = useState(null);
//   const { currentUser } = useContext(AuthContext);
//   const { socket } = useContext(SocketContext);

//   const messageEndRef = useRef();
//   const decrease = useNotificationStore((state) => state.decrease);

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   const handleOpenChat = async (id, receiver) => {
//     try {
//       const res = await apiRequest("/chats/" + id);
//       if (!res.data.seenBy.includes(currentUser.id)) {
//         decrease();
//       }
//       setChat({ ...res.data, receiver });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const text = formData.get("text");

//     if (!text) return;
//     try {
//       const res = await apiRequest.post("/messages/" + chat.id, { text });
//       setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
//       e.target.reset();
//       socket.emit("sendMessage", {
//         receiverId: chat.receiver?.id, // 🔥 FIXED: Added ?. for null safety
//         data: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     const read = async () => {
//       try {
//         await apiRequest.put("/chats/read/" + chat.id);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (chat && socket) {
//       socket.on("getMessage", (data) => {
//         if (chat.id === data.chatId) {
//           setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
//           read();
//         }
//       });
//     }
//     return () => {
//       socket.off("getMessage");
//     };
//   }, [socket, chat]);

//   return (
//     <div className="chat">
//       <div className="messages">
//         <h1>Messages</h1>
//         {chats
//           ?.filter((c) => c.receiver) // 🔥 FIXED: Skip chats with null receiver
//           .map((c) => (
//             <div
//               className="message"
//               key={c.id}
//               style={{
//                 backgroundColor:
//                   c.seenBy.includes(currentUser.id) || chat?.id === c.id
//                     ? "#000000d2"
//                     : "#833ab4",
//               }}
//               onClick={() => handleOpenChat(c.id, c.receiver)}
//             >
//               <img
//                 src={c.receiver?.avatar || "/noavatar.jpg"} //  FIXED: Added ?. and fallback image
//                 alt="User Avatar"
//               />
//               <span>{c.receiver?.username || "Unknown User"}</span> {/* FIXED: Fallback username */}
//               <p>{c.lastMessage || "No messages yet"}</p> {/*  FIXED: Fallback for lastMessage */}
//             </div>
//           ))}
//       </div>

//       {chat && (
//         <div className="chatBox">
//           <div className="top">
//             <div className="user">
//               <img
//                 src={chat.receiver?.avatar || "/noavatar.jpg"} //  FIXED: Added ?. and fallback
//                 alt="User Avatar"
//               />
//               {chat.receiver?.username || "Unknown User"} {/*  FIXED: Fallback username */}
//             </div>
//             <span className="close" onClick={() => setChat(null)}>
//               X
//             </span>
//           </div>
//           <div className="center">
//             {chat.messages.map((message) => (
//               <div
//                 className="chatMessage"
//                 style={{
//                   alignSelf:
//                     message.userId === currentUser.id
//                       ? "flex-end"
//                       : "flex-start",
//                   textAlign:
//                     message.userId === currentUser.id ? "right" : "left",
//                 }}
//                 key={message.id}
//               >
//                 <p>{message.text}</p>
//                 <span>{format(message.createdAt)}</span>
//               </div>
//             ))}
//             <div ref={messageEndRef}></div>
//           </div>
//           <form onSubmit={handleSubmit} className="bottom">
//             <textarea name="text"></textarea>
//             <button>Send</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chat;




import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const decrease = useNotificationStore((state) => state.decrease);

  const messageEndRef = useRef();

  // ✅ local copy of chats to keep sidebar fresh
  const [localChats, setLocalChats] = useState(chats || []);

  // seen chats
  const [seenChats, setSeenChats] = useState([]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
        setSeenChats((prev) => [...prev, id]);
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;

    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, res.data],
      }));

      // ✅ update localChats lastMessage for sender
      setLocalChats((prev) =>
        prev.map((c) =>
          c.id === chat.id ? { ...c, lastMessage: res.data.text } : c
        )
      );

      e.target.reset();

      socket.emit("sendMessage", {
        receiverId: chat.receiver?.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ socket listener always active
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      // update open chat messages if this chat is open
      setChat((prev) => {
        if (prev?.id === data.chatId) {
          return {
            ...prev,
            messages: [...prev.messages, data],
          };
        }
        return prev;
      });

      // ✅ update localChats lastMessage so sidebar updates for receiver
      setLocalChats((prev) =>
        prev.map((c) =>
          c.id === data.chatId ? { ...c, lastMessage: data.text } : c
        )
      );
    };

    socket.on("getMessage", handleReceiveMessage);

    return () => {
      socket.off("getMessage", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <div className={`chat ${chat ? "chat-open" : ""}`}>
      {!chat && (
        <div className="messages">
          <h1>Messages</h1>
          {localChats
            ?.filter((c) => c.receiver)
            .map((c) => (
              <div
                className="message"
                key={c.id}
                style={{
                  backgroundColor:
                    c.seenBy.includes(currentUser.id) ||
                    seenChats.includes(c.id) ||
                    chat?.id === c.id
                      ? "#000000d2"
                      : "#833ab4",
                }}
                onClick={() => handleOpenChat(c.id, c.receiver)}
              >
                <img
                  src={c.receiver?.avatar || "/noavatar.jpg"}
                  alt="User Avatar"
                />
                <div className="message-info">
                  <span>{c.receiver?.username || "Unknown User"}</span>
                  <p>{c.lastMessage || "No messages yet"}</p>
                </div>
              </div>
            ))}
        </div>
      )}

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver?.avatar || "/noavatar.jpg"}
                alt="User Avatar"
              />
              <span>{chat.receiver?.username || "Unknown User"}</span>
            </div>
            <span className="back" onClick={() => setChat(null)}>
              ← Back
            </span>
          </div>

          <div className="center">
            {chat.messages.map((message) => (
              <div
                className={`chatMessage ${
                  message.userId === currentUser.id ? "own" : ""
                }`}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>

          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text" placeholder="Type a message..." />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
