import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useLocalState from '../hooks/useLocalState';
import { Alert } from '../components';
import { Link } from 'react-router-dom';

const StyledContainer = styled.div`
  padding-top: 32px;
  max-width: 500px;
  margin: 0 auto;
  h1 {
    padding-bottom: 48px;
  }
  .login-link {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: var(--grey-500);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledForm = styled.form`
  padding-bottom: 1rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--grey-200);

  fieldset {
    border: 0;
  }

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
    font-size: 1rem;
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
    margin-bottom: 2rem;
  }
  .root-url {
    padding-left: 12px;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: var(--letterSpacing);
  }
  .submit-btn {
    width: 100%;
  }
`;

const Register = () => {
  const initialValues = { username: '', email: '', password: '' };

  const [isIncomplete, setIsIncomplete] = useState(true);
  const [values, setValues] = useState({ ...initialValues });
  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
  } = useLocalState();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.username]: e.target.value });
  };

  useEffect(() => {
    setIsIncomplete(Object.values(values).some((value) => value === ''));
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);

    // to avoid injection
    const { username, email, password } = values;
    const newUser = { username, email, password };

    try {
      const { data } = await axios.post(`/api/v1/auth/register`, newUser);

      setSuccess(true);
      setValues({ ...initialValues });
      showAlert({ text: data.msg, type: 'success' });
    } catch (error) {
      console.log(error.response);
      const { msg } = error.response.data;
      showAlert({ text: msg, type: 'danger' });
    }
    setLoading(false);
  };

  return (
    <StyledContainer>
      <h1>Create an account</h1>
      {alert.show && <Alert type={alert.type}>{alert.text}</Alert>}

      <StyledForm onSubmit={handleSubmit}>
        <fieldset disabled={loading || success}>
          <div className="form-row">
            <label htmlFor="username">Username</label>
            <div className="input-box">
              <div className="root-url">linkstack/ </div>
              <input
                type="name"
                name="username"
                value={values.username}
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <div className="input-box">
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <div className="input-box">
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>
        <button
          type="submit"
          className="btn-small submit-btn"
          disabled={isIncomplete}
        >
          {loading ? 'Loading...' : 'Sign up'}
        </button>
      </StyledForm>
      <Link to="/login" className="login-link">
        Already have an account?
      </Link>
    </StyledContainer>
  );
};

export default Register;
