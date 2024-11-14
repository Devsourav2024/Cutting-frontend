"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { Field, Formik, Form } from "formik";
import {
  getMaterials,
  changePhotoHandler,
  getThickness,
  addQuote,
  addCart,
  getRigidFileLink,
  uploadGalleyImage,
  getColorOfmaterial,
  getFinishOfMaterial,
} from "@/services/substrate";
import { getProfile } from "@/services/user";
import ImpDisclaimerModal from "../modal/ImpDisclaimerModal";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Loading from "../common/Loading";
import Loader from "../loader";

const RigidSubstrates = () => {
  const [options, setOptions] = useState([]);
  const [thickness, setThickness] = useState([]);
  const [sellingPrice, setSellingPrice] = useState(null);
  const [actualPrice, setActualPrice] = useState(null);
  const [vatPrice, setVatPrice] = useState(null);
  const [vatPercentage, setVatPercentage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [materialId, setMaterialId] = useState(null);
  const [thicknessId, setThicknessId] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [circumference, setCircumference] = useState(null);
  const [linearmeter, setLinearmeter] = useState(null);
  const [designLink, setDesignLink] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const FILE_SIZE = 1024 * 1024 * 50; // 2MB size limit
  const SUPPORTED_FORMATS = ["dxf", "dwg"];
  const SUPPORTED_FORMATS_Image = ["png", "jpg", "jpeg"];
  const [loader, setLoader] = useState(false);
  const [colors, setColors] = useState("");
  const [colorId, setcolorId] = useState("");
  const [finishId, setfinishId] = useState("");
  const [finish, setfinish] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [count, setCount] = useState(false);
  const handleDisclaimerShow = () => setShowDisclaimer(true);
  const handleDisclaimerHide = () => setShowDisclaimer(false);
  const router = useRouter();
  const fetchThickness = async (id) => {
    try {
      const response = await getThickness(id);
      setThickness(response.data);
    } catch (error) {
      console.error("Error fetching thickness:", error);
    }
  };
  const handleGetDataFormOtherApi = (id) => {
    getColorOfmaterial(id)
      .then((res) => setColors(res.data))
      .catch((error) => console.error("err", error));
    getFinishOfMaterial(id)
      .then((res) => setfinish(res.data))
      .catch((error) => console.error("err", error));
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await getMaterials();
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();

    getProfile()
      .then((res) => {
        setUserId(res?.data[0]?.user_id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    setCount(true);
    if (count) {
      if (localStorage.getItem("modalStatus") == "false") {
        localStorage.removeItem("modalStatus");
      } else {
        handleDisclaimerShow();
      }
    }
  }, [count]);
  const handleChangePhoto = async (photo, setFieldValue) => {
    setLoader(true);
    try {
      let data = {};
      data.photo = photo;
      const res = await changePhotoHandler(data);
      setLoader(false);
      setFieldValue("circumference", res?.circumference | "");
      setFieldValue("height", res?.height || "");
      setFieldValue("width", res?.width || "");

      // Calculate the circumference and round it
      let circumference = res.circumference / 1000;
      let roundedNumber = parseFloat(circumference.toFixed(2));

      // Set the LinearMeters field value using Formik's setFieldValue
      setFieldValue("linearMeters", roundedNumber);
      setLinearmeter(roundedNumber);
      setDesignLink(res?.design_link);
      setHeight(res?.height);
      setWidth(res?.width);
    } catch (err) {
      setLoader(false);
      Swal.fire({
        position: "center",
        icon: `error`,
        title: `Error - ${err?.data?.error}`,
        confirmButtonText: "Okay",
        timer: 3000,
      });
    }
  };

  const handleQuote = async (values) => {
    setLoader(true);
    try {
      const res = await addQuote(values);
      console.log("Total Cutting Square Meters:", res.totalCuttingSqrMtrs);
      setLoader(false);
      setSellingPrice(res?.sellingPrice);
      setActualPrice(res?.taxableValue);
      setVatPercentage(res?.vatPercentage);
      setVatPrice(res?.vat);

      Swal.fire({
        icon: "success",
        title: "Quote submitted Successfully",
        text: res?.data ? "Quote submitted Successfully" : "",
        confirmButtonText: "Okay",
        timer: 4000,
      }).then((result) => {
        if (result.isConfirmed || result.dismiss) {
          setRefetch(!refetch);
        }
      });
    } catch (err) {
      setLoader(false);
      Swal.fire({
        position: "center",
        icon: `error`,
        title: `Error - ${err?.data?.error}`,
        confirmButtonText: "Okay",
        timer: 3000,
      });
    }
  };

  const handleAddToCart = () => {
    setLoader(true);
    getRigidFileLink(imageUrl)
      .then((res) => {
        const data = {
          selling_price: sellingPrice ? sellingPrice : "",
          actual_price: actualPrice ? actualPrice : "",
          vat_price: vatPrice ? vatPrice : "",
          vat_percentage: vatPercentage ? vatPercentage : "",
          status: "pending",
          userId: userId ? userId : "",
          inCart: "true",
          color_id: colorId ? colorId : "",
          finish_id: finishId ? finishId : "",
          // rigid_image: response.data,
          rigid_file: res.data,
          imagePreview: "",
          material_id: materialId ? materialId : "",
          thickness_id: thicknessId ? thicknessId : "",
          quantity: quantity ? quantity : "",
          linearmeter: linearmeter ? linearmeter : "",
          id: "",
          circumference: circumference ? circumference : "",
          design_link: designLink ? designLink : "",
          height: height ? height : "",
          width: width,
        };

        addCart(data)
          .then((res) => {
            setLoader(false);
            router.push("/shopping-cart");
            Swal.fire({
              icon: "success",
              title: "Item added to the Cart",
              text: res?.data ? "Item added to the Cart" : "",
              confirmButtonText: "Okay",
              timer: 4000,
            }).then((result) => {
              if (result.isConfirmed || result.dismiss) {
                setRefetch(!refetch);
              }
            });
          })
          .catch((err) => {
            setLoader(false);
            Swal.fire({
              position: "center",
              icon: `error`,
              title: `Error - ${err?.data?.error}`,
              confirmButtonText: "Okay",
              timer: 3000,
            });
          });
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const handleReset = (resetForm, setFieldValue) => {
    resetForm();
    setImageUrl("");
    setFieldValue("photo", null);
    setFieldValue("photo", "");
    setFieldValue("photo", "", false);
    setImageUrl("");
    // window.location.reload();
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Clear file label
    const fileLabel = document.querySelector(
      'label[for="file"] .no-file-chosen'
    );
    // const fileLabel1 = document.querySelector(
    //   'label[for="image"] .no-file-chosen'
    // );
    if (fileLabel) {
      fileLabel.textContent = "No file chosen";
    }
    // if (fileLabel1) {
    //   fileLabel1.textContent = "No file chosen";
    // }
  };

  // Rigid Substrates
  const rigidSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function formatNumber(num) {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return (
    <section className="rigid-substrates-area">
      {/* rigid-substrates-area */}
      <div className="rigid-substrates sc-pt-50 sc-pb-50">
        <h2 className="text-center">RIGID SUBSTRATES</h2>
        <div className="rigid-slider">
          <Slider {...rigidSettings}>
            <div className="rigid-item">
              <div className="item-img">
                <Link href="#">
                  <Image
                    src="/assets/images/rigid-1.jpg"
                    alt="Clients"
                    width={405}
                    height={300}
                    priority={true}
                  />
                </Link>
              </div>
            </div>
            <div className="rigid-item">
              <div className="item-img">
                <Link href="#">
                  <Image
                    src="/assets/images/rigid-2.jpg"
                    alt="Clients"
                    width={405}
                    height={300}
                    priority={true}
                  />
                </Link>
              </div>
            </div>
            <div className="rigid-item">
              <div className="item-img">
                <Link href="#">
                  <Image
                    src="/assets/images/rigid-3.jpg"
                    alt="Clients"
                    width={405}
                    height={300}
                    priority={true}
                  />
                </Link>
              </div>
            </div>
            <div className="rigid-item">
              <div className="item-img">
                <Link href="#">
                  <Image
                    src="/assets/images/rigid-4.jpg"
                    alt="Clients"
                    width={405}
                    height={300}
                    priority={true}
                  />
                </Link>
              </div>
            </div>
            <div className="rigid-item">
              <div className="item-img">
                <Link href="#">
                  <Image
                    src="/assets/images/rigid-2.jpg"
                    alt="Clients"
                    width={405}
                    height={300}
                    priority={true}
                  />
                </Link>
              </div>
            </div>
          </Slider>
          <div className="arrows-area"></div>
        </div>
      </div>
      {/* Choose options */}
      <div className="choose-options sc-pt-50 sc-pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="choose-option-left">
                <p>
                  It is simple. Choose options and upload your design. Click on
                  'Get A Quote' to see your price instantly. We do not require
                  your entire design file but the cut-file. Your cut-file in dxf
                  format makes our price calculation accurate.
                </p>
                <p>
                  While presently we can process .dxf and .dwg files only. In
                  case of an issue, we will get back to you.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="choose-option-right">
                <Formik
                  initialValues={{
                    photo: null,
                    circumference: "",
                    height: "",
                    image: {},
                    imagePreview:
                      "blob:https://thecuttingcenter.com/efa2a122-d333-4ed5-86ec-4b9b9ef440fd",
                    isUserProvideMaterial: false,
                    material_id: "",
                    quantity: "",
                    thickness_id: "",
                    width: "",
                    color_id: "",
                    finish_id: "",
                  }}
                  enableReinitialize={true}
                  validationSchema={yup.object().shape({
                    photo: yup
                      .mixed()
                      .required("File is required")
                      .test(
                        "fileFormat",
                        "Unsupported Format, only .dxf allowed",
                        (value) => {
                          if (value) {
                            const fileExtension = value.name
                              .split(".")
                              .pop()
                              .toLowerCase();
                            return SUPPORTED_FORMATS.includes(fileExtension);
                          }
                          return false;
                        }
                      )
                      .test("fileSize", "File too large, max 2MB", (value) => {
                        return value && value.size <= FILE_SIZE;
                      }),
                    linearMeters: yup
                      .string()
                      .required("Linear Meters is required"),
                    material_id: yup.string().required("Material is required"),
                    thickness_id: yup
                      .string()
                      .test(
                        "material_id",
                        "Thickness is required!",
                        function (value) {
                          const data = this.parent;
                          // console.log("data", data,"dkkadfadfadf;", materialId);

                          if (
                            data?.material_id &&
                            data?.material_id != "" &&
                            data?.thickness_id == null
                          ) {
                            return false;
                          }

                          return true;
                        }
                      ),
                    color_id: yup
                      .string()
                      .test("color_id", "Color is required!", function (value) {
                        const data = this.parent;
                        console.log("data", data, "dkkadfadfadf;", colors);

                        if (
                          colors &&
                          colors?.length > 0 &&
                          data?.color_id == null
                        ) {
                          return false;
                        }

                        return true;
                      }),
                    finish_id: yup
                      .string()
                      .test(
                        "finish_id",
                        "Finish is required!",
                        function (value) {
                          const data = this.parent;
                          console.log("data", data, "dkkadfadfadf;", finish);

                          if (
                            finish &&
                            finish?.length > 0 &&
                            data?.finish_id == null
                          ) {
                            return false;
                          }

                          return true;
                        }
                      ),
                    quantity: yup
                      .number()
                      .min(1, "Minimum 1 quantity required!")
                      .required("Quantity is required"),
                  })}
                  onSubmit={(values, { resetForm }) => {
                    values.quantity = values.quantity.toString();
                    setQuantity(values.quantity);
                    values.material_id = values.material_id.toString();
                    setCircumference(values.circumference);
                    setThicknessId(values.thickness_id);
                    setcolorId(values.color_id);
                    setfinishId(values.finish_id);
                    handleQuote(values);
                  }}
                  // onReset={(values) => {
                  //   console.log("resetform", values);
                  //   // resetForm();
                  //   handleReset(resetForm);
                  // }}
                >
                  {({ setFieldValue, touched, errors, values, resetForm }) => (
                    <Form className="choose-panel">
                      <div className="form-row">
                        <label htmlFor="file" className="form-label">
                          Upload .dxf File*
                        </label>
                        <div className="form-group col-md-12">
                          <div className="custom-file-input-wrapper">
                            <input
                              className="custom-file-input"
                              name="photo"
                              type="file"
                              id="file"
                              ref={fileInputRef}
                              onChange={(event) => {
                                const fileInput = event.currentTarget;
                                const fileLabel = document.querySelector(
                                  `label[for="${fileInput.id}"] .no-file-chosen`
                                );
                                const file = fileInput.files[0];
                                const fileName = file
                                  ? file.name
                                  : "No file chosen";

                                fileLabel.textContent = fileName;
                                // Set the file in Formik state
                                handleChangePhoto(file, setFieldValue);
                                setFieldValue("photo", file);
                                setImageUrl(file);
                                // Optionally trigger validation manually
                                setFieldValue("photo", file, true);
                              }}
                            />

                            <label htmlFor="file" className="custom-file-label">
                              <span className="choose-file-text">
                                Choose File
                              </span>
                              <span className="no-file-chosen">
                                No file chosen
                              </span>
                            </label>
                          </div>
                          {touched.photo && errors.photo && (
                            <div className="text-danger mt-1">
                              {errors.photo}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-md-12">
                          <div className="checkbox-container">
                            <Field
                              id="materialProvided"
                              name="isUserProvideMaterial"
                              type="checkbox"
                              checked={values.isUserProvideMaterial}
                              onChange={(event) => {
                                setFieldValue(
                                  "isUserProvideMaterial",
                                  event.target.checked
                                );
                              }}
                              className="form-check-input"
                            />
                            <label
                              htmlFor="materialProvided"
                              className="form-check-label"
                            >
                              Material will be provided by me
                            </label>
                          </div>
                        </div>

                        <div className="form-group col-md-12">
                          <label htmlFor="file" className="form-label">
                            Linear-Meters of your project in meters
                          </label>
                          <Field
                            id="linearMeters"
                            name="linearMeters"
                            type="number"
                            className={`form-control ${
                              touched.linearMeters && errors.linearMeters
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Linear-meters of your drawing in Meter"
                            value={values.linearMeters || ""}
                            readOnly
                          />
                        </div>

                        <div className="form-group col-md-12">
                          <label htmlFor="file" className="form-label">
                            Choose Material type*
                          </label>
                          <div className="custom-select-wrapper">
                            <Field
                              id="material"
                              name="material_id"
                              as="select"
                              className={`form-control ${
                                touched.material && errors.material
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={(event) => {
                                const selectedMaterialId = event.target.value;
                                const selectedOption = options.find(
                                  (option) =>
                                    option.material_id == selectedMaterialId
                                );
                                setFieldValue(
                                  "material_id",
                                  selectedOption?.material_id
                                );
                                fetchThickness(selectedOption?.material_id);
                                handleGetDataFormOtherApi(
                                  selectedOption?.material_id
                                );
                                setMaterialId(
                                  selectedOption?.material_id.toString()
                                );
                              }}
                            >
                              <option value="">Choose Material</option>
                              {options.map((option) => (
                                <option
                                  key={option.material_id}
                                  value={option.material_id}
                                >
                                  {option.material_name}
                                </option>
                              ))}
                            </Field>
                          </div>
                          {touched.material_id && errors.material_id && (
                            <div className="text-danger mt-1">
                              {errors.material_id}
                            </div>
                          )}
                        </div>

                        {materialId && (
                          <div className="form-group col-md-12">
                            <label htmlFor="file" className="form-label">
                              Choose Thickness*
                            </label>
                            <div className="custom-select-wrapper">
                              <Field
                                id="thickness_id"
                                name="thickness_id"
                                as="select"
                                className={`form-control ${
                                  touched.thickness_id && errors.thickness_id
                                    ? "is-invalid"
                                    : ""
                                }`}
                              >
                                <option value="">Choose Thickness</option>
                                {thickness.map((thick) => (
                                  <option
                                    key={thick.thickness_id}
                                    value={thick.thickness_id}
                                  >
                                    {thick.thickness} mm
                                  </option>
                                ))}
                              </Field>
                            </div>
                            {touched.thickness_id && errors.thickness_id && (
                              <div className="text-danger mt-1">
                                {errors.thickness_id}
                              </div>
                            )}
                          </div>
                        )}
                        {colors && colors?.length > 0 && (
                          <div className="form-group col-md-12">
                            <label htmlFor="file" className="form-label">
                              Choose Color*
                            </label>
                            <div className="custom-select-wrapper">
                              <Field
                                id="thickness_id"
                                name="color_id"
                                as="select"
                                className={`form-control ${
                                  touched.color_id && errors.color_id
                                    ? "is-invalid"
                                    : ""
                                }`}
                              >
                                <option value="">Choose Color</option>
                                {colors?.map((thick) => (
                                  <option
                                    key={thick.color_id}
                                    value={thick.color_id}
                                  >
                                    {thick.color_name}
                                  </option>
                                ))}
                              </Field>
                            </div>
                            {touched.color_id && errors.color_id && (
                              <div className="text-danger mt-1">
                                {errors.color_id}
                              </div>
                            )}
                          </div>
                        )}
                        {finish && finish?.length > 0 && (
                          <div className="form-group col-md-12">
                            <label htmlFor="file" className="form-label">
                              Choose Finish*
                            </label>
                            <div className="custom-select-wrapper">
                              <Field
                                id="thickness_id"
                                name="finish_id"
                                as="select"
                                className={`form-control ${
                                  touched.finish_id && errors.finish_id
                                    ? "is-invalid"
                                    : ""
                                }`}
                              >
                                <option value="">Choose Finish</option>
                                {finish?.map((thick) => (
                                  <option
                                    key={thick.finish_id}
                                    value={thick.finish_id}
                                  >
                                    {thick.finish_name}
                                  </option>
                                ))}
                              </Field>
                            </div>
                            {touched.finish_id && errors.finish_id && (
                              <div className="text-danger mt-1">
                                {errors.finish_id}
                              </div>
                            )}
                          </div>
                        )}
                        {/* <div className="form-group col-md-12">
                          <div className="custom-file-input-wrapper">
                            <input
                              className="custom-file-input"
                              name="image"
                              type="file"
                              id="image"
                              onChange={(event) => {
                                const fileInput = event.currentTarget;
                                console.log("image", fileInput);
                                const fileLabel = document.querySelector(
                                  `label[for="${fileInput.id}"] .no-file-chosen`
                                );
                                const file = fileInput.files[0];
                                const fileName = file
                                  ? file.name
                                  : "No file chosen";
                                setFileLink(file);
                                fileLabel.textContent = fileName;
                                setFieldValue("image", file);
                                // Optionally trigger validation manually
                                setFieldValue("image", file, true);
                              }}
                            />

                            <label
                              htmlFor="image"
                              className="custom-file-label"
                            >
                              <span className="choose-image-text">
                                <strong>Choose Image</strong>
                              </span>
                              <span className="no-file-chosen">
                                No image chosen
                              </span>
                            </label>
                          </div>
                          {touched.image && errors.image && (
                            <div className="text-danger mt-1">
                              {errors.image}
                            </div>
                          )}
                        </div> */}

                        <div className="form-group col-md-12">
                          <label htmlFor="file" className="form-label">
                            Enter Quantity*
                          </label>
                          <Field
                            id="quantity"
                            name="quantity"
                            type="number"
                            className={`form-control ${
                              touched.quantity && errors.quantity
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Quantity"
                            onChange={(e) => {
                              // Allow only numbers and restrict length to 5 characters
                              const inputValue = e.target.value.replace(/\D/g, "");
                              setFieldValue("quantity", inputValue);
                            }}
                            onKeyDown={(e) => {
                              // Prevent non-numeric keys
                              if (["e", "E", "+", "-", "."].includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                           
                            min={1}
                          />
                          {touched.quantity && errors.quantity && (
                            <div className="text-danger mt-1">
                              {errors.quantity}
                            </div>
                          )}
                        </div>

                        <div className="btn-holder col-md-12">
                          <button type="submit" className="btn btn-green mr-2">
                            Get a Quote
                          </button>
                          <button
                            type="reset"
                            className="btn btn-white"
                            style={{ width: "159px" }}
                            onClick={() =>
                              handleReset(resetForm, setFieldValue)
                            }
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {sellingPrice && (
                <div className="add_to_cart_bottom_strip mt-4 added-cart-item">
                  <div>
                    <span className="price">Net Price:</span>{" "}
                    <span className="price_value">
                      AED {formatNumber(sellingPrice.toFixed(2))}
                    </span>{" "}
                    <span className="vat">(Price inclusive of VAT)</span>
                  </div>
                  <a onClick={() => handleAddToCart()} href="#">
                    <span>Add to Cart</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="faq-substrates sc-pt-50 sc-pb-50">
        <div className="container">
          <h3 className="text-center">FAQs</h3>
          <ul className="geenral-list">
            <li>
              In any case, where the estimate is not found to be accurate due to
              version change or any other reasons, we shall get back to you by
              email or phone to explain and adjust the estimate, if payment has
              already been made.
            </li>
            <li>
              We follow a mechanism to auto-read your file and auto-estimate, to
              get you an instant quotation, to save you time and help you with
              quick decision.
            </li>
          </ul>
        </div>
      </div> */}
      {loader && <Loader />}
      <ImpDisclaimerModal
        show={showDisclaimer}
        handleClose={handleDisclaimerHide}
      />
    </section>
  );
};

export default RigidSubstrates;
