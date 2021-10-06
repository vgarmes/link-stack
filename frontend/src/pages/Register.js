import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const rootUrl = 'http://localhost:5000';

const StyledContainer = styled.div`
  padding-top: 32px;
  max-width: 500px;
  margin: 0 auto;
  h1 {
    padding-bottom: 48px;
  }
`;

const StyledForm = styled.form`
  display: grid;
  gap: 12px;
  padding-bottom: 48px;

  label {
    display: block;
    font-size: var(--smallText);
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  .input-box {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: var(--borderRadius);
    background: var(--grey-100);
    border: 2px solid;
    border-color: transparent;
    &:focus-within {
      border-color: black;
    }
  }
  input,
  textarea {
    outline-color: black;
    border-radius: var(--borderRadius);
    width: 100%;
    padding: 12px;
    background: none;
    border: none;
  }
  input:focus,
  input:active {
    background: none;
    outline: none;
  }
  input::placeholder {
    color: var(--grey-400);
  }

  .form-row {
    margin-bottom: 1rem;
  }
  .root-url {
    padding-left: 12px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: var(--letterSpacing);
  }
  .submit-btn {
    margin-top: 0.5rem;
  }
`;

const Register = () => {
  const [isIncomplete, setIsIncomplete] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [displayMsg, setDisplayMsg] = useState('');

  useEffect(() => {
    setIsIncomplete(Object.values(user).some((value) => value === ''));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${rootUrl}/api/v1/auth/register`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setDisplayMsg('Success!');
      } else {
        const message = await response.json();
        setDisplayMsg(
          message.msg ? JSON.stringify(message.msg) : 'Something went wrong'
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledContainer>
      <h1>Create an account</h1>

      <StyledForm onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <div className="input-box">
            <div className="root-url">linkstack/ </div>
            <input
              type="username"
              name="username"
              value={user.name}
              placeholder="Username"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <div className="input-box">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <div className="input-box">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn-small submit-btn"
          disabled={isIncomplete}
        >
          Sign up
        </button>
        <p className="error-message">{displayMsg}</p>
      </StyledForm>
    </StyledContainer>
  );
};

export default Register;
