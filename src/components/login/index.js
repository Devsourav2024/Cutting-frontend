"use client";
import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createUser } from "../../services/user";
import { loginUser, handleSocialLogin } from "../../services/user";
import { useAuth } from "@/app/context/AuthContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import eyeOff from "/public/assets/images/eye-off.png";
import eyeOn from "/public/assets/images/eye-on.png";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import ForgotPassword from "../modal/ForgetPassword";
import { sendForgotEmail } from "@/services/forgotPassword";
import { useGoogleLogin } from "@react-oauth/google";

const handleChange = (event) => {
  const { id, value } = event.target;
  setUserDetails({ ...userDetails, [id]: value });
};

const LoginSignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
  name: Yup.string().when("isSignup", {
    is: true,
    then: Yup.string().required("Required"),
  }),
  contactNumber: Yup.string().when("isSignup", {
    is: true,
    then: Yup.string().required("Required"),
  }),
  /*  address: Yup.string().when("isSignup", {
    is: true,
    then: Yup.string().required("Required"),
  }), */
  confirmPassword: Yup.string().when("isSignup", {
    is: true,
    then: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Required"),
  }),
});

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showForgotModal, setShowForgotModal] = useState(false);
  // Password Toggle
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isPasswordVisiblelogin, setIsPasswordVisiblelogin] = useState(false);
  const { login } = useAuth();
  const [rememberChecked, setRememberChecked] = useState(false);
  const router = useRouter(); // Ensure router is initialized
  const ContactNumberRef = useRef(null); // Reference for the first name input
  const emailRef = useRef(null); // Re
  const handleClose = () => {
    setShowForgotModal(false);
  };
  const loginRemember = JSON.parse(localStorage.getItem("loginRemember"));
  const handleFocused = (errors) => {
    if (errors?.contactNumber) {
      ContactNumberRef.current?.focus();
    }
  };
  const handleLogin = async (values) => {
    try {
      const res = await loginUser(values);
      if (res) {
        if (rememberChecked) {
          localStorage.setItem("loginRemember", JSON.stringify(values));
        }
      }
      /* Swal.fire({
        icon: "success",
        title: "Login Successfully",
        text: res?.data ? "Login Successfully" : "",
        confirmButtonText: "Okay",
        timer: 4000,
      }).then(() => {
        login(res.token); // Use context method to set token
        router.push("/profile"); // Redirect to profile page
      }); */

      login(res.token);
    } catch (err) {
      console.log("Errrors==>", err);

      Swal.fire({
        position: "center",
        icon: `error`,
        title: `Username or password does not match`,
        confirmButtonText: "Okay",
        timer: 3000,
      });
    }
  };

  const handleUpdatePassword = (values) => {
    sendForgotEmail(values?.email)
      .then((res) => {
        setShowForgotModal(false);
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: res?.data?.status ? res?.data?.status : "",
          timer: 4000,
        });
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: `error`,
          title: `${err?.error?.response?.data?.message}`,
          timer: 5000,
        });
      });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCreateUser = (values, resetForm) => {
    // Focus on the first name field when switching to signup
    let payload = {};
    payload.first_name = values.fname;
    payload.last_name = values.lname;
    // payload.address = values.address;
    // payload.area = values.area;
    // payload.street = values.street;
    // payload.city = values.city;
    // payload.pin_code = values.pin_code;
    // payload.country = values.country;
    payload.contactNumber = values.contactNumber;
    payload.email = values.email;
    payload.password = values.password;
    payload.confirmPassword = values.confirmPassword;
    createUser(payload)
      .then((res) => {
        {
          resetForm();
          handleTabClick("login");
          Swal.fire({
            icon: "success",
            title: "Account Created Successfully",
            text: res?.data ? "Account Created Successfully" : "",
            timer: 4000,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: `error`,
          title: `${err.response.data.error}`,
          timer: 3000,
        });
      });
  };
  const togglePasswordVisibilityLogin = () => {
    setIsPasswordVisiblelogin(!isPasswordVisiblelogin);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  // Display dynamically year in copyright
  const currentYear = new Date().getFullYear();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google res==>", tokenResponse);
      let resp = await handleSocialLogin(tokenResponse);
      console.log("resp==>", resp);
      // await handleSocialLoginSuccess(tokenResponse.access_token, "google");
      // await handleSocialLoginSuccess(tokenResponse.access_token, "google");
      login(resp.token);
      // router.push("/profile");
    },
    onError: (error) => {
      console.log("Google error==>", error);
      // handleSocialLoginError(error);
    },
  });

  return (
    <section className="login-container">
      <div className="login-container-inner">
        <div className="login-inner">
          <div className="tabs">
            <button
              className={`tab btn-tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => handleTabClick("login")}
            >
              LOGIN
            </button>
            <button
              className={`tab btn-tab ${
                activeTab === "signup" ? "active" : ""
              }`}
              onClick={() => handleTabClick("signup")}
            >
              SIGN UP
            </button>
          </div>
          {console.log(loginRemember, "logged in")}
          {/* Login Form */}
          {activeTab === "login" && (
            <div className="login-form inner-form">
              <Formik
                initialValues={{
                  email: loginRemember ? loginRemember?.email : "",
                  password: loginRemember ? loginRemember?.password : "",
                }}
                validationSchema={yup.object().shape({
                  email: yup
                    .string()
                    .matches(
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      "Please enter a valid email"
                    )
                    .email("Invalid Email Address")
                    .required("Email is required"),
                  password: yup
                    .string()
                    .max(40, "Password not more than 40 characters long")
                    .required("Password is required"),
                })}
                onSubmit={(values, { resetForm }) => {
                  handleLogin(values);
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  setErrors,
                  isValid,
                  touched,
                  setFieldValue,
                }) => (
                  <>
                    {/* <Form className="w-100"> */}
                    <div className="login-header">
                      <h2>Welcome</h2>
                      <p>Log in to your account to continue</p>
                    </div>

                    <div className="form-group-login d-flex col-12">
                      <label htmlFor="email" className="col-5">
                        Email
                      </label>
                      <div className="col-7">
                        <Field
                          name="email"
                          className="form-control"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                    </div>

                    <div className="form-group-login d-flex col-12">
                      <label htmlFor="password" className="col-5">
                        Password
                      </label>
                      <div className="col-7">
                        <Field
                          name="password"
                          type={isPasswordVisiblelogin ? "text" : "password"}
                          className="form-control"
                          placeholder="Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger mt-1"
                        />
                        <Image
                          src={isPasswordVisiblelogin ? eyeOn : eyeOff}
                          alt="Toggle password visibility"
                          onClick={togglePasswordVisibilityLogin}
                          className={ errors?.password ? "toggle-password-login" : "toggle-password"}
                        />
                        {
                          console.log("errors--->", errors)
                        }
                      </div>
                    </div>
                    {console.log("remember", rememberChecked)}
                    <div className="forgot-password">
                      <label className="form-check-label">
                        <Field
                          type="checkbox"
                          name="rememberMe"
                          className="form-check-input"
                          checked={rememberChecked}
                          onClick={() =>
                            setRememberChecked(
                              (rememberChecked) => !rememberChecked
                            )
                          }
                        />
                        <span>Remember me</span>
                      </label>
                      <Link
                        href="#"
                        className="text-decoration-none"
                        onClick={() => setShowForgotModal(true)}
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    {/*  <button
                      type="submit"
                      className="btn btn-green w-100 w-100 mb-3"
                    >
                      LOGIN
                    </button> */}

                    <Button
                      className="btn btn-green w-100 w-100 mb-3"
                      onClick={handleSubmit}
                      // onClick={alert("Testing")}
                    >
                      LOGIN
                    </Button>

                    <div className="ortxt">
                      <span>or</span>
                    </div>
                    <button
                      type="button"
                      className="btn-google w-100"
                      onClick={googleLogin}
                    >
                      <div className="btn-google-img">
                        <Image
                          src="/assets/images/google-icon.png"
                          alt="Google"
                          width={20}
                          height={20}
                          className="me-2"
                        />
                      </div>
                      <div className="btn-google-text">
                        CONTINUE WITH GOOGLE
                      </div>
                    </button>
                    {/* </Form> */}
                  </>
                )}
              </Formik>
            </div>
          )}

          {/* Signup Form */}
          {activeTab === "signup" && (
            <div
              className="signup-form inner-form scroll-singnup"
              style={{ maxHeight: "600px" }}
            >
              <Formik
                initialValues={{
                  fname: "",
                  lname: "",
                  contactNumber: "+971",
                  // pincode: "",
                  // country: "",
                  // area: "",
                  // street: "",
                  // city: "",
                  // address: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={yup.object().shape({
                  fname: yup
                    .string()
                    .matches(/^[A-Za-z\s]*$/, "First Name should only contain letters")
                    .max(40, "First Name not more than 40 characters long")
                    .required("First Name is required"),
                  lname: yup
                    .string()
                     .matches(/^[A-Za-z\s]*$/, "Last Name should only contain letters")
                    .max(40, "Last Name not more than 40 characters long")
                    .required("Last Name is required"),
                  contactNumber: yup
                    .string()
                    .matches(/^\+971[0-9]{8,9}$/, "Invalid Contact Number")
                    // .length(12, "Maximum 12 digits are allowed")
                    .required("Contact Number is required"),
                  email: yup
                    .string()
                    .matches(
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      "Please enter a valid email"
                    )
                    .email("Invalid Email Address")
                    .required("Email is required"),

                  password: yup
                    .string()
                    .min(
                      8,
                      "Password must be at least 8 characters long, password must contain at least one lowercase letter, one uppercase letter, one number, one special character"
                    )
                    .matches(
                      /[a-z]/,
                      "Password must be at least 8 characters long, password must contain at least one lowercase letter, one uppercase letter, one number, one special character"
                    )
                    .matches(
                      /[A-Z]/,
                      "Password must be at least 8 characters long, password must contain at least one lowercase letter, one uppercase letter, one number, one special character"
                    )
                    .matches(
                      /\d/,
                      "Password must be at least 8 characters long, password must contain at least one lowercase letter, one uppercase letter, one number, one special character"
                    )
                    .matches(
                      /[@$!%*?&#]/,
                      "Password must be at least 8 characters long, password must contain at least one lowercase letter, one uppercase letter, one number, one special character"
                    )
                    .required("Password is required"),
                  confirmPassword: yup
                    .string()
                    // .max(8, "confirm password not more than 8 characters long")
                    .oneOf([yup.ref("password")], "Passwords do not match")
                    .required("Confirm password is required"),
                })}
                onSubmit={(values, { resetForm }) => {
                  handleCreateUser(values, resetForm);
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  setErrors,
                  isValid,
                  touched,
                  setFieldValue,
                }) => (
                  <>
                    {/* <Form className="w-100"> */}
                    <div className="login-header mb-3">
                      <h2>Create an Account</h2>
                      <p>Please fill out the form below to get started</p>
                    </div>

                    <div className="form-group-login d-flex col-12">
                      <label htmlFor="fname" className="col-5">
                        First Name
                      </label>
                      <div className="col-7">
                        <Field
                          name="fname"
                          className="form-control"
                          placeholder="First Name"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const lettersOnly = inputValue.replace(/[^A-Za-z\s]/g, ""); // Remove non-letter characters
                            setFieldValue("fname", lettersOnly);
                          }}
                        />
                        <ErrorMessage
                          name="fname"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                    </div>

                    <div className="form-group-login d-flex col-12">
                      <label htmlFor="fname" className="col-5">
                        Last Name
                      </label>
                      <div className="col-7">
                        <Field
                          name="lname"
                          className="form-control"
                          placeholder="Last Name"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const lettersOnly = inputValue.replace(/[^A-Za-z\s]/g, ""); // Remove non-letter characters
                            setFieldValue("lname", lettersOnly);
                          }}
                        />
                        <ErrorMessage
                          name="lname"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                    </div>

                    <div className="form-group-login d-flex col-12">
                      <label htmlFor="fname" className="col-5">
                        Contact Number
                      </label>
                      <div className="col-7">
                        <Field
                          type="text"
                          name="contactNumber"
                          className="form-control"
                          placeholder="Contact Number"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            // If input doesn't start with '+971', add it
                            if (!inputValue.startsWith("+971")) {
                              setFieldValue("contactNumber", "+971");
                            } else {
                              // Allow only numbers after +971
                              const numberPart = inputValue.slice(4).replace(/\D/g, ""); // Remove any non-numeric characters
                              setFieldValue("contactNumber", "+971" + numberPart);
                            }
                          }}
                          innerRef={ContactNumberRef} // Attach ref for focus control
                        />
                        <ErrorMessage
                          name="contactNumber"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                    </div>

                    <div className="form-group-login d-flex col-12">
                      <label htmlFor="email" className="col-5">
                        Email
                      </label>
                      <div className="col-7">
                        <Field
                          name="email"
                          className="form-control"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                    </div>

                    <div className="form-group-login d-flex col-12">
                      <label htmlFor="password" className="col-5">
                        Password
                      </label>
                      <div className="col-7">
                        <Field
                          name="password"
                          type={isPasswordVisible ? "text" : "password"}
                          className="form-control"
                          placeholder="Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger mt-1"
                        />
                        <Image
                          src={isPasswordVisible ? eyeOn : eyeOff}
                          alt="Toggle password visibility"
                          onClick={togglePasswordVisibility}
                          className={(errors?.password && touched?.password  )? errors?.password == "Password is required" ? "toggle-password-login"  : "toggle-password-sign" : "toggle-password"}
                        />
                      </div>
                    </div>
                    {console.log("errors", errors)}

                    <div className="form-group-login d-flex col-12">
                      <label htmlFor="confirm_password" className="col-5">
                        Confirm Password
                      </label>
                      <div className="col-7">
                        <Field
                          name="confirmPassword"
                          type={isConfirmPasswordVisible ? "text" : "password"}
                          className="form-control"
                          placeholder="Confirm Password"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-danger mt-1"
                        />
                        <Image
                          src={isConfirmPasswordVisible ? eyeOn : eyeOff}
                          alt="Toggle confirm password visibility"
                          onClick={toggleConfirmPasswordVisibility}
                          className={(errors?.confirmPassword && touched?.confirmPassword  )? "toggle-password-login" : "toggle-password"}
                        />
                      </div>
                    </div>

                    {/* <button type="submit" className="btn btn-green w-100 w-100">
                      SUBMIT
                    </button> */}

                    <div class="row">
                      <div class="col text-center">
                        <Button
                          className="btn btn-green w-100 mt-2"
                          type="submit"
                          onClick={() => {
                            handleFocused(errors);
                            handleSubmit();
                          }}
                        >
                          SUBMIT
                        </Button>
                      </div>
                    </div>

                    {/*  </Form> */}
                    {/*  )} */}
                  </>
                )}
              </Formik>
            </div>
          )}
        </div>
        {/* <div className="login-footer">
          <div className="logo">
            <Link href="/">
              <Image
                src="/assets/images/logo.png"
                alt="Cutting Center"
                width={274}
                height={117}
                priority={true}
              />
            </Link>
          </div>
          <div className="logo-copyright">
            <p>All Rights Reserved &copy; {currentYear} Blue Rhine</p>
          </div>
        </div> */}
      </div>
      <ForgotPassword
        show={showForgotModal}
        handleClose={handleClose}
        handlePassword={handleUpdatePassword}
      />
    </section>
  );
};

export default Login;
