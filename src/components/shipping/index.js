"use client";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axiosInstance from "@/axios";
import {
  updateUserDetails,
  addAddress,
  updateAddress,
  deleteAddress,
  updateBillingAddress,
} from "@/services/user";
import { getCart } from "@/services/substrate";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { getProfile } from "@/services/user";
import BillingAddressModal from "../modal/BillingAddressModal";
import Swal from "sweetalert2";
import Accordion from "react-bootstrap/Accordion";
import YesNoModal from "../modal/YesNoModal";
import { Formik, Form } from "formik";
import Loader from "../loader";
import { getShippingCharges } from "@/services/shipping";
import { useRouter } from "next/navigation";

const Shipping = () => {
  const [showProceed, setShowProceed] = useState(false);
  const [initValues, setInitValues] = useState({
    area: "",
    street: "",
    building: "",
    landmark: "",
    city: "",
    pin_code: "",
    trn: "",
    country: "United Arab Emirates",
  });
  const [userProfile, setuserProfile] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [loading, setloading] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const handleProceedShow = () => setShowProceed(true);
  const handleProcecedHide = () => setShowProceed(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  // const [shippingType, setShippingType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [shippingCharge, setShippingCharge] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [vatPrice, setvatPrice] = useState(0);
  const [loader, setLoader] = useState(false);
  // Edit Address Modal
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleChooseAddress = (values) => {
    setSelectedAddress(values.address_id); // Set the selected radio button based on the div clicked
    handleUpdateBilling(values);
    getShippingCharge(values);
  };

  // Shipping Method Method
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShippingCharge(0);
    if (event.target.value == "Shipping to your place") {
      handleChooseAddress(
        userProfile[0]?.addresses[userProfile[0]?.addresses?.length - 1]
      );
      getShippingCharge(
        userProfile[0]?.addresses[userProfile[0]?.addresses?.length - 1]
      );
    }
  };

  const getShippingCharge = (add) => {
    if (add) {
      console.log("add", add);
      const payload = {};
      payload.city_id = "" + add?.city_id;
      payload.district = add?.area;
      getShippingCharges(payload)
        .then((res) => {
          console.log("res", res);
          setShippingCharge(res.data);
        })
        .catch((err) => console.log("err", err));
    }
  };
  const handleGetProfile = () => {
    getCart()
      .then((res) => {
        setTotalPrice(res.totalPrice);
        for (let i = 0; i < res.data.length; i++) {
          console.log("res.data[i].vat_price", res.data[i].vat_price);
          setvatPrice(
            (vatPrice) => Number(vatPrice) + Number(res.data[i].vat_price)
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleOrder = async () => {
    setLoader(true);
    if (selectedOption === "") {
      alert("Please Select your shipping method");
      setIsLoading(false);
    } else if (!shippingAddress && selectedOption == "Shipping to your place") {
      Swal.fire({
        title: "Choose shipping address to continue with the payment",
        icon: "warning",
        timer: 3000,
      });
    } else {
      setIsLoading(true);

      // const data = {
      //   total_cost: location.state.totalPrice + location.state.shippingChrges,
      //   access_token: access_token,
      //   payment_status: "Failed",
      //   shipping_method: shippingType,
      //   payment_method: "CARD",
      //   data: location.state.productDetails,
      //   shipping_address: userDetails.user.address,
      // };
      console.log("Local storage shipping addrrss==>", shippingAddress);

      window.localStorage.setItem("shipping_address", shippingAddress);
      window.localStorage.setItem("payment_method", paymentMethod);
      window.localStorage.setItem("shipping_method", selectedOption);
      window.localStorage.setItem("user-id", userDetails.user_id);
      window.localStorage.setItem(
        "billing_address",
        userDetails?.billing_address_details?.billing_address
      );
      window.localStorage.setItem(
        "amount",
        selectedOption == "Collection from our manufacturer center"
          ? totalPrice
          : totalPrice + Number(shippingCharge)
      );
      if (paymentMethod === "cash") {
        router.push("/my-order");
      } else {
        const res = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/payment/access-token`
        );
        console.log("Payment API==>", res);

        const access_token = res.data;
        window.localStorage.setItem("payment_access_token", access_token);
        if (selectedOption == "Collection from our manufacturer center") {
          const createOrder = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_APP_API_URL}/payment/create-order`,
            {
              access_token: access_token,
              price: totalPrice,
            }
          );
          window.location.replace(createOrder.data);
        } else {
          // console.log("vijit singh");
          const createOrder = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_APP_API_URL}/payment/create-order`,
            {
              access_token: access_token,
              price: totalPrice + Number(shippingCharge),
            }
          );
          window.location.replace(createOrder.data);
        }
      }

      setIsLoading(false);
    }
    setLoader(false);
  };
  const handleAddress = async (values) => {
    setLoader(true);
    values.city_id = "" + values.city_id;
    try {
      if (isUpdate && itemId) {
        values.address_id = values.address_id;
        const res = await updateAddress(values);
        setLoader(false);
        handleGetProfile();
        Swal.fire({
          icon: "success",
          title: res.message,
          text: res?.data ? res.message : "",
          confirmButtonText: "Okay",
          timer: 4000,
        }).then((result) => {
          setLoader(false);
          if (result.isConfirmed || result.dismiss) {
            setRefetch(!refetch);
          }
        });
        getProfile()
          .then((res) => {
            setloading(false);
            setuserProfile(res?.data);
            // localStorage.setItem("user-profile", res?.data);
          })
          .catch((err) => {
            setloading(true);
            console.error(err);
          });
        setLoader(false);
      } else {
        setLoader(false);
        const res = await addAddress(values);
        handleGetProfile();
        Swal.fire({
          icon: "success",
          title: res.message,
          text: res?.data ? res.message : "",
          confirmButtonText: "Okay",
          timer: 4000,
        }).then((result) => {
          if (result.isConfirmed || result.dismiss) {
            setRefetch(!refetch);
          }
        });
        getProfile()
          .then((res) => {
            setloading(false);
            setuserProfile(res?.data);
            // localStorage.setItem("user-profile", res?.data);
          })
          .catch((err) => {
            setloading(true);
            console.error(err);
          });
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      Swal.fire({
        position: "center",
        icon: `error`,
        title: `Error - ${err}`,
        confirmButtonText: "Okay",
        timer: 3000,
      });
    } finally {
      handleClose();
    }
  };

  // Handle opening address the modal
  const openModal = (item) => {
    if (item) {
      setIsUpdate(true);
      setInitValues(item);
      setItemId(item.address_id);
    } else {
      setIsUpdate(false);
      setInitValues({
        area: "",
        street: "",
        building: "",
        landmark: "",
        city: "",
        pin_code: "",
        trn: "",
        country: "United Arab Emirates",
      });
      setItemId(null);
    }
    handleShow();
  };

  useEffect(() => {
    handleGetProfile();
    setloading(true);
    getShippingCharge();

    getProfile()
      .then((res) => {
        setloading(false);
        setuserProfile(res.data);
        setUserDetails(res.data[0]);
        // localStorage.setItem("user-profile", res.data);
      })
      .catch((err) => {
        setloading(true);
        console.error(err);
      });
  }, []);

  const handleDeleteAddress = async (values) => {
    try {
      const res = await deleteAddress(values.address_id);
      Swal.fire({
        icon: "success",
        title: "Details updated Successfully",
        text: res?.data ? res?.message : "",
        confirmButtonText: "Okay",
        timer: 4000,
      }).then((result) => {
        if (result.isConfirmed || result.dismiss) {
          setRefetch(!refetch);
        }
      });

      getProfile()
        .then((res) => {
          setloading(false);
          setuserProfile(res.data);
          // localStorage.setItem("user-profile", res.data);
        })
        .catch((err) => {
          setloading(true);
          console.error(err);
        });
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: `error`,
        title: `Error - ${err?.data?.error}`,
        confirmButtonText: "Okay",
        timer: 3000,
      });
    }
  };

  const handlePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleUpdateBilling = async (values) => {
    // setLoader(true);
    console.log("handleUpdateBilling values==>", values);
    // values.address = values.address_id;
    // const newAddress = `${values.area}, ${values.street}, ${values.city}, ${values.pin_code}, ${values.country}`;
    const newAddress = [
      values.building,
      values.street,
      values.landmark,
      values.area,
      values.city,
      values.country,
      values.pin_code,
      values.trn,
    ]
      .filter(Boolean) // Filters out any falsy values (null, undefined, empty string)
      .join(", ");
    // setShippingAddress(values.address);
    setShippingAddress(newAddress);
    values.address = values.address;
    /* try {
      // const res = await updateBillingAddress(values);
      // console.log(res);
      // setLoader(false);
      Swal.fire({
        icon: "success",
        title: "Details updated Successfully",
        text: res?.data ? "Details updated Successfully" : "",
        confirmButtonText: "Okay",
        timer: 4000,
      }).then((result) => {
        if (result.isConfirmed || result.dismiss) {
          setRefetch(!refetch);
        }
      });
      setLoader(false);
      getProfile()
        .then((res) => {
          setloading(false);
          setuserProfile(res.data);
          // localStorage.setItem("user-profile", res.data);
        })
        .catch((err) => {
          setloading(true);
          console.error(err);
        });
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: `error`,
        title: `Error - ${err?.response?.data?.message}`,
        confirmButtonText: "Okay",
        timer: 3000,
      });
    } */
  };

  const productDetailsSchema = Yup.object().shape({
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    place: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });
  const initialValues = {
    name: "",
  };

  const newInitialValues = Object.assign({}, initialValues, {
    name: userProfile[0]?.first_name + " " + userProfile[0]?.last_name,
  });
  function formatNumber(num) {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return (
    <>
      <section className="shipping-sec sc-pt-50 sc-pb-50">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={productDetailsSchema} // Add the appropriate validation schema for login
          onSubmit={(values) => {
            console.log(values); // Handle login form submission
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="container">
                <div className="d-flex justify-content-center">
                  <h2>Shipping and Handling</h2>
                </div>
                <div className="row">
                  <div className="col-md-9">
                    <p className="main-text">
                      We need few details about Your product Shipping Method
                    </p>
                    <div className="accordian-holder shipping-method">
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {" "}
                            <Image
                              src="/assets/images/contact-info-icon.webp"
                              alt="Contact Information"
                              width={28}
                              height={28}
                              className="me-3"
                            />{" "}
                            Contact Information
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className="contact-details">
                              <p>
                                Name : {userProfile[0]?.first_name}{" "}
                                {userProfile[0]?.last_name}
                              </p>
                              <p>Email : {userProfile[0]?.email}</p>
                              <p>
                                Contact Number :{" "}
                                {userProfile[0]?.contact_number}
                              </p>
                              {/* <p>Address :</p> */}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>
                            <Image
                              src="/assets/images/shipping-method-icon.webp"
                              alt="Shipping Method"
                              width={28}
                              height={28}
                              className="me-3"
                            />
                            Shipping Method
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className="row">
                              <div className="col-md-6">
                                <label>
                                  <input
                                    type="radio"
                                    name="delivery"
                                    value="Collection from our manufacturer center"
                                    checked={
                                      selectedOption ===
                                      "Collection from our manufacturer center"
                                    }
                                    onChange={handleOptionChange}
                                    className="form-check-input"
                                  />
                                  <span>
                                    {" "}
                                    Collection from our manufacturer center
                                  </span>
                                </label>
                              </div>
                              <div className="col-md-6">
                                <label>
                                  <input
                                    type="radio"
                                    name="delivery"
                                    value="Shipping to your place"
                                    checked={
                                      selectedOption ===
                                      "Shipping to your place"
                                    }
                                    onChange={handleOptionChange}
                                    className="form-check-input"
                                  />
                                  <span> Shipping to your place</span>
                                </label>
                              </div>
                            </div>

                            {selectedOption === "Shipping to your place" && (
                              <div className="shipping-details">
                                <h4>CHOOSE YOUR SHIPPING ADDRESS</h4>
                                <div className="profile-area profile-shipping-address">
                                  <div className="profile-right-sec address-sec profile-shipping-address">
                                    <div className="choose-shiping-outer">
                                      {userProfile[0]?.addresses.map(
                                        (addr) =>
                                          addr?.city_id &&
                                          addr?.city_id != null && (
                                            <div
                                              className={`address-block ${
                                                selectedAddress ===
                                                addr.address_id
                                                  ? "activeShipping"
                                                  : ""
                                              }`}
                                              onClick={() =>
                                                handleChooseAddress(addr)
                                              }
                                              key={addr.address_id}
                                            >
                                              <input
                                                type="radio"
                                                id={addr.address_id}
                                                name="shipping"
                                                value={addr.address}
                                                checked={
                                                  selectedAddress ===
                                                  addr.address_id
                                                }
                                              />
                                              <label
                                                for={addr.address_id}
                                                onChange={() =>
                                                  handleChooseAddress(addr)
                                                }
                                              >
                                                {[
                                                  addr.building,
                                                  addr.street,
                                                  addr.landmark,
                                                  addr.area,
                                                  addr.city,
                                                  addr.country,
                                                  addr.pin_code,
                                                  addr.trn,
                                                ]
                                                  .filter(Boolean)
                                                  .join(", ")}
                                              </label>
                                            </div>
                                          )
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <Button
                                  className="btn btn-green "
                                  style={{ margin: "10px" }}
                                  type="submit"
                                  onClick={() => openModal(null)}
                                >
                                  Add Address
                                </Button>
                                {/* <span class="MuiRadio-action css-msgya0">
                                  <input
                                    type="radio"
                                    class="MuiRadio-input css-zo1pqd"
                                    value="Sheikh Mohamed Bin Rashid Boultevard, Downtown , PO Box 123234"
                                    id="mui-13"
                                    name="mui-16"
                                  />
                                </span> */}
                              </div>
                            )}
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                          <Accordion.Header>
                            <Image
                              src="/assets/images/payment-method-icon.webp"
                              alt="Payment Method"
                              width={28}
                              height={28}
                              className="me-3"
                            />
                            Payment Method
                          </Accordion.Header>
                          <Accordion.Body>
                            <form>
                              <div className="d-flex col-12 ">
                                <label className="col-md-6">
                                  <input
                                    type="radio"
                                    name="delivery"
                                    // value="shipping"
                                    value="card"
                                    className="form-check-input"
                                    onChange={handlePaymentMethod}
                                    //checked={selectedOption === 'shipping'}
                                    // onChange={handleOptionChange}
                                  />
                                  <span>Online Payment</span>
                                </label>
                                <label className="col-md-6">
                                  <input
                                    type="radio"
                                    name="delivery"
                                    // value="shipping"
                                    value="cash"
                                    className="form-check-input"
                                    onChange={handlePaymentMethod}
                                    //checked={selectedOption === 'shipping'}
                                    // onChange={handleOptionChange}
                                  />
                                  <span>Bank Transfer</span>
                                </label>
                              </div>
                            </form>
                            {paymentMethod === "cash" && (
                              <div className="shipping-details">
                                <h4>BANK ACCOUNT DETAILS</h4>
                                <span
                                  style={{
                                    display: "block",
                                    fontStyle: "italic",
                                    marginTop: "10px",
                                  }}
                                >
                                  Please send the receipt to
                                  "support@thecuttingcenter" along with the
                                  order ID{" "}
                                </span>
                                <div className="profile-area profile-shipping-address">
                                  <div className="profile-right-sec address-sec profile-shipping-address">
                                    <div className="choose-shiping-outer">
                                      <div class="card-group col-12">
                                        <div class="card">
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              Beneficiary Name
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <large class="text-muted mb-4">
                                              Beneficiary Address
                                            </large>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              Beneficiary Bank Name
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              Beneficiary Bank Address
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              Branch Name
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              Beneficiary Bank Code / SWIFT CODE
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              Beneficiary Account Number
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              IBAN Number
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              Email ID
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              Account Currency
                                            </medium>
                                          </div>
                                        </div>
                                        <div class="card">
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              BLUE RHINE INDUSTRIES LLC
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              PO BOX 114001, DIP-2, JEBEL ALI,
                                              DUBAI, UAE
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              NATIONAL BANK OF FUJAIRAH P.S.C
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              P.O.BOX 887, FUJAIRAH
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              DUBAI , UAE
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              NBFUAEAFDXB
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              012000953162
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              AE150380000012000953162
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              support@thecuttingcenter.com
                                            </medium>
                                          </div>
                                          <div class="card-footer">
                                            <medium class="text-muted">
                                              AED
                                            </medium>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="summary-box">
                      <div className="summary">
                        <h5>Order Summary</h5>
                      </div>
                      {/* <div className="heada">
                        Subtotal: <strong>AED {totalPrice}</strong>{" "}
                      </div> */}
                      {selectedOption === "Shipping to your place" && (
                        <>
                          <div className="heada text-start shipping-total">
                            <span>Subtotal: </span>

                            <strong>
                              AED{" "}
                              {formatNumber(
                                (Number(totalPrice) - Number(vatPrice)).toFixed(
                                  2
                                )
                              )}
                            </strong>
                          </div>
                          <div className="heada text-start shipping-total">
                            <span>Shipping: </span>
                            <strong>
                              AED {formatNumber(shippingCharge.toFixed(2))}
                            </strong>
                          </div>
                          <div className="heada text-start shipping-total">
                            <span>VAT amount: </span>
                            <strong>
                              AED {formatNumber(Number(vatPrice).toFixed(2))}
                            </strong>
                          </div>
                        </>
                      )}
                      {selectedOption === "Shipping to your place" ? (
                        <div className="heada head-total">
                          Total:{" "}
                          <strong>
                            AED{" "}
                            {formatNumber(
                              (
                                Number(totalPrice) + Number(shippingCharge)
                              ).toFixed(2)
                            )}
                          </strong>
                        </div>
                      ) : (
                        <>
                          <div className="heada text-start shipping-total">
                            <span> Subtotal: </span>
                            <strong>
                              AED{" "}
                              {formatNumber(
                                (Number(totalPrice) - Number(vatPrice)).toFixed(
                                  2
                                )
                              )}
                            </strong>
                          </div>
                          <div className="heada text-start shipping-total">
                            <span> Shipping:</span> <strong>AED 0.00</strong>
                          </div>
                          <div className="heada text-start shipping-total">
                            <span> VAT amount: </span>
                            <strong>
                              AED {formatNumber(vatPrice.toFixed(2))}
                            </strong>
                          </div>
                          <div className="heada head-total text-start">
                            Total:{" "}
                            <strong>AED {formatNumber(totalPrice)}</strong>
                          </div>
                        </>
                      )}
                      {selectedOption === "Shipping to your place" ? (
                        <div className="priceSummary">
                          <div className="shippingCharge">
                            <strong>
                              AED {formatNumber(shippingCharge.toFixed(2))}
                            </strong>
                          </div>
                          <div className="description">
                            added as shipping charges <br /> at your place
                          </div>
                          <div className="iconContainer">
                            <img
                              src="/assets/images/cart_shipping_icon.png"
                              alt="Truck Icon"
                              className="icon"
                            />
                          </div>
                          <div className="totalAmount">
                            Total payable amount
                          </div>
                          <div className="amount">
                            {" "}
                            <strong>
                              AED{" "}
                              {formatNumber(
                                (
                                  Number(totalPrice) + Number(shippingCharge)
                                ).toFixed(2)
                              )}
                            </strong>
                          </div>
                        </div>
                      ) : (
                        <div className="priceSummary">
                          <div className="shippingCharge">
                            <strong>AED 0.00</strong>
                          </div>
                          <div className="description">
                            added as shipping charges
                          </div>
                          <div className="iconContainer">
                            <img
                              src="/assets/images/cart_shipping_icon.png"
                              alt="Truck Icon"
                              className="icon"
                            />
                          </div>
                          <div className="totalAmount">
                            Total payable amount
                          </div>
                          <div className="amount">
                            {" "}
                            <strong>
                              AED {formatNumber(Number(totalPrice).toFixed(2))}
                            </strong>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="btn-holder">
                  <Link
                    href="/shopping-cart"
                    className="btn btn-line black-line btn-sqare"
                  >
                    Back
                  </Link>
                  {/* <button
                    className="btn btn-green btn-sqare"
                    onClick={handleProceedShow}
                  >
                    Proceed
                  </button> */}
                  <Button
                    variant="primary"
                    type="button"
                    className="loginButton_active btn btn-green btn-sqare"
                    onClick={handleOrder}
                  >
                    Proceed
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <BillingAddressModal
          userProfile={userProfile[0]?.addresses}
          show={show}
          initValues={initValues}
          isUpdate={isUpdate}
          handleClose={handleClose}
          handleAddress={handleAddress}
        />
      </section>
      {loader && <Loader />}
      <YesNoModal show={showProceed} handleClose={handleProcecedHide} />
    </>
  );
};

export default Shipping;
