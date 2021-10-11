import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useLocalState from '../hooks/useLocalState';
import { Alert, StyledForm, FormRow } from '../components';
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
    hideAlert();

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
        {({ isSubmitting, isValid }) => (
          <StyledForm as={Form} isDisabled={[isSubmitting, success]}>
            <FormRow
              label="username"
              fixedPlaceholder="linkstack/"
              errorMessages={<ErrorMessage name="username" />}
            >
              <Field type="username" name="username" placeholder="Username" />
            </FormRow>

            <FormRow
              label="email"
              errorMessages={<ErrorMessage name="email" />}
            >
              <Field type="email" name="email" />
            </FormRow>

            <FormRow
              label="password"
              errorMessages={<ErrorMessage name="password" />}
            >
              <Field type="password" name="password" />
            </FormRow>

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
