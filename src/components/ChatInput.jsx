import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({ handlerSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handlerEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handlerEmojiClick = (e, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handlerSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handlerEmojiPickerHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handlerEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="type messenger...."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="button">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

export default ChatInput;

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  align-items: center;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff008c;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9186f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #090420;
          width: 5px;
          &-thumb {
            background-color: #9186f3;
          }
        }

        .emoji.categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9186f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    background-color: #ffffff34;
    color: #ccc;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    input {
      padding: 0.3rem 0.2rem;
      width: 90%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      &::placeholder {
        font-size: 12px;
        align-items: center;
        display: flex;
        justify-content: center;
      }
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      justify-content: center;
      svg {
        font-size: 1rem;
        color: white;
      }
    }
  }
`;
