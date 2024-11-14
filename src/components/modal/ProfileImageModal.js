import Modal from "react-bootstrap/Modal";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";
// const [fileKey, setFileKey] = useState(Date.now());

const ProfileImageModal = ({ show, handleClose, handleImage }) => {
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
          <h4 className="modal-title text-center mb-4">Change Profile Image</h4>
          <Formik
            initialValues={{ image: "" }}
            validationSchema={yup.object().shape({
              image: yup
                .mixed()
                .required("Image is required")
                .test(
                  "fileSize",
                  "File too large",
                  (value) => value && value.size <= 50000000
                ) // 2MB max size
                .test(
                  "fileFormat",
                  "Unsupported Format",
                  (value) =>
                    value &&
                    ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
                      value.type
                    ) // Allowed formats
                ),
            })}
            onSubmit={(values) => {
              handleImage(values);
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="modal-panel">
                <div className="form-row">
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      className="form-control"
                      name="image"
                      type="file"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                    />
                    {touched.image && errors.image && (
                      <div className="text-danger mt-1">{errors.image}</div>
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

export default ProfileImageModal;
