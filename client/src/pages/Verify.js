import React, { useState, useEffect } from 'react';
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
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <h4>There was an error, please double check your verification link</h4>
    );
  }

  return (
    <div>
      <h2>Account confirmed</h2>
      <Link to="/login">Please login</Link>
    </div>
  );
};

export default Verify;
