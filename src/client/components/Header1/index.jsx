import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";

export default function Header1({ logoSrc, variant }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={`cs_site_header cs_style1 cs_sticky_header ${
          mobileToggle ? "cs_mobile_toggle_active" : ""
        } ${variant} ${isSticky ? "cs_active_sticky" : ""}`}
      >
        <div className="cs_main_header">
          <div className="container">
            <div className="cs_main_header_in">
              <div className="cs_main_header_left">
                <Link className="cs_site_branding" to="/">
                  <img src={logoSrc} alt="Logo" />
                </Link>
                <nav className="cs_nav">
                  <ul
                    className={`${
                      mobileToggle ? "cs_nav_list cs_active" : "cs_nav_list"
                    }`}
                  >
                    <li>
                      <Link to="/patient">Trang Chủ</Link>
                    </li>
                    <li>
                      <Link to="/about">Về Chúng Tôi</Link>
                    </li>
                    <li>
                      <Link to="/doctors">Bác Sĩ</Link>
                    </li>
                    <li>
                      <Link to="/blog">Bài Viết</Link>
                    </li>
                    <li>
                      <Link to="/contact">Liên Hệ</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="cs_main_header_right">
                <div className="cs_toolbox">
                  <Link to="/medical">
                    {" "}
                    <button className="btn btn-primary" type="button">
                      {" "}
                      Đăng Xuất{" "}
                    </button>{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
