import Image from 'next/image';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
const YesNoModal = (props) => {

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                centered
                dialogClassName="purchase-modal"
            >
                <Modal.Body>
                    <div className="purchase-sma-modal">
                        <Image
                            src="/assets/images/thankyou-icon.webp"
                            alt="The Cutting Center Logo"
                            width={208}
                            height={139}
                            priority={true}
                        />
                        <h4> Thank You <br />
                            for your Purchase!</h4>
                        <p>For successfully order item, you'll
                            receive a confirmation email including order
                            numbers, tracking information and more details.</p>
                        <div className='btn-holder'>
                            <Link href="/shopping-cart" className="btn btn-green w-100">
                                CONTINUE SHOPPING
                            </Link>
                            <Link href="#" className="btn  btn-line black-line w-100" onClick={props.handleClose}>
                                Order List
                            </Link>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default YesNoModal