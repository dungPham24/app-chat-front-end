import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import { Buffer } from "buffer";
import { setAvatarRouter } from "../utils/APIRoutes";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("please selct do avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRouter}/${user._id}`, {
        image: avatar[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("error setting avatar", toastOptions);
      }
    }
  };

  const handlerClick = (index) => {
    setSelectedAvatar(index);
  };
  useEffect(() => {
    const fetch = async () => {
      const datas = [];
      for (let i = 0; i < 4; i++) {
        datas.push(
          await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
        );
      }
      const _datas = datas.reduce((arr, item) => {
        const { data: image } = item;
        const buffer = new Buffer(image);
        return [...arr, buffer.toString("base64")];
      }, []);
      setAvatar(_datas);
    };
    fetch().then(() => setIsloading(false));
  }, []);

  useEffect(() => {
    const Avatar = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      }
    };
    Avatar();
  }, [navigate]);

  return (
    <>
      {isLoading ? (
        <Container>
          <h1>xin chao cac ban</h1>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>pick an avatar profile picture </h1>
          </div>
          <div className="avatars">
            {avatar.map((avatars, index) => {
              return (
                <div
                  onClick={() => handlerClick(index)}
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatars}`}
                    alt="avatar"
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

export default SetAvatar;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3em;
  background-color: #131324;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2em;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem soild #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    text-transform: uppercase;
    font-size: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
