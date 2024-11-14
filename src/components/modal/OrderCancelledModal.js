import React from "react";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
const OrderCancelledModal = (props) => {
  // console.log("props==>", props);
  const router = useRouter();
  return (
    <Modal
      show={props.show}
      centered
      dialogClassName="cancel-modal"
      onHide={props.handleClose}
      backdrop="static" // Prevents closing on backdrop click
      keyboard={false} // Prevents closing with the "Escape" key
    >
      <Modal.Body>
        <div className="calc-img">
          <Image
            src="/assets/images/big-tick.jpg"
            alt="Order Cancelled"
            width={163}
            height={163}
          />
        </div>
        <h3 className="text-center">Order Cancelled!</h3>
        <p className="text-center">Your order is successfully cancelled!</p>
        <p className="text-center">
          Your cancellation has been processed. A refund of{" "}
          {props.data?.orderdetails[0]?.selling_price} will be issued to your
          original payment method within [3 - 7 days]. Thank you!
        </p>
        <div className="btn-holder btn-holder-center">
          <Link
            href="/"
            className="btn btn-line black-line"
            onClick={() => localStorage.setItem("cancelOrder", true)}
          >
            Go to Home Page
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderCancelledModal;
