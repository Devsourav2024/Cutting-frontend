import React from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field } from "formik";
import { handleReview } from "@/services/reviewModal";
import Swal from "sweetalert2";
import * as yup from "yup";
const LeaveReviewModal = (props) => {
  const handleSubmit = (values) => {
    console.log(values);
    // Handle form submission
    handleReview(values, props.id)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Thank you for your feedback!",
          // text: res?.data ? res?.data?.message : "",
          confirmButtonText: "Okay",
          timer: 4000,
        });
        props.setShowReview(false);
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
  };

  return (
    <Modal
      show={props.show}
      centered
      dialogClassName="review-modal"
      onHide={props.handleClose}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h3 className="modal-title-big text-center">Leave Review</h3>
        <Formik
          initialValues={{ rating: 0, review: "" }}
          validationSchema={yup.object().shape({
            review: yup.string().required("Review is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, touched, errors }) => (
            <Form>
              <div className="leave-review-container text-center">
                <p className="mt-4 mb-2">Click the stars to rate us</p>
                <div className="review-star mb-0">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setFieldValue("rating", star)}
                      style={{
                        fontSize: "2rem",
                        cursor: "pointer",
                        margin: "0 5px",
                        color: star <= values.rating ? "#000000" : "#000000",
                      }}
                    >
                      {star <= values.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p>How was your overall experience using the item?</p>
                <div className="review-textarea mb-4">
                  <Field
                    as="textarea"
                    name="review"
                    className="form-control"
                    rows="4"
                    placeholder="Write your review here..."
                  />
                  {touched.review && errors.review && (
                    <div className="text-danger mt-1">{errors.review}</div>
                  )}
                </div>
              </div>

              <div className="btn-holder btn-holder-center">
                <button type="submit" className="btn btn-green btn-sqare">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default LeaveReviewModal;
