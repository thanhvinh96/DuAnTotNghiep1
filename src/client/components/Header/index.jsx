import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import SocialWidget from "../Widget/SocialWidget";
import Newsletter from "../Widget/Newsletter";
import IconBoxStyle11 from "../IconBox/IconBoxStyle11";
import Spacing from "../Spacing";

export default function Header({ logoSrc, variant }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
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
                  <img src={logoSrc} x alt="Logo" />
                </Link>
                <nav className="cs_nav">
                  <ul
                    className={`${
                      mobileToggle ? "cs_nav_list cs_active" : "cs_nav_list"
                    }`}
                  >
                    <li>
                      <Link to="/medicalGD">Trang Chủ</Link>
                    </li>
                    <li>
                      <Link to="/medicalGD/about">Chuyên Khoa</Link>
                    </li>
                    <li>
                      <Link to="/medicalGD/doctors">Bác Sĩ</Link>
                    </li>
                    <li>
                      <Link to="/medicalGD/blog">Bài Viết</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link to="/">Trang</Link>
                      <DropDown>
                        <ul>
                          <li>
                            <Link to="/medicalGD/appointments">
                              Appointments
                            </Link>
                          </li>
                          <li>
                            <Link to="/medicalGD/departments">Departments</Link>
                          </li>
                          <li>
                            <Link to="/medicalGD/departments/department-details">
                              Department Details
                            </Link>
                          </li>
                          <li>
                            <Link to="/medicalGD/doctors">Doctors</Link>
                          </li>
                          <li>
                            <Link to="/medicalGD/doctors/doctor-details">
                              Doctor Details
                            </Link>
                          </li>
                          <li>
                            <Link to="/medicalGD/pricing-plan">
                              Pricing Plan
                            </Link>
                          </li>
                          <li>
                            <Link to="/medicalGD/gallery">Gallery</Link>
                          </li>
                          <li>
                            <Link to="/medicalGD/timetable">Timetable</Link>
                          </li>
                        </ul>
                      </DropDown>
                    </li>
                    <li>
                      <Link to="/medicalGD/contact">Liên Hệ</Link>
                    </li>
                  </ul>
                  <span
                    className={
                      mobileToggle
                        ? "cs_menu_toggle cs_teggle_active"
                        : "cs_menu_toggle"
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <span></span>
                  </span>
                </nav>
              </div>
              <div className="cs_main_header_right">
                <div className="cs_toolbox">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => setSideNav(!sideNav)}
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`cs_sidenav ${sideNav ? "active" : ""}`}>
        <div
          className="cs_sidenav_overlay"
          onClick={() => setSideNav(!sideNav)}
        />
        <div className="cs_sidenav_in">
          <button
            className="cs_close"
            type="button"
            onClick={() => setSideNav(!sideNav)}
          >
            <img src="/images/icons/close.svg" alt="Close" />
          </button>
          <div className="cs_logo_box">
            <img src="/images/logo.svg" alt="Logo" />
            <div className="cs_height_15" />
          </div>
          <Spacing md="35" lg="35" xl="35" />
          <hr />
          <Spacing md="35" lg="50" xl="35" />
          <div className="cs_iconbox cs_style_11 cs_radius_25">
            <div className="cs_iconbox_right">
              <Link to="/LoginP">
                <button
                  onClick={() => setSideNav(!sideNav)}
                  className="cs_iconbox_title cs_fs_24 mb-0"
                >
                  Khách hàng
                </button>
              </Link>
            </div>
          </div>
          <Spacing md="30" lg="30" xl="30" />
          <div className="cs_iconbox cs_style_11 cs_radius_25">
            <div className="cs_iconbox_right">
              <Link to="/LoginH">
                <button
                  onClick={() => setSideNav(!sideNav)}
                  className="cs_iconbox_title cs_fs_24 mb-0"
                >
                  Bệnh viện
                </button>
              </Link>
            </div>
          </div>
          <Spacing md="30" lg="30" xl="30" />
          <Spacing md="70" lg="50" xl="50" />
          <SocialWidget />
        </div>
      </div>
    </>
  );
}
