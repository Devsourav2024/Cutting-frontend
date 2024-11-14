"use client";
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axios";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";
import {
  getProfile,
  getOrderItems,
  getOrderDetailsByUserId,
  cancelOrder,
} from "@/services/user";
import LeaveReviewModal from "../modal/LeaveReviewModal";
import OrderCancelledModal from "../modal/OrderCancelledModal";
import TaxInvoiceModal from "../modal/TaxInvoiceModal";

const OrderDetails = () => {
  const { id } = useParams();
  // const { order_id } = useParams();
  const [userDetails, setUserDetails] = useState("");
  const [orders, setOrders] = useState("");
  const [orderdetails, setOrderdetails] = useState("");
  const [loading, setloading] = useState(false);
  // console.log("order_id==>", order_id);
  const router = useRouter();
  // const id = searchParams.get("id");
  let newId = Number(id.toString().replace("100", ""));
  let totaldata = {
    id: newId,
    orderdetails,
    userDetails,
  };
  const getOrders = async () => {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/order/items/${userDetails?.user_id}`
    );
    setOrders(res.data);
  };

  const getOrderDetails = async () => {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/order/item/${newId}`
    );
    setOrderdetails(res.data);
  };

  // Create TAX Invoice Modal
  const [showInvoice, setShowInvoice] = useState(false);
  const handleInvoiceShow = () => setShowInvoice(true);
  const handleInvoiceClose = () => setShowInvoice(false);

  // Create Leave a Review Modal
  const [showReview, setShowReview] = useState(false);
  const handleReviewShow = () => setShowReview(true);
  const handleReviewClose = () => setShowReview(false);

  // Create Order Cancel Modal
  const [showCancelled, setShowCancelled] = useState(false);
  const handleCancelledShow = () => {
    setShowYesNo(false);
    // document.body.classList.remove("yesmodal-open");
    cancelOrder(newId)
      .then((res) => {
        // setloading(false);
        // setuserProfile(res.data);
        setShowCancelled(true);
        getOrderDetails();
      })
      .catch((err) => {
        // setloading(true);
        console.error(err);
      });
  };
  const handleCancelledClose = () => setShowCancelled(false);

  // Yes No Modal
  const [showYesNo, setShowYesNo] = useState(false);
  const handleYesNoShow = async () => {
    setShowYesNo(true);
    document.body.classList.add("yesmodal-open");
    // const res = await cancelOrder(order_id);
  };
  const handleYesNoClose = () => {
    setShowYesNo(false);
    document.body.classList.remove("yesmodal-open");
  };

  useEffect(() => {
    // setloading(true);
    getProfile()
      .then((res) => {
        setloading(false);
        setUserDetails(res.data[0]);
      })
      .catch((err) => {
        setloading(true);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (userDetails?.user_id) {
      getOrders();
    }
  }, [userDetails?.user_id]);

  useEffect(() => {
    if (newId) {
      getOrderDetails();
    }
  }, [newId]);

  const downloadImage = () => {
    saveAs(orderdetails[0]?.rigid_file, "file.dxf"); // Put your image url here.
  };
  const handleDownload = () => {
    downloadImage();
  };

  const newDate = new Date(orderdetails[0]?.created_at);

  const options = { year: "numeric", month: "long", day: "numeric" };

  const formattedNewDate = newDate.toLocaleDateString("en-US", options);

  return (
    <>
      <section className="order-details-sec sc-pt-50 sc-pb-50">
        <div className="container">
          <h2 className="text-center">Order Details</h2>{" "}
          <div className="order-row">
            <div className="row">
              <div className="col-md-8">
                <div className="order-left-col">
                  <div className="order-left-left-in1">
                    <Image
                      src={
                        orderdetails[0]?.rigid_image
                          ? orderdetails[0]?.rigid_image
                          : "/assets/images/order-details-img.jpg"
                      }
                      alt="Order Details"
                      width={456}
                      height={461}
                      className="me-3"
                    />
                  </div>
                  <div className="order-left-left-in2">
                    <div className="order-con-holder">
                      <ul>
                        <li className="order">Order #{id}</li>{" "}
                        <li className="order-cancel">
                          {orderdetails[0]?.cancelled === 1 ? (
                            <span style={{ color: "red" }}>
                              (This order is cancelled)
                            </span>
                          ) : (
                            ""
                          )}
                        </li>
                        <li>
                          Material:{" "}
                          <strong>{orderdetails[0]?.material_name}</strong>
                        </li>
                        <li>
                          Thickness:{" "}
                          <strong>{orderdetails[0]?.thickness}</strong>
                        </li>
                        {orderdetails[0]?.color_name && (
                          <li>
                            Color:{" "}
                            <strong>{orderdetails[0]?.color_name}</strong>
                          </li>
                        )}
                        {orderdetails[0]?.finish_name && (
                          <li>
                            Finish:{" "}
                            <strong>{orderdetails[0]?.finish_name}</strong>
                          </li>
                        )}
                        <li>
                          Quantity: <strong>{orderdetails[0]?.quantity}</strong>
                        </li>
                      </ul>
                    </div>
                    <div className="order-bth-holder">
                      <button
                        className="btn-order w-100"
                        onClick={handleDownload}
                      >
                        Download Your Uploaded File
                      </button>
                      <button
                        className="btn-order w-100"
                        onClick={handleInvoiceShow}
                      >
                        View Invoice
                      </button>
                      <button
                        className="btn-order w-100"
                        onClick={handleReviewShow}
                      >
                        Write a Product Review
                      </button>
                      {orderdetails[0]?.cancelled === 0 ? (
                        <button
                          className="btn-order btn-ordercancel w-100"
                          onClick={handleYesNoShow}
                        >
                          Cancel Order
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className={`cancel-sma-modal ${
                        showYesNo ? "active" : ""
                      }`}
                    >
                      <p>Are you sure you want to cancel this order?</p>
                      <div className="cancel-sma-btn-holder">
                        <button
                          className="btn-red"
                          onClick={handleCancelledShow}
                        >
                          Yes
                        </button>
                        <button className="btn-gray" onClick={handleYesNoClose}>
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="order-right-col">
                  <p className="text-center">
                    Ordered on <strong>{formattedNewDate}</strong>
                  </p>
                  <div className="order-right-col-inner">
                    <div className="order-right-col-sing">
                      <h4>Shipping Address</h4>
                      <p>
                        <Image
                          src="/assets/images/location-order.svg"
                          alt="Shipping Address"
                          width={24}
                          height={24}
                          className="me-3"
                        />
                        <span>{orderdetails[0]?.shipping_address}</span>
                      </p>
                    </div>
                    <div className="order-right-col-sing">
                      <h4>Contact Details</h4>
                      <p>
                        <Image
                          src="/assets/images/order-user.png"
                          alt="Contact User"
                          width={24}
                          height={24}
                          className="me-3"
                        />
                        <span>
                          {userDetails?.first_name +
                            " " +
                            userDetails?.last_name}
                        </span>
                      </p>
                      <p>
                        <Image
                          src="/assets/images/order-phone.png"
                          alt="Contact Phone"
                          width={24}
                          height={24}
                          className="me-3"
                        />
                        <span>{userDetails?.contact_number}</span>
                      </p>
                      <p>
                        <Image
                          src="/assets/images/order-email.png"
                          alt="Contact Email"
                          width={24}
                          height={24}
                          className="me-3"
                        />
                        <Link href="{userDetails?.email}">
                          {userDetails?.email}
                        </Link>
                      </p>
                    </div>
                    <div className="order-right-col-sing">
                      <h4>Billing Address</h4>
                      {orderdetails[0]?.billing_address !=
                        ", , , , , , N/A" && (
                        <p>
                          <Image
                            src="/assets/images/location-order.svg"
                            alt="Billing Address"
                            width={24}
                            height={24}
                            className="me-3"
                          />
                          <span>{orderdetails[0]?.billing_address}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tax Invoice Modal */}
      <TaxInvoiceModal
        show={showInvoice}
        handleClose={handleInvoiceClose}
        data={totaldata}
      />
      {/* Leave Review Modal */}
      <LeaveReviewModal
        show={showReview}
        handleClose={handleReviewClose}
        id={newId}
        setShowReview={setShowReview}
      />
      {/* Order Cancelled Modal */}
      <OrderCancelledModal
        data={totaldata}
        show={showCancelled}
        handleClose={handleCancelledClose}
      />
    </>
  );
};

export default OrderDetails;
