import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
const ImpDisclaimerModal = ({ show, handleClose }) => {
  const { auth } = useAuth();
  const route = usePathname();
  const handleNavigateOnLogin = () => {
    if (!auth) {
      localStorage.setItem("navigateUrl", "/rigid-substrates");
    }
    if(route != "/rigid-substrates"){
      localStorage.setItem("modalStatus", false);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="custom-modal-class"
      >
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body>
          <h4 className="mdoal-title text-center">Important Disclaimer</h4>
          <div className="modal-container-text">
            <ul className="green-bullet">
              <li>
                We only accept Dxf and dwg files.{" "}
                <Image
                  src="/assets/images/dwg-icon.svg"
                  alt="DWG"
                  width={28}
                  height={28}
                  priority={true}
                  style={{ marginRight: "7px" }}
                />
                <Image
                  src="/assets/images/dxf-icon.svg"
                  alt="DXF"
                  width={31}
                  height={31}
                  priority={true}
                />
              </li>
              {/* <li>
                The estimate shall not be accurate for any other versions.
              </li> */}
              <li>
                Please validate the Linear Meter shown (Please insert a symbol
                for validation) 
                after file upload to ensure accuracy before you
                move on to 'Get A Quote'.
              </li>
              <li>
                Print size in a single cut file should be within a limit of
                2440mm x 1220mm. (Please insert a symbol of sheet – showing the
                dimensions) (If you have any higher sizes, we recommend you
                split them into multiple cut-files and upload them through
                multiple enquiries/estimate)
              </li>
            </ul>
          </div>
          <div className="btn-holder flex-center">
            <Link
              onClick={() => {handleClose(); handleNavigateOnLogin()}}
              href="/rigid-substrates"
              className="btn btn-green"
            >
              <span>Continue</span>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImpDisclaimerModal;
