import React from 'react';
import styled from 'styled-components';
import useLocalState from '../hooks/useLocalState';
import { Alert, StyledForm, FormRow } from '../components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const StyledContainer = styled.div`
  padding: 48px 80px;
  max-width: 640px;
  margin: 64px auto;
  border: 1px solid var(--grey-200);
  border-radius: var(--borderRadius);
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
  email: yup.string().required().email(),
});

const ForgotPassword = () => {
  const initialValues = { email: '' };
  const { alert, showAlert, success, setSuccess, hideAlert } = useLocalState();

  const handleSubmit = async (values) => {
    hideAlert();
    const { email } = values;

    try {
      const { data } = await axios.post('/api/v1/auth/forgot-password', {
        email,
      });
      showAlert({
        text: data.msg,
        type: 'success',
      });
      setSuccess(true);
    } catch (error) {
      showAlert({
        text: error.response.data.msg,
      });
    }
  };

  return (
    <StyledContainer>
      <h1>Enter your Linkstack username to receive a password reset email.</h1>
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
            <FormRow label="email">
              <Field type="email" name="email" />
            </FormRow>

            <button
              type="submit"
              className="btn-small submit-btn"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Reset password'}
            </button>
          </StyledForm>
        )}
      </Formik>
      <Link to="/register" className="login-link">
        Back to login
      </Link>
    </StyledContainer>
  );
};

export default ForgotPassword;
