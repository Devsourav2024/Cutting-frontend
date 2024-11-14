"use client";
import Head from "next/head";
import Link from "next/link";
import MainHeader from "@/components/main-header";
import MainFooter from "@/components/main-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClientComponent from "./client-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/scss/_all.scss";
import "@/styles/scss/_media.scss";
import "@/styles/scss/_variable.scss";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AuthGuard from "@/utils/AuthGuard";
import { AuthProvider } from "./context/AuthContext";
import AuthRedirect from "./context/AuthRedirect";
import Image from "next/image";

/* export const metadata = {
  title: "The Cutting Center",
  description: "The Cutting Center",
  icons: {
    icon: "/favicon.ico",
  },
}; */

export default function RootLayout({ children }) {
  const [currentUrl, setCurrentUrl] = useState("");
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  useEffect(() => {
    // Access the URL from the window object
    setCurrentUrl(pathname);
  }, [pathname]);

  return (
    <>
      <AuthProvider>
        <html lang="en">
          <Head>
            {/* Other meta tags, title, etc. */}
            {/* {<link rel="icon" href="/favicon.ico" />} */}
          </Head>

          <body suppressHydrationWarning={true}>
            <ClientComponent />
            <AuthRedirect>
              {currentUrl == "/login" ||
              pathname.startsWith("/forgot-password") ? (
                <>
                  <div class="header-height"></div>
                  <header class="main-header sticky loginPageTop">
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
                      </div>
                    </div>
                  </header>
                  <main className="mainpanel">{children}</main>

                  <div className="footer-copyright loginFooter">
                    <div className="container">
                      <div className="footer-copyrigh-row d-flex">
                        <div className="col-md-4">
                          <div className="footer-logo-area">
                            <div className="logo">
                              <Link href="/">
                                <Image
                                  src="/assets/images/logo-white.png"
                                  alt="Cutting Center"
                                  width={136}
                                  height={58}
                                  priority={true}
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <p
                          style={{
                            marginTop: "86px",
                          }}
                        >
                          All Rights Reserved &copy; {currentYear} Blue Rhine
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <AuthGuard>
                    <MainHeader />
                    <main className="mainpanel">{children}</main>
                    <MainFooter />
                  </AuthGuard>
                </>
              )}
            </AuthRedirect>
          </body>
        </html>
      </AuthProvider>
    </>
  );
}
