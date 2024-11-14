"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/axios";
import instance from "@/axios/multi-part";
// import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { getProfile } from "@/services/user";
import YesNoModal from "../modal/YesNoModal";

const Myorder = () => {
  // const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState("");
  const [orders, setOrders] = useState("");
  const [loading, setloading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ref = urlParams.get("ref");
  useEffect(() => {
    getProfile()
      .then((res) => {
        setloading(false);

        setUserDetails(res.data[0]);
        // localStorage.setItem("user-profile", res.data);
      })
      .catch((err) => {
        setloading(true);
        console.error(err);
      });
  }, []);
  useEffect(() => {
    // setloading(true);
    if (userDetails?.user_id) {
      if (ref) {
        setShow(true);
        getStatus(ref);
      } else {
        let payment_method = localStorage.getItem("payment_method");
        // console.log("payment_method==>>==>>", payment_method);
        if (localStorage.getItem("payment_method")) {
          updateOrder();
        }
        if (userDetails?.user_id) {
          getOrders();
        }
      }
    }
  }, [userDetails?.user_id]);
  let createOrder;
  const orderss = [
    {
      id: 1,
      material: "Wood",
      status: "Paid",
      price: "AED 125.78",
      quantity: 5,
    },
    {
      id: 2,
      material: "Metal",
      status: "Cancelled",
      price: "AED 75.50",
      quantity: 3,
    },
    {
      id: 3,
      material: "Plastic",
      status: "Refunded",
      price: "AED 50.00",
      quantity: 10,
    },
    {
      id: 4,
      material: "Glass",
      status: "Paid",
      price: "AED 100.00",
      quantity: 7,
    },
    {
      id: 5,
      material: "Fabric",
      status: "Cancelled",
      price: "AED 200.99",
      quantity: 2,
    },
    {
      id: 6,
      material: "Stone",
      status: "Paid",
      price: "AED 150.45",
      quantity: 8,
    },
    {
      id: 7,
      material: "Concrete",
      status: "Refunded",
      price: "AED 90.25",
      quantity: 6,
    },
    {
      id: 8,
      material: "Ceramic",
      status: "Paid",
      price: "AED 110.55",
      quantity: 4,
    },
  ];

  /*   const getOrders = async () => {
    const res =
      userDetails &&
      (await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/order/items?userId=${userDetails?.user_id}`
      ));
    setOrders(res.data);
  }; */
  const getOrders = async () => {
    /* const res =
      userDetails &&
      (await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/order/items/${userDetails?.user_id}`
      )); */
    /* const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/order/items/${userDetails?.user_id}`
    ); */
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/order/items/?userId=${userDetails?.user_id}`
    );
    setOrders(res.data);
  };

  const getStatus = async (ref, token) => {
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/payment/check/${ref}`
      );

      // const res = await axios.get(
      //   `https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/00ca36df-ca62-4274-a000-8dc48dfb0db4/orders/${ref}`,
      //   {
      //     headers: {
      //       PaymentAuthorization: `Bearer ${token}`
      //     },
      //   }
      // );
      if (res.data._embedded.payment[0]["3ds"].status === "FAILURE") {
        /* Swal.fire({
          icon: "error",
          title: "Payment Failed!",
          text: "Please Try Again",
          timer: 3000,
        }).then(() => navigate("/home")); */
        Swal.fire({
          icon: "error",
          title: "Payment Failed!",
          text: "Please Try Again",
          timer: 3000,
        });
      } else {
        const data = {
          reference_id: ref,
          paymentStatus: res.data._embedded.payment[0]["3ds"].status,
          amount: res.data.amount.value / 100,
        };
        console.log("Payment data===>", data);
        const paymentDetails = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/payment/addPayment`,
          data
        );
        /*  const createOrder = await instance.post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/order/create`,
          {
            paymentId: paymentDetails.data.payment_id,
            userId: localStorage.getItem("user-id"),
            shipping_address: localStorage.getItem("shipping_address"),
            payment_method: localStorage.getItem("payment_method"),
            billing_address: localStorage.getItem("billing_address"),
            shipping_method: localStorage.getItem("shipping_method"),
          }
        ); */
        console.log("order u");
        if (ref && localStorage.getItem("payment_method")) {
          createOrder = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_APP_API_URL}/order/create`,
            {
              paymentId: paymentDetails.data.payment_id,
              userId: localStorage.getItem("user-id"),
              shipping_address: localStorage.getItem("shipping_address"),
              payment_method: localStorage.getItem("payment_method"),
              billing_address: localStorage.getItem("billing_address"),
              shipping_method: localStorage.getItem("shipping_method"),
            }
          );
        }

        await axiosInstance.put(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/order/updateOrderItems`,
          {
            orderId: createOrder.data.order_id,
            userId: localStorage.getItem("user-id"),
          }
        );
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/order/confirm/email/${createOrder.data.order_id}`
        );
        window.localStorage.setItem("payment_method", "");
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
    if (userDetails?.user_id) {
      getOrders();
    }
  };

  const updateOrder = async () => {
    try {
      const data = {
        reference_id: null,
        paymentStatus: "pending",
        amount: localStorage.getItem("amount"),
      };
      const paymentDetails = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/payment/addPayment`,
        data
      );
      const createOrder = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/order/create`,
        {
          paymentId: paymentDetails.data.payment_id,
          userId: localStorage.getItem("user-id"),
          shipping_address: localStorage.getItem("shipping_address"),
          payment_method: localStorage.getItem("payment_method"),
          billing_address: localStorage.getItem("billing_address"),
          shipping_method: localStorage.getItem("shipping_method"),
        }
      );
      await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/order/updateOrderItems`,
        {
          orderId: createOrder.data.order_id,
          userId: localStorage.getItem("user-id"),
        }
      );
      await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/order/confirm/email/${createOrder.data.order_id}`
      );
      window.localStorage.setItem("payment_method", "");
      getOrders();
      // getStatus();
      handleClose();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        timer: 3000,
        icon: "error",
      }).then(() => navigate("/home"));
    }
  };

  /* useEffect(() => {
    if (userDetails?.user_id) {
      getOrders();
    }
  }, [userDetails?.user_id]); */

  const dateFormat = (order_date) => {
    const newDate = new Date(order_date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedNewDate = newDate.toLocaleDateString("en-US", options);
    return formattedNewDate;
  };
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return (
    <section className="my-order-sec sc-pt-50 sc-pb-50">
      <div className="container">
        <h2 className="text-center">My Orders</h2>
        <div className="order-table">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Material Type</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Total amount</th>
                  <th>Color</th>
                  <th>Finish</th>
                  <th>Quantity</th>
                  <th>Order Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>123</td>
                    <td>123</td>
                    <td>Approve</td>
                    <td>{order.selling_price}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <Link
                        href="/order-details"
                        className="btn btn-green btn-sqare"
                      >
                        View Product
                      </Link>
                    </td>
                  </tr>
                ))} */}
                {Array.isArray(orders) && orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order?.order_item_id}>
                      <td>{`100` + order?.order_item_id}</td>
                      <td>
                        {order && order?.material_name
                          ? order?.material_name
                          : ""}
                      </td>
                      <td
                        className={
                          order?.cancelled == 1
                            ? "text-danger"
                            : order?.payment_status === "completed"
                            ? "text-success"
                            : order?.payment_status === "Pending"
                            ? "text-danger"
                            : "text-danger"
                        }
                      >
                        {order?.cancelled == 1
                          ? "Cancelled"
                          : order?.payment_status === "completed"
                          ? "Paid"
                          : order?.payment_status === "Pending"
                          ? "Pending"
                          : "Pending"}
                      </td>
                      <td>{formatNumber(order?.selling_price)}</td>
                      <td>{formatNumber(order?.amount)}</td>
                      <td>{order?.color_name}</td>
                      <td>{order?.finish_name}</td>
                      <td>{order?.quantity}</td>
                      <td>{dateFormat(order?.updated_at)}</td>
                      <td>
                        <Link
                          href={`/order-details/${
                            `100` + order?.order_item_id
                          }`}
                          className="btn btn-green btn-square"
                        >
                          View Product
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No order to show
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <YesNoModal show={show} handleClose={handleClose} />
    </section>
  );
};

export default Myorder;
