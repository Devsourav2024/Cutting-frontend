"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createUser } from "../../services/user";
import { loginUser } from "../../services/user";
import { useAuth } from "@/app/context/AuthContext";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import eyeOff from "/public/assets/images/eye-off.png";
import eyeOn from "/public/assets/images/eye-on.png";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import { sendForgotPassword } from "@/services/forgotPassword";
import { useParams, useRouter } from "next/navigation";

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
  address: Yup.string().when("isSignup", {
    is: true,
    then: Yup.string().required("Required"),
  }),
  confirmPassword: Yup.string().when("isSignup", {
    is: true,
    then: Yup.string()
      .oneOf([Yup.ref("password"), null], "Confirm Password must match the Password")
      .required("Required"),
  }),
});

const ForgotPassword = ({ params }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
  useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberChecked, setRememberChecked] = useState(false);
  const { login } = useAuth();
  const pushRouter = useRouter();
  const router = useParams(); // Ensure router is initialized
  const handleLogin = async (values, token) => {
    const loginRemember = JSON.parse(localStorage.getItem("loginRemember"));
    sendForgotPassword(values.password, token)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "The password has been updated successfully",
          // text: res?.data ? res?.data?.message : "",
          confirmButtonText: "Okay",
          timer: 4000,
        });
        console.log("res", res)
        if (res) {
          if (rememberChecked) {
            localStorage.setItem("loginRemember", JSON.stringify({
              email: loginRemember?.email,
              password: values.password,
              rememberMe:["on"]
            }));
          }
        }
        pushRouter.push("/login");
      })
      .catch((err) =>
        Swal.fire({
          position: "center",
          icon: `error`,
          title: `Password Update Status`,
          text: err?.error ? err?.error?.response?.data?.message : "",
          confirmButtonText: "Okay",
          timer: 3000,
        })
      );
    // try {
    //   const res = await loginUser(values);
    //   Swal.fire({
    //     icon: "success",
    //     title: "Login Successfully",
    //     text: res?.data ? "Login Successfully" : "",
    //     confirmButtonText: "Okay",
    //     timer: 4000,
    //   }).then(() => {
    //     login(res.token); // Use context method to set token
    //     router.push("/profile"); // Redirect to profile page
    //   });
    // } catch (err) {
    //   Swal.fire({
    //     position: "center",
    //     icon: `error`,
    //     title: `Username or Password not matched`,
    //     confirmButtonText: "Okay",
    //     timer: 3000,
    //   });
    // }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Display dynamically year in copyright
  const currentYear = new Date().getFullYear();
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <section className="login-container">
      <div className="login-container-inner">
        <div className="login-inner">
          {/* Login Form */}
          {activeTab === "login" && (
            <div className="login-form inner-form">
              <Formik
                initialValues={{
                  confirmPassword: "",
                  password: "",
                }}
                validationSchema={yup.object().shape({
                  password: yup
                    .string()
                    .min(8, "Password must be at least 8 characters long, password must contain at least one lowercase letter, one uppercase letter, one number, one special character")
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
                    .when("password", (password, field) =>
                      password
                        ? field
                            .required("Confirm password is required")
                            .oneOf(
                              [Yup.ref("password")],
                              "Confirm Password must match the Password"
                            )
                        : field
                    ),
                })}
                onSubmit={(values, { resetForm }) => {
                  handleLogin(values, router?.token);
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
                      <h2>Change Password</h2>
                      <p>Enter new password * </p>
                    </div>

                    <div className="form-group">
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
                          className="toggle-password"
                        />
                    </div>
                    <div className="form-group">
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
                          className="toggle-password"
                        />
                    </div>
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
                    </div>
                    <Button
                      className="btn btn-green w-100 w-100 mb-3"
                      onClick={handleSubmit}
                    >
                      Set Password
                    </Button>
                    {/* </Form> */}
                  </>
                )}
              </Formik>
            </div>
          )}
        </div>
        <div className="login-footer">
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
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
