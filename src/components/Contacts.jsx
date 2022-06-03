import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Contacts = ({ contacts, currentUser, handlerChanges }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSeclected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (contact, index) => {
    setCurrentSeclected(index);
    handlerChanges(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts &&
              contacts.map((contact, index) => (
                <div
                  key={index}
                  className={`contacts1 ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(contact, index)}
                >
                  <div className="avatar">
                    {contact.avatarImage && (
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt="avatar"
                      />
                    )}
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Contacts;

const Container = styled.div`
  display: gird;
  grid-template-rows: 10% 75% 15%;
  overflow: auto;
  background-color: #080420;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    gap: 0.8rem;
    margin: 20px 0;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contacts1 {
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 3rem;
        }
      }
      .username {
        color: white;
        padding-left: 20px;
        font-size: 14px;
      }
    }
  }
  .selected {
    background-color: #9186f3;
  }
  .current-user {
    background-color: green;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
