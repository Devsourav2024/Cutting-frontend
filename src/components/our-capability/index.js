"use client";
import React from "react";
import { useParams } from "next/navigation";
import parse from "html-react-parser";
function OurCapabilities() {
  const { id } = useParams();
  const laser = `<p dir="ltr"><strong>Laser cutting</strong></p>
<p dir="ltr">
    CNC machines are computer-controlled machines used in manufacturing to achieve efficiency, accuracy and consistency. CNC is a process in which pre-programmed computer software dictates the movement of factory machinery and tools. As a
    result, manufacturers can produce parts in less time, reduce waste and eliminate the risk of human error.&nbsp; We use a CNC Laser cutter and CNC Router in the Blue Rhine Industry.
</p>
<p dir="ltr">
    The acrylic laser cutting machine is a high-performance machine that allows for clean, smooth cuts on acrylic materials, making it ideal for various industrial and creative applications. Our model is recognized for its robust
    construction, ensuring durability and consistent operation over extended periods. It has a powerful laser delivers precise results, even on intricate designs. Additionally, the machine features user-friendly controls, allowing for easy
    setup and operation, and it is compatible with a wide range of software, enhancing its versatility for different cutting tasks. Our machine stands out in the market for its cutting-edge technology, reliability, and ease of use, making
    it a preferred choice for signage.
</p>
<p dir="ltr">
    The Fiber Laser machine is a highly efficient Fiber laser cutting machine designed for precision cutting metal materials, such as stainless steel, aluminium, brass, and other metals. Unlike CO2 lasers, often used for non-metal
    materials, the Fiber laser machine utilizes advanced Fiber optic technology to generate a high-powered laser beam. This beam is transmitted through a Fiber optic cable, allowing for excellent and accurate cutting with minimal power
    loss. Fiber lasers are known for their high energy efficiency and are particularly well-suited for cutting metals due to their wavelength, which is better absorbed by metal surfaces. The CNC (computer numerical control) system ensures
    that the laser head follows the exact path programmed in the CAD software, enabling accurate cuts and detailed designs. The machine can handle various thicknesses and metal types, adjusting the power and speed settings to achieve
    optimal results.
</p>
<p dir="ltr"><strong>How Does it Work?</strong></p>
<p dir="ltr">
    CNC laser cutting is a non-contact, thermal-based process. A CNC laser cutter features a laser head containing a focusing lens and a nozzle. Through the nozzle, this head and lens assembly focuses a laser beam &mdash; a column of very
    high-intensity light ㅡ on the workpiece, melting and cutting the workpiece to form the desired shape. CNC lasers employ compressed gas (also flowing through the nozzle that ejects the laser beam) to cool the focusing lens and expel the
    vaporized metal out of the workpiece.
</p>
<p><strong>&nbsp;</strong></p>
<p dir="ltr"><strong>What are the Types of CNC Laser Cutting Machines used in Blue Rhine Industry?</strong></p>
<ol>
    <li dir="ltr" style="font-weight: bold;" aria-level="1">
        <p dir="ltr" role="presentation"><strong>Acrylic Laser&nbsp;</strong></p>
    </li>
    <li dir="ltr" style="font-weight: bold;" aria-level="1">
        <p dir="ltr" role="presentation"><strong>Fiber Laser</strong></p>
    </li>
</ol>
<p><strong>&nbsp;</strong></p>
<p dir="ltr">#1 Acrylic Laser</p>
<p dir="ltr">
    The acrylic laser cutter operates by directing a focused beam of high-intensity light (the laser) onto the surface of the acrylic material. This laser is generated from a CO2 laser tube, commonly used for cutting non-metal materials
    like acrylic. When the laser beam meets the acrylic surface, the heat generated is so intense that it vaporizes or melts the material, allowing for precise cuts and engravings.&nbsp;
</p>
<p dir="ltr">
    The machine works with computer-aided design (CAD) software, where the user uploads or designs the pattern to be cut. Once the design is finalized, the software communicates with the CNC system, guiding the laser beam along the
    designated path with extreme precision. The machine&rsquo;s CNC (computer numerical control) system moves the laser head in the X and Y directions. In contrast, the Z-axis controls the laser&rsquo;s focus on the acrylic&rsquo;s surface
    for optimal cutting depth.
</p>
<p dir="ltr">
    As the laser cuts, it follows the programmed path, either cutting through the material entirely or engraving the surface based on the settings chosen by the operator. The intensity of the laser, the speed of the movement, and the focus
    are all adjustable to suit different thicknesses of acrylic and the desired quality of the cut. The machine is highly efficient and capable of handling both simple and complex designs, making it suitable for various industries, from
    signage to model-making.
</p>
<p>
    <strong>
        <br />
        <br />
    </strong>
</p>
<p dir="ltr">#2 CNC Fiber Laser Cutter</p>
<p dir="ltr">
    Fiber laser cutters are a more recent laser technology that uses a bank of diodes to create the beam, which is focused through a fiber-optic cable. Fiber laser cutters allow you to achieve a faster and cleaner cutting process than CO2
    laser cutters, especially in materials with a thickness of less than 5 mm.
</p>
<p dir="ltr">
    Although fiber lasers are compatible with a broad range of materials, you must pay special attention to silver. Silver retains heat from the laser and starts to warp during cutting operations, making it challenging to achieve the
    desired machined part. As a result, top-tier machine shops typically use a bracket as a heat sink to transfer heat away from the silver workpiece during fibre laser cutting operations.
</p>
<p><strong>&nbsp;</strong></p>
<p dir="ltr">
    The fiber laser produces a concentrated beam with minimal energy loss, making it more efficient and faster than traditional laser systems. This allows the Fiber CNC Laser to cut through even thick metals with minimal distortion or
    burrs, resulting in smooth edges and intricate details. The machine also has a cooling system to regulate the temperature during operation, preventing overheating and ensuring consistent performance. An integrated exhaust or fume
    extraction system removes any byproducts of the cutting process, such as fumes or debris, keeping the workspace clean. The high efficiency and low maintenance of fibre lasers, combined with their ability to cut metal at high speeds and
    with great accuracy, make the Fiber CNC Laser machine an excellent choice for industries that need precise metal-cutting solutions.
</p>
`;
  return (
    <section className="privacy-sec sc-pt-50 sc-pb-50">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Our Capabilities</h2>
            {id == "laser-cutting" ? (
              <div className="d-flex justify-content-center">
                <div className="col-11 capability-content ">{parse(laser)}</div>
              </div>
            ) : (
              <p>Technology will be coming soon!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurCapabilities;
