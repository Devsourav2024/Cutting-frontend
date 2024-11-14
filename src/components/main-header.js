"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { getProfile } from "@/services/user";

const MainHeader = () => {
  const { logout, profile_auth } = useAuth();
  const router = useRouter();
  // Menu Sticky
  const [sticky, setSticky] = useState("");
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [storedValue, setStoredValue] = useState(null);

  const handleChange = (setState) => (event) => {
    setState(event);
  };

  useEffect(() => {
    let user_dtls = "";
    user_dtls = localStorage.getItem("user-token");
    setStoredValue(user_dtls);

    window.addEventListener("scroll", isSticky);
    if (window.scrollY > 100) {
      isSticky();
    }
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);
  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 50 ? "sticky" : "";
    handleChange(setSticky(stickyClass));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout(); // Use context method to remove token
    setPopoverVisible(false);
    setStoredValue(null);
    router.push("/");
  };

  return (
    <>
      <div className="header-height"></div>
      <header className={`main-header ${sticky}`}>
        <div className="container">
          <div className="header-container">
            <div className="logo">
              <Link href="/">
                <Image
                  src="/assets/images/logo.png"
                  alt="Cutting Center"
                  width={274}
                  height={117}
                  priority={true}
                />
              </Link>
            </div>
            <div className="header-right">
              <nav className="main-menu">
                <ul>
                  {/* <li>
                    <Link href="">
                      <Image
                        src="/assets/images/contact-icon.svg"
                        alt="Cutting Center"
                        width={48}
                        height={48}
                        priority={true}
                      />
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link href="/rigid-substrates">
                      <Image
                        src="/assets/images/rigid-2.jpg"
                        alt="Cutting Center"
                        width={48}
                        height={48}
                        priority={true}
                      />
                      <span>Rigid substrates</span>
                    </Link>
                  </li> */}
                  {storedValue ? (
                    ""
                  ) : (
                    <li>
                      <Link href="/login">
                        <Image
                          src="/assets/images/user-icon.svg"
                          alt="Cutting Center"
                          width={48}
                          height={48}
                          priority={true}
                        />
                        {/* <span>Login</span> */}
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>

              <nav className="main-menu-login">
                <ul>
                  {/* <li>
                    <Link href="/">
                      <Image
                        src="/assets/images/home-icon.webp"
                        alt="Cutting Center"
                        width={28}
                        height={28}
                        priority={true}
                      />
                    </Link>
                  </li> */}
                  {/* {storedValue ? (
                    <li>
                      <Link href="/shopping-cart">
                        <Image
                          src="/assets/images/cart-icon.webp"
                          alt="Cutting Center"
                          width={28}
                          height={28}
                          priority={true}
                        />
                      </Link>
                    </li>
                  ) : (
                    ""
                  )} */}
                  {storedValue ? (
                    <li className="profile-icon">
                      <Link href="/profile">
                        <Image
                          src={
                            profile_auth[0]?.profile_picture
                              ? profile_auth[0]?.profile_picture
                              : "/assets/images/not-avlaible.png"
                          }
                          alt="Cutting Center"
                          width={48}
                          height={48}
                          priority={true}
                          unoptimized={true}
                        />
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  {storedValue && (
                    <div className="dropdown">
                      <Image
                        src="/assets/images/dots-icon.webp"
                        alt="Cutting Center"
                        width={25}
                        height={25}
                        priority={true}
                        className="dropbtn"
                      />
                      <div className="dropd">
                        <div className="dropdown-content mr-5">
                          {/* <a href="/rigid-substrates">RIGID SUBSTRATES</a> */}
                          {storedValue && (
                            <a href="/shopping-cart">SHOPPING CART</a>
                          )}
                          <a href="/my-order">MY ORDERS</a>
                          <a href="/profile">MY PROFILE</a>
                          <a href="/" onClick={handleLogout}>
                            LOGOUT
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* {storedValue ? (
                    <li className="profile-icon">
                      <Link href="/" onClick={handleLogout}>
                        <span>Logout</span>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )} */}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default MainHeader;
