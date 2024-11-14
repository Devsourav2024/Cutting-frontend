import Modal from "react-bootstrap/Modal";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";

const EditProfileModal = ({
  show,
  handleClose,
  userProfile,
  handleUserUpdate,
}) => {
  const submitHandler = (values) => {
    // Handle form submission
    handleUserUpdate(values);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h4 className="modal-title text-center mb-4">Update Profile Details</h4>
        <Formik
          enableReinitialize={true}
          initialValues={{
            first_name: userProfile[0]?.first_name
              ? userProfile[0]?.first_name
              : "",
            last_name: userProfile[0]?.last_name
              ? userProfile[0]?.last_name
              : "",
            contact_number: userProfile[0]?.contact_number
              ? userProfile[0]?.contact_number
              : "+971",
            // trn_no: userProfile[0]?.trn_no ? userProfile[0]?.trn_no : "",
          }}
          validationSchema={yup.object().shape({
            first_name: yup
              .string()
              .matches(/^[A-Za-z\s]*$/, "First Name should only contain letters")
              .max(40, "First Name not more than 40 characters long")
              .required("First name is required"),
            last_name: yup
              .string()
              .matches(/^[A-Za-z\s]*$/, "Last Name should only contain letters")
              .max(40, "Last Name not more than 40 characters long")
              .required("Last name is required"),
            contact_number: yup
              .string()
              .matches(/^\+971[0-9]{8,9}$/, "Invalid Contact Number")
              .max(13, "maximum 12 digits are allowed")
              .required("Contact Number is required"),
            /* trn_no: yup
              .string()
              .max(20, "maximum 19 digits are allowed")
              .required("TRN no is Required"), */
          })}
          onSubmit={(values) => {
            submitHandler(values);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="modal-panel">
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="email">First Name*</label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Enter First Name"
                    name="first_name"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const lettersOnly = inputValue.replace(/[^A-Za-z\s]/g, ""); // Remove non-letter characters
                      setFieldValue("first_name", lettersOnly);
                    }}
                  />
                  {touched.first_name && errors.first_name && (
                    <div className="text-danger mt-1">{errors.first_name}</div>
                  )}
                </div>

                <div className="form-group col-md-12">
                  <label htmlFor="last_name">Last Name*</label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Enter last Name"
                    name="last_name"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const lettersOnly = inputValue.replace(/[^A-Za-z\s]/g, ""); // Remove non-letter characters
                      setFieldValue("last_name", lettersOnly);
                    }}
                  />
                  {touched.last_name && errors.last_name && (
                    <div className="text-danger mt-1">{errors.last_name}</div>
                  )}
                </div>

                <div className="form-group col-md-12">
                  <label htmlFor="contact_no">Contact Number*</label>
                  <Field
                    className="form-control"
                    placeholder="Enter Contact Numer"
                    name="contact_number"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      // If input doesn't start with '+971', add it
                      if (!inputValue.startsWith("+971")) {
                        setFieldValue("contact_number", "+971");
                      } else {
                        // Allow only numbers after +971
                        const numberPart = inputValue.slice(4).replace(/\D/g, ""); // Remove any non-numeric characters
                        setFieldValue("contact_number", "+971" + numberPart);
                      }
                    }}
                  />
                  {touched.contact_number && errors.contact_number && (
                    <div className="text-danger mt-1">
                      {errors.contact_number}
                    </div>
                  )}
                </div>

                {/* <div className="form-group col-md-12">
                  <Field
                    className="form-control"
                    placeholder="Enter TRN No"
                    name="trn_no"
                  />
                  {touched.trn_no && errors.trn_no && (
                    <div className="text-danger mt-1">{errors.trn_no}</div>
                  )}
                </div> */}

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
  );
};

export default EditProfileModal;
