"use client";
import { useState, useEffect } from "react";

function FAQPage() {
  useEffect(() => {
    // Check if the URL has a hash
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        // Scroll smoothly to the element
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section className="privacy-sec sc-pt-50 sc-pb-50">
      <div className="container">
        <div className="row ">
          <div className="col-md-12 ">
            <h2>FAQ</h2>
            <div className="d-flex justify-content-center">
              <div className="capability-content col-11 ">
                <p>
                  <br />
                  <strong>1. What services do you offer?</strong>
                </p>
                <p>
                  We specialize in CNC and Laser cutting services, offering
                  precision cutting for materials such as wood, metal, acrylic,
                  and more.
                </p>
                <p>
                  <br />
                  <strong>2. How do I place an order?</strong>
                </p>
                <p>
                  To place an order, follow these steps:
                  <ul className="green-bullet-faq pt-3">
                    <li>Select your material type and thickness.</li>
                    <li>Choose your desired quantity.</li>
                    <li>Review the instant price quote and delivery time.</li>
                    <li>Submit your order and proceed to payment.</li>
                  </ul>
                </p>
                <p>
                  <br />
                  <strong>3. What file formats do you accept?</strong>
                </p>
                <p>
                  We accept the following file formats for CNC and laser
                  cutting:
                  <ul className="green-bullet-faq pt-3">
                    <li>DXF</li>
                    <li>DWG</li>
                  </ul>
                  Ensure that your designs are in vector format for accurate
                  cutting.
                </p>
                <p>
                  <br />
                  <strong>4. What materials can I choose from?</strong>
                </p>
                <p>
                  We offer a wide range of materials, including:
                  <ul className="green-bullet-faq pt-3">
                    <li>Wood (plywood, MDF, hardwood)</li>
                    <li>Metals (aluminum, steel, brass, copper)</li>
                    <li>Plastics (acrylic, PVC, polycarbonate)</li>
                    <li>Other specialty materials upon request</li>
                  </ul>
                </p>
                <p>
                  <br />
                  <strong>5. How accurate is the cutting?</strong>
                </p>
                <p>
                  Our CNC and laser cutting machines are highly precise.
                  Tolerances vary depending on the material but are generally
                  between &plusmn;0.1 mm to &plusmn;0.5 mm.
                </p>
                <p>
                  <br />
                  <strong>
                    6. What is the maximum size of the parts you can cut?
                  </strong>
                </p>
                <p>
                  The maximum cutting area depends on the machine and material
                  type. Typically, our CNC machines can handle sheets up to
                  1200mm x 2400mm, and laser cutting machines can accommodate up
                  to 1000mm x 2000mm.
                </p>
                <p>
                  <br />
                  <strong>7. What are the lead times for orders?</strong>
                </p>
                <p>
                  Lead times depend on the complexity of your project and the
                  materials selected. Standard orders typically take 3-5
                  business days.
                </p>
                <p>
                  <br />
                  <strong>8. How much does it cost?</strong>
                </p>
                <p>
                  The price depends on factors such as material type, thickness,
                  cutting time, and quantity. You will receive an instant quote
                  once you upload your design and choose your options.
                </p>
                <p>
                  <br />
                  <strong>
                    9. Can I request samples before placing a large order?
                  </strong>
                </p>
                <p>
                  Yes, you can request samples of your design before committing
                  to a large order. Contact our support team for more details on
                  the sample request process.
                </p>
                <p>
                  <br />
                  <strong>10. Do you offer design assistance?</strong>
                </p>
                <p>
                  Yes, we offer basic design assistance to ensure your files are
                  optimized for cutting.
                </p>
                <p>
                  <br />
                  <strong>11. What are the shipping options?</strong>
                </p>
                <p>
                  We offer both standard and expedited shipping options through
                  various carriers. Shipping costs and delivery times will be
                  calculated at checkout based on your location.
                </p>
                <p>
                  <br />
                  <strong>12. Do you ship internationally?</strong>
                </p>
                <p>
                  Currently not possible. Please book a meeting through the
                  application.
                </p>
                <p>
                  <br />
                  <strong>
                    13. Can I cancel or modify my order after placing it?
                  </strong>
                </p>
                <p>
                  Cancellations and modifications can only be made before the
                  production process begins. Contact our customer service team
                  as soon as possible if you need to make changes.
                </p>
                <p id="return-policy">
                  <br />
                  <strong>14. What is your return policy?</strong>
                </p>
                <p>
                  Since most of our products are custom-made, returns are
                  generally not accepted. However, if there is an issue with the
                  quality or accuracy of the product, please contact us, and we
                  will work to resolve the issue.
                </p>
                <p>Once the cutting starts, no refunds will be issued.</p>
                <p>
                  <br />
                  <strong>15. How can I contact customer support?</strong>
                </p>
                <p>
                  You can reach our customer support team via email at
                  support@thecuttingcenter.com or through our live chat feature
                  available on the website during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQPage;
