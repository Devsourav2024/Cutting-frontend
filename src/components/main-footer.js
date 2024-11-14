"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ImpDisclaimerModal from "./modal/ImpDisclaimerModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import BookAMeetingMOdal from "./modal/BookAMeeting";
import VideoModals from "./modal/VideoModal";

const MainFooter = () => {
  // Display dynamically year in copyright
  const currentYear = new Date().getFullYear();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showVideo, setshowVideo] = useState(false);
  const handleDisclaimerHide = () => {
    setShowDisclaimer(false);
    setShowPriceModal(false);
    setshowVideo(false);
  };
  return (
    <>
      {/* Footer Start */}
      <footer className="main-footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="footer-logo-area">
                  <div className="logo">
                    <Link href="/">
                      <Image
                        src="/assets/images/logo-white.png"
                        alt="Cutting Center"
                        width={274}
                        height={117}
                        priority={true}
                      />
                    </Link>
                  </div>
                  {/* <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p> */}
                  {/* <div className="followis">
                    <ul className="social-media">
                      <li>
                        <Link href="#">
                          <Image
                            src="/assets/images/facebook-icon.webp"
                            alt="Cutting Center"
                            width={29}
                            height={29}
                            priority={true}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            src="/assets/images/instagram-icon.webp"
                            alt="Cutting Center"
                            width={29}
                            height={29}
                            priority={true}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            src="/assets/images/youtube-icon.webp"
                            alt="Cutting Center"
                            width={29}
                            height={29}
                            priority={true}
                          />
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
              <div className="col-md-5">
                <div className="row footer-col">
                  <div className="footer-nav col-md-6">
                    <h5>Quick Links</h5>
                    <nav className="footer-navigation">
                      <ul>
                        <li>
                          <Link href="#" onClick={() => setshowVideo(true)}>
                            How it Works
                          </Link>
                        </li>
                        <li>
                          <Link href="/sheet-metal-materials">
                            Sheet Metal Materials
                          </Link>
                        </li>
                        {/* <li>
                          <Link href="#">Surface Finishing</Link>
                        </li> */}
                        <li>
                          <Link
                            href="#"
                            onClick={() => setShowDisclaimer(true)}
                          >
                            Design Guides
                          </Link>
                        </li>
                        <li onClick={() => setShowPriceModal(true)}>
                          <Link href="#">Book a Meeting</Link>
                        </li>
                        <li>
                          <Link href="/faq">FAQs</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="footer-nav col-md-6">
                    <h5>Capabilities</h5>
                    <nav className="footer-navigation">
                      <ul>
                        <li>
                          <Link href="/our-capabilities/laser-cutting">
                            Laser Cutting
                          </Link>
                        </li>
                        <li>
                          <Link href="/#our_capabilties">
                            CNC Sheet Metal Bending
                          </Link>
                        </li>
                        {/* <li>
                          <Link href="#">Threading & Chamfering</Link>
                        </li> */}
                        {/* <li>
                          <Link href="#">Surface Finishing</Link>
                        </li> */}
                        {/* <li>
                          <Link href="#">Hardware</Link>
                        </li>
                        <li>
                          <Link href="#">Laser Engraving</Link>
                        </li>
                        <li>
                          <Link href="#">CNC Turning</Link>
                        </li> */}
                        <li>
                          <Link href="/#our_capabilties">3D Printing</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="footer-address col-md-4">
                <h5>Address</h5>
                <ul className="footer-contact">
                  <li className="address">
                    <Link href="tel:+97148231444">
                      <Image
                        src="/assets/images/map-pointer-f-icon.webp"
                        alt="The Cutting Center"
                        width={24}
                        height={24}
                        priority={true}
                      />
                      <p>597-673 Dubai Investments Park 2, Jebel Ali Dubai</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="tel:+97148231444">
                      <Image
                        src="/assets/images/tel-f-icon.webp"
                        alt="The Cutting Center"
                        width={24}
                        height={24}
                        priority={true}
                      />
                      <span>+97148231444</span>
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:support@thecuttingcenter.com">
                      <Image
                        src="/assets/images/email-f-icon.webp"
                        alt="The Cutting Center"
                        width={24}
                        height={24}
                        priority={true}
                      />
                      <span>support@thecuttingcenter.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright Start */}
        <div className="footer-copyright">
          <div className="container">
            <div className="footer-copyrigh-row">
              <ul>
                <li>
                  <Link href="/contact-us">Contact Us</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy and Cookie Policy</Link>
                </li>
                {/* <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip>No Refunds once the cutting starts</Tooltip>
                  }
                > */}
                <li>
                  <Link href="/faq#return-policy">Returns & Refunds</Link>
                </li>
                {/* </OverlayTrigger> */}
              </ul>
              <p>All Rights Reserved &copy; {currentYear} Blue Rhine</p>
            </div>
          </div>
        </div>
        <ImpDisclaimerModal
          show={showDisclaimer}
          handleClose={handleDisclaimerHide}
        />
        <BookAMeetingMOdal
          showPriceModal={showPriceModal}
          handleClosePriceModal={handleDisclaimerHide}
        />
        <VideoModals show={showVideo} handleClose={handleDisclaimerHide} link="cnc_cutting_2.mp4"/>
      </footer>
    </>
  );
};

export default MainFooter;
