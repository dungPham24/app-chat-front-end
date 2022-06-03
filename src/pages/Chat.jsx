import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { allUserRoute, host } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Chatcontainer from "../components/Chatcontainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [isLoaded, setIsloaded] = useState(false);

  const handlerChanges = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
      setIsloaded(true);
    }
  }, [navigate]);

  useEffect(() => {
    const Chat = async () => {
      const datas = JSON.parse(localStorage.getItem("chat-app-user"));
      if (currentUser) {
        const { data } = await axios.get(`${allUserRoute}/${datas._id}`);
        setContacts(data);
      } else {
        navigate("/");
      }
    };
    Chat();
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  return (
    <Container>
      <div className="container">
        <Contacts
          currentUser={currentUser}
          handlerChanges={handlerChanges}
          contacts={contacts}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <Chatcontainer
            socket={socket}
            currentChat={currentChat}
            currentUser={currentUser}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  background-color: #131324;
  align-items: center;
  .container {
    height: 85vh;
    width: 85vw;
    display: grid;
    grid-template-columns: 25% 75%;
    background-color: #00000076;
  }
`;

export default Chat;
