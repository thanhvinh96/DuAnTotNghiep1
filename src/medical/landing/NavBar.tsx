import React, { useEffect ,useState} from "react";
import { Nav, Navbar, Container,Modal
  , Button 
} from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// store
// import { RootState } from "../../redux/store";

import logo from "../../assets/images/logo-light.png";
import logo1 from "../../assets/images/logo-dark.png";

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);

  // Handle opening and closing modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // on scroll add navbar class
  useEffect(() => {
    if (document.body) document.body.classList.add("pb-0");

    window.addEventListener("scroll", (e) => {
      e.preventDefault();
      const navbar = document.getElementById("sticky");
      if (navbar) {
        if (
          document.body.scrollTop >= 50 ||
          document.documentElement.scrollTop >= 50
        ) {
          navbar.classList.add("nav-sticky");
        } else {
          navbar.classList.remove("nav-sticky");
        }
      }
    });

    return () => {
      if (document.body) document.body.classList.remove("pb-0");
    };
  }, []);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand={false}
        className="navbar navbar-expand-lg fixed-top navbar-custom sticky-dark"
        id="sticky"
        style={{ boxShadow: "unset" }}
      >
        <Container className="container-fluid">
          <Link to="/" className="logo text-uppercase">
            <img src={logo} alt="logo-light" className="logo-light" height="21" />
            <img src={logo1} alt="logo-dark" className="logo-dark" height="21" />
          </Link>

          <Navbar.Toggle
            className="navbar-toggler"
            aria-controls="responsive-navbar-nav"
          >
            <i className="mdi mdi-menu"></i>
          </Navbar.Toggle>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav as="ul" className="mx-auto navbar-center">
              {/* Navigation Links */}
              <Nav.Item as="li" className="nav-item">
                <Nav.Link className="nav-link" href="#home">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link className="nav-link" href="#features">
                  Features
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link className="nav-link" href="#demo">
                  Demos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link className="nav-link" href="#pricing">
                  Pricing
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link className="nav-link" href="#faq">
                  FAQs
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link className="nav-link" href="#clients">
                  Clients
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link className="nav-link" href="#contact">
                  Contact
                </Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Button to open modal */}
            <button className="btn btn-info navbar-btn" onClick={handleShowModal}>
            Login account            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select account type to log in:</p>
          <div className="d-flex justify-content-around">
            <Button
              variant="primary"
              onClick={() => {
                handleCloseModal();
                window.location.href = "/medical/auth/login2"; // Redirect to patient login
              }}
            >
Log in to medical records
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                handleCloseModal();
                window.location.href = "/hospital/organization-loginorg"; // Redirect to doctor login
              }}
            >
Sign in with organization
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default NavBar;
