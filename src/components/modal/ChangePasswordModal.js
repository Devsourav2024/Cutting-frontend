import Modal from "react-bootstrap/Modal";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";

const ChangePasswordModal = ({ show, handleClose, handlePassword }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="billing-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className="modal-title text-center mb-4">Change Password</h4>
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
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
                // .max(40, "Confirm Password not more than 40 characters long!")
                .when(
                  "password",
                  (password, field) =>
                    password
                      ? field
                          .required("Confirm Password is required")
                          .oneOf(
                            [yup.ref("password")],
                            "Confirm Password must match the Password"
                          )
                      : field,
                  "Confirm Password must match the Password"
                ),
            })}
            onSubmit={(values) => {
              handlePassword(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="modal-panel">
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="course_name">Password *</label>
                    <Field
                      className="form-control"
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                    />
                    {touched.password && errors.password && (
                      <div className="text-danger mt-1">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="course_name">Confirm Password *</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className="text-danger mt-1">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <div className="form-btn-panel text-center col-12">
                    <button className="btn btn-green" type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
