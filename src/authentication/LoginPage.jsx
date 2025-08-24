import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../redux/slices/authSlice.jsx';
import { showErrorNotification, showSuccessNotification } from '../utility/index.jsx';
import { Button, TextInput } from '@mantine/core';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import loginImg from '../assets/images/login.jpg';
import ffclogo from '../assets/images/FFC-logo.png';
import './LoginPage.css';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    mobile: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginThunk({ username: values.mobile, password: values.password })).unwrap();
      showSuccessNotification('Logged in');
      navigate('/dashboard');
    } catch (err) {
      showErrorNotification(err?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMobileChange = (e, setFieldValue) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFieldValue('mobile', cleaned);
  };

  return (
    <div className="login-page">
      <div className="login-page-img">
        <img src={loginImg} alt="login" />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="ffc-logo">
              <img src={ffclogo} alt="ffc-logo" />
            </div>
            <h4>Get Started with BETA Field Force</h4>

            <div className="login-form">
              <TextInput
                label="Mobile"
                name="mobile"
                placeholder="Mobile Number"
                value={values.mobile}
                onChange={(e) => handleMobileChange(e, setFieldValue)}
                onBlur={handleBlur}
              />
              <div className="error-message">
                <ErrorMessage name="mobile" />
              </div>

              <TextInput
                label="Password"
                name="password"
                placeholder="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                mt="md"
              />
              <div className="error-message">
                <ErrorMessage name="password" />
              </div>

              <Button type="submit" fullWidth mt="lg" loading={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
