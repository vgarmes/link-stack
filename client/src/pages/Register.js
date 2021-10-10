import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useLocalState from '../hooks/useLocalState';
import { Alert } from '../components';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

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
  .error-message {
    color: red;
    font-size: var(--font-size-xs);
    margin-top: 0.5rem;
  }
  .error-message::first-letter {
    text-transform: capitalize;
  }
  .submit-btn {
    width: 100%;
  }
`;

const validationSchema = yup.object({
  username: yup
    .string()
    .required()
    .min(3)
    .max(50)
    .matches(
      /^[a-zA-Z0-9_.]*$/,
      'Usernames may only contain letters, numbers, underscores ("_") and periods (".")'
    ),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
});

const Register = () => {
  const initialValues = { username: '', email: '', password: '' };
  const { alert, showAlert, success, setSuccess, hideAlert } = useLocalState();

  const handleSubmit = async (values) => {
    /*
    return new Promise((res) => {
      setTimeout(() => {
        console.log(values);

        res();
      }, 3000);
    });
    */

    hideAlert();
    // to avoid injection
    const { username, email, password } = values;
    const newUser = { username, email, password };

    try {
      const { data } = await axios.post(`/api/v1/auth/register`, newUser);
      setSuccess(true);
      showAlert({ text: data.msg, type: 'success' });
    } catch (error) {
      console.log(error.response);
      const { msg } = error.response.data;
      showAlert({ text: msg, type: 'danger' });
    }
  };

  return (
    <StyledContainer>
      <h1>Create an account</h1>
      {alert.show && <Alert type={alert.type}>{alert.text}</Alert>}
      <Formik
        validateOnChange={true}
        validateOnMount={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, isValid }) => (
          <StyledForm as={Form}>
            <fieldset disabled={isSubmitting || success}>
              <div className="form-row">
                <label htmlFor="username">Username</label>
                <div className="input-box">
                  <div className="root-url">linkstack/ </div>
                  <Field
                    type="username"
                    name="username"
                    placeholder="Username"
                  />
                </div>
                <div className="error-message">
                  <ErrorMessage name="username" />
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <div className="input-box">
                  <Field type="email" name="email" />
                </div>
                <div className="error-message">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="password">Password</label>
                <div className="input-box">
                  <Field type="password" name="password" />
                </div>
                <div className="error-message">
                  <ErrorMessage name="password" />
                </div>
              </div>
            </fieldset>

            <button
              type="submit"
              className="btn-small submit-btn"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Sign up'}
            </button>
          </StyledForm>
        )}
      </Formik>

      <Link to="/login" className="login-link">
        Already have an account?
      </Link>
    </StyledContainer>
  );
};

export default Register;
