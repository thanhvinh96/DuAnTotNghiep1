import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import LogoDark from "../../assets/images/Logo.png";
import LogoLight from "../../assets/images/logo-light.png";

interface AccountLayoutProps {
  helpText?: string;
  bottomLinks?: any;
  isCombineForm?: boolean;
  children?: any;
}

const AuthLayout = ({
  helpText,
  bottomLinks,
  children,
  isCombineForm,
}: AccountLayoutProps) => {
  useEffect(() => {
    if (document.body)
      document.body.classList.add(
        "authentication-bg",
        "authentication-bg-pattern"
      );

    return () => {
      if (document.body)
        document.body.classList.remove(
          "authentication-bg",
          "authentication-bg-pattern"
        );
    };
  }, []);

  return (
    <>
      <div className="account-pages mt-5 mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={isCombineForm ? 9 : 4}>
              <Card className="bg-pattern">
                <Card.Body className="p-4">
                  <div className="text-center w-75 m-auto">
                    <div className="auth-brand">
                      <Link to="/" className="logo logo-dark text-center">
                        <span className="logo-lg">
                          <img src={LogoDark} alt="" style={{height:"120px"}} />
                        </span>
                      </Link>
                    </div>
                    <p className="text-muted mb-4 mt-3">{helpText}</p>
                  </div>
                  {children}
                  {bottomLinks}

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <footer className="footer footer-alt">
        {new Date().getFullYear()} &copy; ELECTRONIC HEALTH RECORD{" "}  
      </footer>
    </>
  );
};

export default AuthLayout;
