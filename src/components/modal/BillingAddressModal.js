import Modal from "react-bootstrap/Modal";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { getArea, getCities } from "@/services/shipping";

const BillingAddressModal = ({
  show,
  handleClose,
  initValues,
  isUpdate,
  handleAddress,
}) => {
  const [cityList, setcityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  useEffect(() => {
    handleGetCity();
  }, []);

  // city list get functionality
  const handleGetCity = () => {
    getCities()
      .then((res) => {
        setcityList(res.data);
      })
      .catch((err) => console.log("err", err));
  };
  const hanldeGetArea = (id) => {
    getArea(id)
      .then((res) => setDistrictList(res.data))
      .catch((err) => console.log("err", err));
  };
  const handleGetCityName = (id) => {
    const cityl = cityList.find((item) => item.name == id);
    return cityl?.city_id;
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="billing-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className="modal-title text-center mb-4">
            {isUpdate ? "Edit Address" : "Add Address"}
          </h4>
          <Formik
            initialValues={initValues}
            validationSchema={yup.object().shape({
              // address: yup
              //   .string()
              //   .max(200, "Address not more than 40 characters long")
              //   .required("Address is required"),
              country: yup
                .string()
                .max(40, "Country not more than 40 characters long")
                .required("Country is required"),
              area: yup
                .string()
                .max(40, "Area not more than 40 characters long")
                .required("Area is required"),
              street: yup
                .string()
                .max(40, "Street not more than 40 characters long")
                .required("Street name is required"),
              building: yup
                .string()
                .max(40, "Building not more than 50 characters long")
                .required("Building name is required"),
              landmark: yup
                .string()
                .max(40, "Landmark not more than 50 characters long"),
              // .required("Landmark is required"),
              city: yup
                .string()
                .max(40, "City not more than 40 characters long")
                .required("City is required"),
              pin_code: yup.string()
              .length(5, "Zip Code should be 5 digit"),
              // .required("Pin Code is required"),
              trn: yup.string()
              .matches(/^\d{15}$/, "TRN must be exactly 15 digits"),
            })}
            onSubmit={(values) => {
              handleAddress(values);
            }}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form className="modal-panel">
                <div className="form-row">
                  {/* <div className="form-group col-md-12">
                    <label>Address</label>
                    <Field
                      className="form-control"
                      type="text"
                      placeholder="Enter Address"
                      name="address"
                    />
                    {touched.address && errors.address && (
                      <div className="text-danger mt-1">{errors.address}</div>
                    )}
                  </div> */}
                  <div className="form-group">
                    <label> Country*</label>
                    <Field
                      name="country"
                      className="form-control"
                      placeholder="Country"
                      value="United Arab Emirates"
                      // disabled
                    />
                    {/* <ErrorMessage name="country" /> */}
                    {touched.country && errors.country && (
                      <div className="text-danger mt-1">{errors.country}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label> City / Emirates*</label>
                    <Field
                      name="city"
                      className="form-control"
                      placeholder="City"
                      as="select"
                      onChange={(e) => {
                        let cityname = handleGetCityName(e.target.value);
                        setFieldValue("city_id", cityname);
                        hanldeGetArea(cityname);
                        setFieldValue("city", e.target.value);
                      }}
                    >
                      <option value="">Select City</option>
                      {cityList.map((city) => (
                        <option key={city.city_id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </Field>
                    {touched.city && errors.city && (
                      <div className="text-danger mt-1">{errors.city}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Area / District*</label>
                    <Field
                      name="area"
                      className="form-control"
                      placeholder="Area"
                      as="select"
                    >
                      {values.area ? (
                        <option value={values.area}>{values.area}</option>
                      ) : (
                        <option>Select District</option>
                      )}
                      {districtList.map((district) => (
                        <option
                          key={district.district_id}
                          value={district.name}
                        >
                          {district.name}
                        </option>
                      ))}
                    </Field>
                    {touched.area && errors.area && (
                      <div className="text-danger mt-1">{errors.area}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label> Building Name*</label>
                    <Field
                      name="building"
                      className="form-control"
                      placeholder="Building, Company, etc"
                    />
                    {touched.building && errors.building && (
                      <div className="text-danger mt-1">{errors.building}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label> Street Name* </label>
                    <Field
                      name="street"
                      className="form-control"
                      placeholder="Street Address"
                    />
                    {touched.street && errors.street && (
                      <div className="text-danger mt-1">{errors.street}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label> Landmark</label>
                    <Field
                      name="landmark"
                      className="form-control"
                      placeholder="Landmark"
                    />
                    {touched.landmark && errors.landmark && (
                      <div className="text-danger mt-1">{errors.landmark}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label> Zip Code</label>
                    <Field
                      type="number"
                      name="pin_code"
                      className="form-control"
                      placeholder="Zip Code"
                      // onKeyDown={(e) => e.key === "e" && e.preventDefault()}
                      // onChange={(e) => {
                      //   if (e.target.value >= 0) {
                      //     setFieldValue("pin_code", e.target.value);
                      //   }
                      // }}
                      onChange={(e) => {
                        // Allow only numbers and restrict length to 5 characters
                        const inputValue = e.target.value.replace(/\D/g, "").slice(0, 5);
                        setFieldValue("pin_code", inputValue);
                      }}
                      onKeyDown={(e) => {
                        // Prevent non-numeric keys
                        if (["e", "E", "+", "-", "."].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      min={1}
                    />
                    {touched.pin_code && errors.pin_code && (
                      <div className="text-danger mt-1">{errors.pin_code}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label> TRN Number or VAT Number</label>
                    <Field
                      type="number"
                      name="trn"
                      className="form-control"
                      placeholder="Enter TRN Number or VAT Number"
                      onChange={(e) => {
                        // Allow only numbers and restrict length to 5 characters
                        const inputValue = e.target.value.replace(/\D/g, "").slice(0, 15);
                        setFieldValue("trn", inputValue);
                      }}
                      onKeyDown={(e) => {
                        // Prevent non-numeric keys
                        if (["e", "E", "+", "-", "."].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {touched.trn && errors.trn && (
                      <div className="text-danger mt-1">{errors.trn}</div>
                    )}
                  </div>
                  <div className="form-btn-panel text-center col-12">
                    <button className="btn btn-green" type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BillingAddressModal;
