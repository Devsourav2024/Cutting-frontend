"use client";
import { useState, useEffect } from "react";
import {
  updateUserDetails,
  addAddress,
  updateAddress,
  deleteAddress,
  updateBillingAddress,
  changePasswordHandler,
  changeImageHandler,
} from "@/services/user";
import Link from "next/link";
import Image from "next/image";
import BillingAddressModal from "../modal/BillingAddressModal";
import { getProfile } from "@/services/user";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import EditProfileModal from "@/components/modal/EditProfileModal";
import ChangePasswordModal from "../modal/ChangePasswordModal";
import ProfileImageModal from "../modal/ProfileImageModal";
import { useAuth } from "@/app/context/AuthContext";

const Profile = () => {
  const [isDeleted, setIsDeleted] = useState([false, false, false, false]);
  const [userProfile, setuserProfile] = useState([]);
  const [loading, setloading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const handleProfileShow = () => setShowProfile(true);
  const handleProfileHide = () => setShowProfile(false);

  // Edit Address Modal
  const [show, setShow] = useState(false);
  const [initValues, setInitValues] = useState({
    country: "United Arab Emirates",
    area: "",
    street: "",
    building: "",
    landmark: "",
    city: "",
    pin_code: "",
    trn: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [itemId, setItemId] = useState(null);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //change password
  const [showPassword, setShowPassword] = useState(false);
  const handlePassShow = () => setShowPassword(true);
  const handlePassHide = () => setShowPassword(false);

  //change profile image
  const [showImage, setShowImage] = useState(false);
  const handleImageShow = () => setShowImage(true);
  const handleImageHide = () => setShowImage(false);

  // let user_dtls = localStorage.getItem("user-token");
  const { handleProfileDataSave } = useAuth();
  // console.log("userProfile==+++++++>", userProfile);

  const handleUpdateUserDetails = async (values) => {
    try {
      const data = {
        first_name: values.first_name,
        last_name: values.last_name,
        contact_number: values.contact_number,
        trn_no: values.trn_no,
      };
      const res = await updateUserDetails(data);

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

      getProfile()
        .then((res) => {
          setloading(false);
          setuserProfile(res.data);
          localStorage.setItem("user-profile", JSON.stringify(res.data));
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
        title: `Error - ${err.data.error}`,
        confirmButtonText: "Okay",
        timer: 3000,
      });
    }
  };

  const handleAddress = async (values) => {
    try {
      if (isUpdate && itemId) {
        console.log("submit", values);
        let payload = {};
        payload.address_id = values.address_id;
        payload.address = values.address;
        payload.area = values.area;
        payload.street = values.street;
        payload.city = values.city;
        payload.pin_code = values.pin_code;
        payload.country = values.country;
        payload.building = values.building;
        payload.landmark = values.landmark;
        payload.trn = values.trn;
        const res = await updateAddress(payload);
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
            localStorage.setItem("user-profile", JSON.stringify(res.data));
          })
          .catch((err) => {
            setloading(true);
            console.error(err);
          });
      } else {
        const res = await addAddress(values);
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
            localStorage.setItem("user-profile", JSON.stringify(res.data));
          })
          .catch((err) => {
            setloading(true);
            console.error(err);
          });
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: `error`,
        title: `Error - ${err.data.error}`,
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
      item = Object.fromEntries(
        Object.entries(item).filter(
          ([key, value]) => value !== null && value !== ""
        )
      );
      setInitValues(item);
      setItemId(item.address_id);
    } else {
      setIsUpdate(false);
      setInitValues({
        country: "United Arab Emirates",
        area: "",
        street: "",
        building: "",
        landmark: "",
        city: "",
        pin_code: "",
        trn: "",
      });
      setItemId(null);
    }
    handleShow();
  };

  const handleDeleteAddress = async (values) => {
    try {
      const res = await deleteAddress(values.address_id);
      Swal.fire({
        icon: "success",
        title: "Address is deleted successfully",
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
          localStorage.setItem("user-profile", JSON.stringify(res.data));
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

  const handleUpdateBilling = async (values) => {
    values.address_id = values.address_id;
    try {
      const res = await updateBillingAddress(values);
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Billing address added",
        text: res?.data ? "Billing address added" : "",
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
          localStorage.setItem("user-profile", JSON.stringify(res.data));
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
        title: `Error - ${err.data.error}`,
        confirmButtonText: "Okay",
        timer: 3000,
      });
    }
  };
  const handleUpdatePassword = async (values) => {
    try {
      let payload = {};
      payload.password = values.password;
      payload.confirmPassword = values.confirmPassword;
      payload.userId = userProfile && userProfile[0]?.user_id;
      // values.password = values.password;
      const res = await changePasswordHandler(payload);
      console.log("res..", res);

      Swal.fire({
        icon: "success",
        title: "The password has been updated successfully",
        text: res?.data ? res.message : "",
        confirmButtonText: "Okay",
        timer: 4000,
      }).then((result) => {
        if (result.isConfirmed || result.dismiss) {
          setRefetch(!refetch);
        }
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: `error`,
        title: `Error - ${err.data.error}`,
        confirmButtonText: "Okay",
        timer: 3000,
      });
    } finally {
      handlePassHide();
    }
  };

  const handleChangeImage = async (values) => {
    try {
      values.image = values.image;
      const res = await changeImageHandler(values);
      Swal.fire({
        icon: "success",
        title: "Image uploaded successfully",
        text: res?.data ? "Image uploaded successfully" : "",
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
          handleProfileDataSave(res.data);
          setuserProfile(res.data);
          localStorage.setItem("user-profile", JSON.stringify(res.data));
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
        title: `Error - ${err.data.error}`,
        confirmButtonText: "Okay",
        timer: 3000,
      });
    } finally {
      handleImageHide();
    }
  };

  useEffect(() => {
    setloading(true);
    getProfile()
      .then((res) => {
        setloading(false);
        handleProfileDataSave(res.data);
        setuserProfile(res.data);
        localStorage.setItem("user-profile", JSON.stringify(res.data));
      })
      .catch((err) => {
        setloading(true);
        console.error(err);
      });
  }, [refetch]);

  const addresses = [
    "dubai, UAE",
    "BRI",
    "Ajman",
    "Etisalat square, Al manahak, Sharjah",
  ];

  const initialValues = {
    name: "",
  };

  const newInitialValues = Object.assign({}, initialValues, {
    name: userProfile[0]?.first_name + " " + userProfile[0]?.last_name,
  });
  const newDate = new Date(userProfile[0]?.created_at);

  const options = { year: "numeric", month: "long", day: "numeric" };

  const formattedNewDate = newDate.toLocaleDateString("en-US", options);
  // const formattedNewDate = "";
  // console.log("formattedDate==>", formattedNewDate);
  return (
    <section className="profile-area sc-pt-50 sc-pb-50">
      <div className="container">
        <div className="d-flex justify-content-center">
          <h2>My Profile</h2>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="profile-left">
              <figure className="image-container">
                <Image
                  src={
                    userProfile[0]?.profile_picture != null
                      ? userProfile[0].profile_picture
                      : "/assets/images/not-avlaible.png"
                  }
                  alt="Profile"
                  width={310}
                  height={278}
                  priority={true}
                  unoptimized={true}
                />
              </figure>
              <div className="change-profile">
                <Link
                  onClick={() => handleImageShow()}
                  href=""
                  className="btn btn-line black-line w-100"
                >
                  <span>Change Profile Image</span>
                </Link>
              </div>
              <div className="profile-details">
                {/* <h3 style={{borderRadius:"10px", border:"2px solid #13a89e", boxShadow:"10px 10px 5px #13a89e"}}> */}
                <h3>
                  {userProfile[0]?.first_name?.toUpperCase()}{" "}
                  {userProfile[0]?.last_name?.toUpperCase()}
                </h3>
                <div className="email">
                  <Image
                    src="/assets/images/profile-icon.png"
                    alt="Email"
                    width={24}
                    height={24}
                    priority={true}
                  />{" "}
                  {userProfile[0]?.email}
                </div>
                <div className="phone mb-2">
                  <Image
                    src="/assets/images/profile-phone.png"
                    alt="Phone"
                    width={24}
                    height={24}
                    priority={true}
                  />{" "}
                  {userProfile[0]?.contact_number}
                </div>
              </div>
              <div className="btn-holder">
                <Link
                  onClick={() => handleProfileShow()}
                  href=""
                  className="btn btn-green w-100 mb-2"
                >
                  <span>Edit profile info</span>
                </Link>
                <Link
                  onClick={() => handlePassShow()}
                  href=""
                  className="btn btn-line black-line w-100"
                >
                  <span>Change password</span>
                </Link>
              </div>
              <p className="mt-2 mb-0 text-center">You joined in {formattedNewDate}</p>
            </div>
          </div>
          <div className="col-md-8">
            <div className="profile-right">
              <div className="profile-right-sec mb-4">
                <h2>Billing Address</h2>
                {console.log(
                  "userProfile[0]?.billing_address_details?.billing_address",
                  userProfile[0]?.billing_address_details?.billing_address
                )}
                <div className="addresss">
                  {userProfile[0]?.billing_address_details?.billing_address !=
                    ", , , , , , N/A" &&
                    userProfile[0]?.billing_address_details?.billing_address}
                </div>
              </div>
              <div className="profile-right-sec address-sec">
                <div className="btn-wrap">
                <h2>Address</h2>
                <Button
                  className="btn btn-green btn-sqare"
                  style={{ margin: "0" }}
                  type="submit"
                  onClick={() => openModal(null)}
                >
                  Add
                </Button>
                </div>
                {userProfile[0]?.addresses.map(
                  (addr) =>
                    addr.city_id &&
                    addr.city_id != null && (
                      <div
                        key={addr.address_id}
                        className="address-group-holder"
                      >
                        <div className="address-group-addon">
                          <div className="addresss">
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
                          </div>

                          <div className="address-action">
                            {userProfile[0]?.billing_address_details
                              .billing_address_id !== addr.address_id && (
                              <Link
                                onClick={() => handleUpdateBilling(addr)}
                                href=""
                                className="btn-bill"
                              >
                                Add as billing address
                              </Link>
                            )}
                            <Link
                              href=""
                              className="btn-edit"
                              onClick={() => openModal(addr)}
                            >
                              <Image
                                src="/assets/images/profile-edit.png"
                                alt="Edit"
                                width={24}
                                height={24}
                                priority={true}
                              />
                            </Link>
                            <Link
                              href="#"
                              className="btn-del"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteAddress(addr);
                              }}
                            >
                              <Image
                                src="/assets/images/profile-delete.png"
                                alt="Delete"
                                width={24}
                                height={24}
                                priority={true}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
              <div className="profile-right-sec address-sec mt-4">
                <div className="btn-holder">
                  <Link href="/my-order" className="btn btn-green btn-sqare">
                    <span>My orders</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use the BillingAddressModal component */}
      <BillingAddressModal
        userProfile={userProfile[0]?.addresses}
        show={show}
        initValues={initValues}
        isUpdate={isUpdate}
        handleClose={handleClose}
        handleAddress={handleAddress}
      />
      <EditProfileModal
        userProfile={userProfile}
        show={showProfile}
        handleClose={handleProfileHide}
        handleUserUpdate={handleUpdateUserDetails}
      />
      <ChangePasswordModal
        show={showPassword}
        handleClose={handlePassHide}
        handlePassword={handleUpdatePassword}
      />
      <ProfileImageModal
        show={showImage}
        handleClose={handleImageHide}
        handleImage={handleChangeImage}
      />
    </section>
  );
};

export default Profile;
