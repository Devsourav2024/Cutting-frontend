import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const VideoModal = (props) => {
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
            >
                <Modal.Header
                    closeButton
                ></Modal.Header>
                <Modal.Body>
                    <h4 className='mdoal-title text-center'>Important Disclaimer</h4>
                    <div className="video-container" style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                            src="https://www.youtube.com/embed/K4TOrB7at0Y"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                            }}
                        ></iframe>
                    </div>
                    <div className="btn-holder">
                        <a className="btn btn-green" href="/" rel="noopener noreferrer">
                            <span>Continue</span>
                        </a>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default VideoModal