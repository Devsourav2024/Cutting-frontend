import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <>
      <div className="fullWidthLoader assigntask" centered>
        <div className="spinner-border" role="status"></div>
      </div>
    </>
  );
};

export default Loader;
