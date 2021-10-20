import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import { useSessionContext } from '../context/session-context';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Verify = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoading } = useSessionContext();
  const query = useQuery();

  const verifyToken = async () => {
    setLoading(true);
    try {
      await axios.post('/api/v1/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      verifyToken();
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <h2>There was an error, please double check your verification link</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>Account confirmed!</h2>
      <Link to="/login">Log in</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50vh;
  text-align: center;
  a {
    margin-top: 1rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Verify;
