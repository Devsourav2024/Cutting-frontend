import Link from "next/link";
import Modal from "react-bootstrap/Modal";

const VideoModals = (props) => {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        centered
        dialogClassName="custom-modal-class"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className="modal-title text-center mb-4">How it works</h4>
          <div
            className="video-container"
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%",
              height: 0,
            }}
          >
            <iframe
              src={`${process.env.NEXT_PUBLIC_APP_API_VIDEO_URL}/${props.link}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          </div>
          <div className="btn-holder btn-holder-center mt-4">
            <Link className="btn btn-green" href="/" rel="noopener noreferrer" onClick={props.handleClose}>
              <span>Continue</span>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoModals;
