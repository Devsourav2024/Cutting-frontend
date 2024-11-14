"use client";
import { useEffect, useState } from "react";

const Location = () => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Access the URL from the window object
    setCurrentUrl(window.location.href);
  }, []);

  function location_details() {
    return currentUrl;
  }

  return (
    <div>
      <p>Current URL: {currentUrl}</p>
    </div>
  );
};

export default Location;
