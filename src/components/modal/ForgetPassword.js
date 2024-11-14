import Modal from "react-bootstrap/Modal";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";

const ForgotPassword = ({ show, handleClose, handlePassword }) => {
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
          <h4 className="modal-title text-center mb-4">Forgot Password</h4>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .matches(
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  "Please enter a valid email address!"
                )
                .required("Email is required"),
            })}
            onSubmit={(values) => {
              handlePassword(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="modal-panel">
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <Field
                      className="form-control"
                      type="email"
                      placeholder="Registered Email*"
                      name="email"
                    />
                    {touched.email && errors.email && (
                      <div className="text-danger mt-1">{errors.email}</div>
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgotPassword;
