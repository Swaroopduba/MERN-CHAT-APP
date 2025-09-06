import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";  // ✅ v5 uses useHistory

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState(() => {
    // ✅ Initialize from localStorage immediately
    return JSON.parse(localStorage.getItem("userInfo")) || null;
  });
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/"); // redirect to login if no user
    }
  }, [user, history]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
