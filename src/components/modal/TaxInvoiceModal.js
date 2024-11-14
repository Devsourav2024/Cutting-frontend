import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const TaxInvoiceModal = (props) => {
  console.log("Data details==>", props.data.orderdetails[0]);
  const newDate = new Date(props?.data?.orderdetails[0]?.created_at);

  const options = { year: "numeric", month: "long", day: "numeric" };

  const formattedNewDate = newDate.toLocaleDateString("en-US", options);
  function formatNumber(num) {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return (
    <Modal
      show={props.show}
      centered
      dialogClassName="tax-modal"
      onHide={props.handleClose}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h3 className="modal-title-big text-center">Tax Invoice</h3>
        {/* Add your content here */}
        <div className="tax-content">
          <div className="tax-content-top">
            <div className="logo">
              <Link href="/">
                <Image
                  src="/assets/images/logo-black.png"
                  alt="The Cutting Center Logo"
                  width={186}
                  height={79}
                  priority={true}
                />
              </Link>
            </div>
            {/* Invoice Details */}
            <div className="invoce-sec sec-box">
              <p>
                Invoice#: <strong>INV-TC-{`100` + props.data.id}</strong>
              </p>
              <p>
                Invoice Date: <strong>{formattedNewDate}</strong>
              </p>
            </div>
          </div>
          <div className="tax-content-mid mb-4">
            <div className="row">
              <div className="col-md-6">
                <h5>Bill From</h5>
                <div className="sec-box">
                  <p>
                    Company Name: <strong>The Cutting Center</strong>
                  </p>
                  <p>
                    Email: <strong>thecuttingcenter@gmail.com</strong>
                  </p>

                  <p>
                    Address:{" "}
                    <strong>
                      597-673 Dubai Investments Park 2, Jebel Ali Dubai
                    </strong>
                  </p>
                  <p>
                    VAT No / TRN No: <strong>100011246400003</strong>
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <h5>Bill To</h5>
                <div className="sec-box">
                  {/* <p>
                    Name: <strong>Steve Smith</strong>
                  </p> */}
                  <p>
                    Name:{" "}
                    <strong>
                      {props?.data?.userDetails?.first_name +
                        " " +
                        props?.data?.userDetails?.last_name}
                    </strong>
                  </p>
                  <p>
                    Email: <strong>{props?.data?.userDetails?.email}</strong>
                  </p>
                  <p>
                    Address:{" "}
                    {/*  <strong>
                      {props.data?.userDetails?.billing_address_details
                        ?.billing_address != ", , , , , , N/A" &&
                        props.data?.userDetails?.billing_address_details
                          ?.billing_addres}
                    </strong> */}
                    <strong>
                      {props.data?.orderdetails[0]?.billing_address !=
                        ", , , , , , N/A" &&
                        props.data?.orderdetails[0]?.billing_address}
                    </strong>
                  </p>
                  {props?.data?.userDetails?.trn_no && (
                    <p>
                      TRN No:{" "}
                      <strong>{props?.data?.userDetails?.trn_no}</strong>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="tax-content-tables">
            {/* Table */}
            <div class="table-responsive">
              <Table>
                <thead className="bg-light">
                  <tr>
                    <th>Material Name</th>
                    <th>Thickness</th>
                    <th>Quantity</th>
                    <th>Unit Cost</th>
                    <th>Total Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{props.data.orderdetails[0]?.material_name}</td>
                    <td>{props.data.orderdetails[0]?.thickness}</td>
                    <td>{props.data.orderdetails[0]?.quantity}</td>
                    <td>
                      {formatNumber(
                        (
                          props.data.orderdetails[0]?.selling_price /
                          props.data.orderdetails[0]?.quantity
                        ).toFixed(2)
                      )}
                    </td>
                    <td>{formatNumber(props.data.orderdetails[0]?.amount)}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          {/* Summary */}
          <div className="summary-table">
            <div class="table-responsive">
              <Table>
                <thead className="bg-light">
                  <tr>
                    <th className="font-weight-bold">SUBTOTAL</th>
                    <th className="font-weight-bold">TAX</th>
                    <th className="font-weight-bold">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-right">
                      AED{" "}
                      {formatNumber(props.data.orderdetails[0]?.actual_price)}
                    </td>
                    <td className="text-right">
                      {formatNumber(props.data.orderdetails[0]?.vat_price)}
                    </td>
                    <td className="text-right">
                      AED {formatNumber(props.data.orderdetails[0]?.amount)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          {/* Footer */}
          <p className="text-center pt-4 mt-4 tax-ffoter">
            This is a system-generated document and hence does not require a
            signature.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TaxInvoiceModal;
