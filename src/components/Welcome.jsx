import React from "react";
import styled from "styled-components";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <h1>robot</h1>
      <h1>
        wellcome ,<span>{currentUser.username}</span>
      </h1>
      <h3>Please select a chat to Start Messenger</h3>
    </Container>
  );
};

export default Welcome;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;
