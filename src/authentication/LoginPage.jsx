import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/images/login.jpg";
import ffclogo from "../assets/images/FFC-logo.png";
import "./LoginPage.css";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    mobile: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile Number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (values.mobile === "1234567890" && values.password === "password123") {
      navigate("/dashboard");
    } else {
      alert("Invalid mobile number or password");
    }

    setLoading(false);
  };

  const handleMobileChange = (e, setFieldValue) => {
  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
  setFieldValue("mobile", value);
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
        {(formik) => (
          <Form>
            <div className="ffc-logo">
              <img src={ffclogo} alt="ffc-logo" />
            </div>
            <h6>Get Started with BETA Field Force</h6>

            <div className="login-form">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formik.values.mobile}
                onChange={(e) => handleMobileChange(e, formik.setFieldValue)}
                onBlur={formik.handleBlur}
                maxLength={10}
              />
              <ErrorMessage
                name="mobile"
                component="div"
                className="error-message"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />

              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
