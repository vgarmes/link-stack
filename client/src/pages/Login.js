import React from 'react';
//import styled from 'styled-components';
import axios from 'axios';
import useLocalState from '../hooks/useLocalState';
import { useSessionContext } from '../context/session-context';
import {
  SectionCenter,
  Button,
  Alert,
  StyledForm,
  FormRow,
} from '../components';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { saveUser } = useSessionContext();
  const history = useHistory();
  const initialValues = { email: '', password: '' };
  const { alert, showAlert, success, setSuccess, hideAlert } = useLocalState();

  const handleSubmit = async (values) => {
    hideAlert();
    const { email, password } = values;
    const loginUser = { email, password };

    try {
      const { data } = await axios.post('/api/v1/auth/login', loginUser);
      showAlert({
        text: `Welcome, ${data.user.username}. Redirecting to dashboard...`,
        type: 'success',
      });
      saveUser(data.user);
      history.push('/dashboard');
      setSuccess(true);
    } catch (error) {
      showAlert({ text: error.response.data.msg });
    }
  };

  return (
    <SectionCenter>
      <h1>Sign in to your Linkstack account</h1>
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
            <FormRow label="password">
              <Field type="password" name="password" />
            </FormRow>

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              size="md"
              colorScheme="primary"
              isFullWidth={true}
            >
              {isSubmitting ? 'Submitting...' : 'Log in'}
            </Button>
          </StyledForm>
        )}
      </Formik>
      <Link to="/register" className="login-link">
        Don't have an account?
      </Link>
    </SectionCenter>
  );
};

export default Login;
