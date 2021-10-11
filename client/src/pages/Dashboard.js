import React from 'react';
import styled from 'styled-components';
import { useSessionContext } from '../context/session-context';

const Dashboard = () => {
  const { user } = useSessionContext();
  return (
    <Wrapper>
      <h2>
        Hello there, <span>{user.username}</span>
      </h2>
      <p>This is your dashboard.</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50vh;
  h2 span {
    text-transform: capitalize;
  }
`;

export default Dashboard;
