import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSessionContext } from '../context/session-context';
import axios from 'axios';
import { Avatar } from '../components';

const Dashboard = () => {
  const { user } = useSessionContext();
  const [linkstack, setLinkstack] = useState();

  const fetchLinkstack = async () => {
    try {
      const { data } = await axios.get(`/api/v1/linkstacks/${user.username}`);
      if (data && data.linkstack) {
        setLinkstack(data.linkstack);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLinkstack();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <h2>
        Hello there, <span>{user.username}</span>
      </h2>
      <p>This is your dashboard.</p>
      <Avatar
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="avatar"
        size={96}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 span {
    text-transform: capitalize;
  }
`;

export default Dashboard;
