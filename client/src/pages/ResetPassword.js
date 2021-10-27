import React from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import useLocalState from '../hooks/useLocalState';
import {
  SectionCenter,
  Button,
  Alert,
  StyledForm,
  FormRow,
} from '../components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const validationSchema = yup.object({
  newPassword: yup
    .string()
    .required('This is a required field')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  repeatPassword: yup
    .string()
    .required('This is a required field')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});

const ResetPassword = () => {
  const initialValues = { newEmail: '', repeatPassword: '' };
  const history = useHistory();
  const { alert, showAlert, setLoading, success, setSuccess } = useLocalState();

  const query = useQuery();

  const handleSubmit = async (values) => {
    setLoading(true);
    const { newPassword } = values;
    try {
      await axios.post('/api/v1/auth/reset-password', {
        password: newPassword,
        token: query.get('token'),
        email: query.get('email'),
      });
      setLoading(false);
      setSuccess(true);
      showAlert({
        text: `Success, redirecting to login page...`,
        type: 'success',
      });
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  };

  return (
    <SectionCenter>
      <h1>Enter your new password:</h1>
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
              label="newPassword"
              text="new password"
              errorMessages={<ErrorMessage name="newPassword" />}
            >
              <Field type="password" name="newPassword" />
            </FormRow>
            <FormRow
              label="repeatPassword"
              text="repeat new password"
              errorMessages={<ErrorMessage name="repeatPassword" />}
            >
              <Field type="password" name="repeatPassword" />
            </FormRow>

            <Button
              type="submit"
              colorScheme="secondary"
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

export default ResetPassword;
