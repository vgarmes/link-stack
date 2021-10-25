import React from 'react';
import useLocalState from '../hooks/useLocalState';
import {
  SectionCenter,
  Button,
  Alert,
  StyledForm,
  FormRow,
} from '../components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

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
    <SectionCenter>
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

            <Button
              type="submit"
              isFullWidth={true}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Reset password'}
            </Button>
          </StyledForm>
        )}
      </Formik>
      <Link to="/register" className="login-link">
        Back to login
      </Link>
    </SectionCenter>
  );
};

export default ForgotPassword;
