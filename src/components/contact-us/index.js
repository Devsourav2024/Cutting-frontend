"use client";
import React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { handleSubmitContact } from "@/services/home";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
function ContactUs() {
  const router = useRouter();
  const handleGetQuote = (values, resetForm) => {
    values.contact_type = "contact_us";
    handleSubmitContact(values)
      .then((res) => {
        resetForm();
        router.push("/");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res?.data ? res.data.message : "",
          timer: 4000,
        });
      })
      .catch((err) => console.log(err));
  };
  const quote = {
    mobile: "+971",
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  return (
    <section className="privacy-sec sc-pt-50 sc-pb-50">
      <div className="container">
        <div className="row1">
          <div className="col-md-121 contact-form-sec">
            <h2>Contact Us</h2>
            <div className="row ">
              <div className="d-flex1 col-sm-8 justify-content-center1">
                <div className="col-sm-61">
                  <Formik
                    initialValues={quote}
                    validationSchema={yup.object().shape({
                      name: yup.string()
                      .matches(/^[A-Za-z\s]*$/, "Name should only contain letters")
                      .required("Name is required"),
                      email: yup
                        .string()
                        .matches(
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          "Please enter a valid email"
                        )
                        .email("Invalid Email Address")
                        .required("Email is required"),
                      mobile: yup
                        .string()
                        .matches(
                          /^\+971[0-9]{8,9}$/,
                          "Invalid Contact Number"
                        )
                        .required("Contact number is required"),
                      // .length(12, "Exact 12 digits are allowed"),
                      subject: yup.string(),
                      message: yup.string(),
                    })}
                    onSubmit={(values, { resetForm }) => {
                      handleGetQuote(values, resetForm);
                    }}
                  >
                    {({ errors, touched, setFieldValue }) => (
                      <Form className="modal-panel">
                        <div className="form-row">
                          <div className="form-group-contact col-md-12">
                            <label>Name*</label>
                            <Field
                              className="form-control"
                              type="text"
                              placeholder="Enter Name"
                              name="name"
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                const lettersOnly = inputValue.replace(/[^A-Za-z\s]/g, ""); // Remove non-letter characters
                                setFieldValue("name", lettersOnly);
                              }}
                            />
                            {touched.name && errors.name && (
                              <div className="text-danger mt-1">
                                {errors.name}
                              </div>
                            )}
                          </div>
                          <div className="form-group-contact">
                            <label>Email*</label>
                            <Field
                              name="email"
                              className="form-control"
                              placeholder="Enter Email Address"
                            />
                            {touched.email && errors.email && (
                              <div className="text-danger mt-1">
                                {errors.email}
                              </div>
                            )}
                          </div>
                          <div className="form-group-contact">
                            <label>Contact Number*</label>
                            <Field
                              name="mobile"
                              className="form-control"
                              placeholder="Enter Contact Number"
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                // If input doesn't start with '+971', add it
                                if (!inputValue.startsWith("+971")) {
                                  setFieldValue("mobile", "+971");
                                } else {
                                  // Allow only numbers after +971
                                  const numberPart = inputValue
                                    .slice(4)
                                    .replace(/\D/g, ""); // Remove any non-numeric characters
                                  setFieldValue("mobile", "+971" + numberPart);
                                }
                              }}
                              // type="number"
                            />
                            {touched.mobile && errors.mobile && (
                              <div className="text-danger mt-1">
                                {errors.mobile}
                              </div>
                            )}
                          </div>
                          <div className="form-group-contact">
                            <label>Company Name</label>
                            <Field
                              name="subject"
                              className="form-control"
                              placeholder="Enter Company Name"
                            />
                            {touched.subject && errors.subject && (
                              <div className="text-danger mt-1">
                                {errors.subject}
                              </div>
                            )}
                          </div>
                          <div className="form-group-contact">
                            <label>Message</label>
                            <Field
                              name="message"
                              className="form-control message-box"
                              placeholder="Enter Message "
                              as="textarea"
                            />
                            {touched.message && errors.message && (
                              <div className="text-danger mt-1">
                                {errors.message}
                              </div>
                            )}
                          </div>

                          <div className="form-btn-panel text-center col-12">
                            <button className="btn btn-green" type="submit">
                              Submit
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="contact-page-address">
                  <h5>Address</h5>
                  <div className="green-bullet-contact">
                    <ul>
                      <li className="address">
                        <Link href="tel:+97148231444">
                          <Image
                            src="/assets/images/address-g.png"
                            alt="The Cutting Center"
                            width={24}
                            height={24}
                            priority={true}
                          />
                          <p>
                            597-673 Dubai Investments Park 2, Jebel Ali Dubai
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link href="tel:+97148231444">
                          <Image
                            src="/assets/images/phone-icon-g.png"
                            alt="The Cutting Center"
                            width={24}
                            height={24}
                            priority={true}
                          />
                          <span>+97148231444</span>
                        </Link>
                      </li>
                      <li>
                        <a href="mailto:support@thecuttingcenter.com">
                          <Image
                            src="/assets/images/mail-icon-g.png"
                            alt="The Cutting Center"
                            width={24}
                            height={24}
                            priority={true}
                          />
                          <span>support@thecuttingcenter.com</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
