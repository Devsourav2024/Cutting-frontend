"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";
import VideoModal from "../modal/VideoModal";
import ImpDisclaimerModal from "../modal/ImpDisclaimerModal";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { handleSubmitContact } from "@/services/home";
import Swal from "sweetalert2";
const Home = () => {
  const routes = useRouter();
  const { auth } = useAuth();
  const [count, setcount] = useState(false);
  useEffect(()=>{
    if(count){
      let cancelorder = localStorage.getItem("cancelOrder");
      console.log("cancelOrder", typeof cancelorder);
      if(cancelorder == "true"){
          localStorage.setItem("cancelOrder", false);
          location.reload();
      }
    }
   setcount(true);
  },[count]);
  // const [quotes, setQuotes] = useState(null);

  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/posts?limit=10')
  //     //.then(res => console.log(res))
  //     .then(res => setQuotes(res.data))
  //     .catch(err => console.error(err));
  // }, []);

  // Create Client instance
  
  const clientSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: false,
    centerPadding: "0px",
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Get an exact price Array
  const exactprice = [
    {
      imgSrc: "/assets/images/icon-upload.webp",
      altText: "Upload Drawings",
      heading: "UPLOAD YOUR DRAWINGS",
      description:
        "Upload your drawings to our secure platform in DXF and DWG formats.",
    },
    {
      imgSrc: "/assets/images/icon-select.webp",
      altText: "Select Material Finish",
      heading: "SELECT MATERIAL FINISH",
      description:
        "Choose your desired material, surface finishes, and tolerance requirements.",
    },
    {
      imgSrc: "/assets/images/icon-quote.webp",
      altText: "Get a Quote Online",
      heading: "GET A QUOTE ONLINE",
      description:
        "Obtain exact pricing in real-time! Change materials and quantities to compare pricing. Save the quote or place an order.",
    },
  ];

  //capabilities Array
  const capabilities = [
    {
      src: "/assets/images/capabilities-01.webp",
      url: "/our-capabilities/laser-cutting",
      title: "LASER CUTTING",
      tooltip: "",
      imagecaption: "",
    },
    {
      src: "/assets/images/capabilities-02.webp",
      // url: "/our-capabilities/sheet-metal",
      url: "#",
      title: "SHEET METAL BENDING",
      tooltip: "Technology will be coming soon!",
      imagecaption: "Technology will be coming soon!",
    },
    {
      src: "/assets/images/capabilities-03.webp",
      // src: "/assets/images/3D.jpg",
      // url: "/our-capabilities/3d-printing",
      url: "#",
      // title: "THREADING & CHAMPFERING",
      title: "3D PRINTING",
      tooltip: "Technology will be coming soon!",
      imagecaption: "Technology will be coming soon!",
    },
    // {
    //   src: "/assets/images/capabilities-04.webp",
    //   url: "#",
    //   title: "CNC TURNING",
    // },
    // {
    //   src: "/assets/images/capabilities-05.webp",
    //   url: "#",
    //   title: "SURFACE FINISHING",
    // },
  ];

  //Why Choose us Array
  const whyUsItems = [
    {
      src: "/assets/images/instant-quote-icon.webp",
      alt: "Banner",
      width: 152,
      height: 129,
      text: "Instant quote, DFM, ordering & shipment online platform",
    },
    {
      src: "/assets/images/telemarketer-icon.webp",
      alt: "Banner",
      width: 129,
      height: 129,
      text: "In-House Manufacturing Facilities",
    },
    {
      src: "/assets/images/assembly-icon.webp",
      alt: "Banner",
      width: 123,
      height: 123,
      text: "Top of the range machinery",
    },
    {
      src: "/assets/images/calendar-icon.webp",
      alt: "Banner",
      width: 152,
      height: 129,
      // text: "Parts within specifications, on time, all the time",
      text: "Delivery on time",
    },
    // {
    //   src: "/assets/images/mass-production-icon.webp",
    //   alt: "Banner",
    //   width: 132,
    //   height: 132,
    //   text: "Mass Production Competitive Pricing",
    // },
    {
      src: "/assets/images/technical-support-icon.webp",
      alt: "Banner",
      width: 132,
      height: 132,
      text: "Technical support for design for manufacturing",
    },
  ];

  // What Our Clients Say About Us
  const clientTestimonials = [
    {
      imgSrc: "/assets/images/client-1.png",
      altText: "Clients",
      name: "James Gregory",
      testimonial:
        "We have been working with The Cutting Center since its launch and have been very impressed with the quality of the fabrication, the lead times, and ease of use of the platform.",
      designation: "Design Director, HiveIQ / Form Studio",
    },
    {
      imgSrc: "/assets/images/client-2.png",
      altText: "Clients",
      name: "Scarlett Johanson",
      testimonial:
        "It's amazing you can engineer any special items for us so quickly it is even faster than writing a few words on a piece of paper! Thank you for your support!",
      designation: "Project Manager, Studio City Macau",
    },
    // You can add more objects here as needed
  ];

  const quote = {
    mobile: "+971",
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  // Create Video Model
  const [show, setShow] = useState(false);
  const [showImportantDisclaimer, setShowImportantDisclaimer] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handlerShowImpDisclaimer = () => {
    setShowImportantDisclaimer(true);
  };
  const handlerCloseImpDisclaimer = () => {
    setShowImportantDisclaimer(false);
  };

  const handleClosePriceModal = () => {
    setShowPriceModal(false);
  };
  const getExactPriceHandler = () => {
    setShowPriceModal(true);
    handleNavigateOnLogin();
  };

  const handleGetQuote = (values) => {
    values.contact_type = "book_meeting";
    handleSubmitContact(values)
      .then((res) => {
        handleClosePriceModal();
        Swal.fire({
          icon: "success",
          title: "Successfully",
          text: res?.data ? res.data.message : "",
          timer: 4000,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleNavigateOnLogin = () => {
    if (!auth) {
      localStorage.setItem("navigateUrl", "/rigid-substrates");
    }
  };

  return (
    <>
      {/* Sampe API for Test */}
      {/* {quotes ? (
        <ul>
          {quotes.map(quote => (
            <li key={quote.id}>{quote.title}</li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )} */}

      {/* Banner area Start */}
      <section className="banner-area sc-pt-50 sc-pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="banner-content">
                <h1>Big range of metals and acrylics cut to your design</h1>
                <ul>
                  <li>Real-time exact price quotes & order tracking</li>
                  <li>Wide choice of surface finishes</li>
                  <li>Super fast turnaround time & worldwide shipping</li>
                  <li>Save up to 60% compared to buying from the middleman</li>
                  <li>Online platform</li>
                </ul>
                <div className="btn-holder" onClick={handleNavigateOnLogin}>
                  <Link href="/rigid-substrates" className="btn btn-green">
                    <span>Get Instant Quote</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="banner-video">
                <button className="play-btn" onClick={() => handleShow()}>
                  {" "}
                  <Image
                    src="/assets/images/play-icon.svg"
                    alt="Banner"
                    width={108}
                    height={108}
                    priority={true}
                  />
                </button>
                <figure className="image-container">
                  <Image
                    src="/assets/images/banner-video.webp"
                    alt="Banner"
                    width={668}
                    height={513}
                    priority={true}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Get an exact area Start */}
      <section className="exact-area sc-pt-50 sc-pb-50">
        <div className="container text-center">
          <div className="head-area">
            <h2>Get an exact price quote in 30 seconds</h2>
            <p className="text-center">
              Complete these 3 easy steps or <strong>Book A Meeting</strong>{" "}
              with us
            </p>
          </div>
          <div className="con-area">
            <div className="row">
              {exactprice.map((exactpric, index) => (
                <div className="col-md-4" key={index}>
                  <figure className="image-container">
                    <Image
                      src={exactpric.imgSrc}
                      alt={exactpric.altText}
                      width={146}
                      height={140}
                      priority={true}
                    />
                  </figure>
                  <div className="con">
                    <h3>{exactpric.heading}</h3>
                    <p>{exactpric.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="btn-holder">
            <Link
              href="/rigid-substrates"
              className="btn btn-green"
              // onClick={getExactPriceHandler}
            >
              <span>GET EXACT PRICING NOW</span>
            </Link>
            <Link
              href="#"
              className="btn btn-line"
              onClick={getExactPriceHandler}
            >
              <span>Book a meeting</span>
            </Link>
          </div>
          <div className="con-holder">
            <p>
              You may reupload as many drawings as you'd like to obtain new
              price quotes.
            </p>
          </div>
        </div>
      </section>
      {/* Our Capabilities area Start */}
      <section className="capabilities-area sc-pt-50 sc-pb-50">
        <div className="container text-center" id="our_capabilties">
          <div className="head-area">
            <h3>Our Capabilities</h3>
            {/* <p>Sheet Metal Fabrication</p> */}
          </div>
          <div className="con-area">
            <div className="row">
              {capabilities.map((capability, index) =>
                capability.imagecaption ? (
                  <div className="col-md-4" key={index}>
                    <a
                      href={capability.url}
                      className="capa-container caption-container"
                    >
                      <div className="imagecaption">
                        {capability.imagecaption}
                      </div>
                      <figure className="image-container">
                        <Image
                          src={capability.src}
                          alt={capability.title}
                          width={405}
                          height={390}
                          priority={true}
                        />
                      </figure>
                      <div className="con">
                        <h4>{capability.title}</h4>
                      </div>
                    </a>
                  </div>
                ) : (
                  <div className="col-md-4" key={index}>
                    <a href={capability.url} className="capa-container">
                      <figure className="image-container">
                        <Image
                          src={capability.src}
                          alt={capability.title}
                          width={405}
                          height={390}
                          priority={true}
                        />
                      </figure>
                      <div className="con">
                        <h4>{capability.title}</h4>
                      </div>
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="btn-holder">
            <Link href="/sheet-metal-materials" className="btn btn-green">
              <span>Sheet Materials</span>
            </Link>
          </div>
        </div>
      </section>
      {/* Fast, simple, and seamless area Start */}
      <section className="seamless-area sc-pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>Fast, simple, and seamless</h3>
              <p>
                Our online ordering platform offers pain-free purchasing for all
                your sheet metal fabrication requirements. We can fulfill low-to
                high-volume industrial customized production orders while
                shrinking lead times.{" "}
              </p>
              <p>
                We have a wide range of sheet metal materials, thicknesses and
                grades in stock to further shorten turnaround time.
              </p>
            </div>
            <div className="col-md-6">
              <div className="image-container">
                <Image
                  src="/assets/images/seamless-img.webp"
                  alt="Fast, simple, and seamless"
                  width={577}
                  height={354}
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose us area Start */}
      <section className="why-area sc-pt-50 sc-pb-50">
        <div className="container text-center">
          <div className="head-area">
            <h3>Why Choose us</h3>
          </div>
          <div className="con-area">
            <div className="row">
              {whyUsItems.map((item, index) => (
                <div className="col-md-4" key={index}>
                  <div className="why-container">
                    <figure className="image-container">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        priority={true}
                      />
                    </figure>
                    <div className="con">
                      <p>{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/*What Our Clients Say About Us area Start */}
      {/* <section className="clients-area sc-pt-50 sc-pb-50">
        <div className="container text-center">
          <div className="head-area">
            <h3>What Our Clients Say About Us</h3>
          </div>
          <div className="clients-slider">
            <Slider {...clientSettings}>
              {clientTestimonials.map((client, index) => (
                <div className="clients-item" key={index}>
                  <div className="item-img">
                    <Image
                      src={client.imgSrc}
                      alt={client.altText}
                      width={86}
                      height={86}
                      priority={true}
                    />
                  </div>
                  <div className="item-con">
                    <h5>{client.name}</h5>
                    <p>{client.testimonial}</p>
                  </div>
                  <div className="item-des">{client.designation}</div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section> */}

      {/* Use the VideoModala component */}
      <VideoModal show={show} handleClose={handleClose} link="cnc_cutting.mp4" />
      <ImpDisclaimerModal
        show={showImportantDisclaimer}
        handleClose={handlerCloseImpDisclaimer}
      />
      {/* <ImpDisclaimerModal
        show={showImportantDisclaimer}
        handleClose={handlerCloseImpDisclaimer}
      /> */}

      {/* GET PRICING MODAL */}
      <Modal
        show={showPriceModal}
        onHide={handleClosePriceModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className="modal-title text-center mb-4">Schedule a Meeting</h4>
          <Formik
            initialValues={quote}
            validationSchema={yup.object().shape({
              name: yup.string()
              .matches(/^[A-Za-z\s]*$/, "Name should only contain letters")
              .required("Please enter name"),
              email: yup
                .string()
                .matches(
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  "Please enter a valid email"
                )
                .email("Invalid email address")
                .required("Email is required"),
              mobile: yup
                .string()
                .matches(/^\+971[0-9]{8,9}$/, "Invalid Contact Number")
                // .length(12, "Exact 12 digits are allowed")
                .required("Contact Number is required"),
              subject: yup.string().required("Subject is required"),
              message: yup.string().required("Message is required"),
            })}
            onSubmit={(values) => {
              handleGetQuote(values);
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="modal-panel">
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Name*</label>
                    <Field
                      className="form-control"
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const lettersOnly = inputValue.replace(/[^A-Za-z\s]/g, ""); // Remove non-letter characters
                        setFieldValue("name", lettersOnly);
                      }}
                    />
                    {touched.name && errors.name && (
                      <div className="text-danger mt-1">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email*</label>
                    <Field
                      name="email"
                      className="form-control"
                      placeholder="Enter Email Address"
                    />
                    {touched.email && errors.email && (
                      <div className="text-danger mt-1">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Contact Number*</label>
                    <Field
                      name="mobile"
                      className="form-control"
                      placeholder="Enter Contact Number"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        // If input doesn't start with '+971', add it
                        if (!inputValue.startsWith("+971")) {
                          setFieldValue("mobile", "+971");
                        } else {
                          // Allow only numbers after +971
                          const numberPart = inputValue
                            .slice(4)
                            .replace(/\D/g, ""); // Remove any non-numeric characters
                          setFieldValue("mobile", "+971" + numberPart);
                        }
                      }}
                      // type="number"
                    />
                    {touched.mobile && errors.mobile && (
                      <div className="text-danger mt-1">{errors.mobile}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Subject*</label>
                    <Field
                      name="subject"
                      className="form-control"
                      placeholder="Enter Subject"
                    />
                    {touched.subject && errors.subject && (
                      <div className="text-danger mt-1">{errors.subject}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Message*</label>
                    <Field
                      name="message"
                      className="form-control message-box"
                      placeholder="Enter Message "
                      as="textarea"
                    />
                    {touched.message && errors.message && (
                      <div className="text-danger mt-1">{errors.message}</div>
                    )}
                  </div>

                  <div className="form-btn-panel text-center col-12">
                    <button className="btn btn-green" type="submit">
                      Submit
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

export default Home;
