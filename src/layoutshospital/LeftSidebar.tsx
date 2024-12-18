import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

import { getMenuItems } from "../helpers/menuhospital";

// store
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// constants
import { LayoutTypes } from "../constants/layouthospital";

// components
import AppMenu from "./Menu";
import profileImg from "../assets/images/users/user-1.jpg";
import logoSm from "../assets/images/LogoWhite.png";
import logoDark from "../assets/images/LogoWhite.png";
import logoDark2 from "../assets/images/LogoWhite.png";
import logoLight from "../assets/images/LogoWhite.png";
import logoLight2 from "../assets/images/LogoWhite.png";

/* user box */
const UserBox = () => {
  const ProfileMenus = [
    {
      label: "My Account",
      icon: "fe-user",
      redirectTo: "#",
    },
    {
      label: "Settings",
      icon: "fe-settings",
      redirectTo: "#",
    },
    {
      label: "Lock Screen",
      icon: "fe-lock",
      redirectTo: "/auth/lock-screen",
    },
    {
      label: "Logout",
      icon: "fe-log-out",
      redirectTo: "/auth/logout",
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="user-box text-center">
      <img
        src={profileImg}
        alt=""
        title="Mat Helme"
        className="rounded-circle avatar-md"
      />
      <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
        <Dropdown.Toggle
          id="dropdown-notification"
          as="a"
          onClick={toggleDropdown}
          className="cursor-pointer text-dark h5 mt-2 mb-1 d-block"
        >
          Geneva Kennedy
        </Dropdown.Toggle>
        <Dropdown.Menu className="user-pro-dropdown">
          <div onClick={toggleDropdown}>
            {(ProfileMenus || []).map((item, index) => {
              return (
                <Link
                  to={item.redirectTo}
                  className="dropdown-item notify-item"
                  key={index + "-profile-menu"}
                >
                  <i className={`${item.icon} me-1`}></i>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </Dropdown.Menu>
      </Dropdown>
      <p className="text-muted">Admin Head</p>
    </div>
  );
};

/* sidebar content */
const SideBarContent = () => {
  return (
    <>
      <UserBox />

      <AppMenu menuItems={getMenuItems()} />

      <div className="clearfix" />
    </>
  );
};

interface LeftSidebarProps {
  isCondensed: boolean;
  hideLogo?: boolean;
}

const LeftSidebar = ({ isCondensed, hideLogo }: LeftSidebarProps) => {
  const menuNodeRef: any = useRef(null);

  const { layoutType } = useSelector((state: RootState) => ({
    layoutType: state.Layout.layoutType,
    leftSideBarType: state.Layout.leftSideBarType,
  }));

  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái để hiển thị lớp mờ

  useEffect(() => {
    // Hiệu ứng lớp mờ sẽ tự động biến mất sau 1.5 giây
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleOtherClick = (e: any) => {
    if (
      menuNodeRef &&
      menuNodeRef.current &&
      menuNodeRef.current.contains(e.target)
    )
      return;

    if (document.body) {
      document.body.classList.remove("sidebar-enable");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOtherClick, false);

    return () => {
      document.removeEventListener("mousedown", handleOtherClick, false);
    };
  }, []);

  return (
    <>
      {/* Lớp mờ hiển thị khi tải */}
      {isLoading && <div className="overlay"></div>}

      <div
        className={`app-menu ${isLoading ? "blur" : ""}`}
        ref={menuNodeRef}
        style={{
          background: "#38ADC1",
          // width: "350px",
          // fontSize: "90px",
        }}
      >
        {!hideLogo && (
          <div className="logo-box">
            <Link to="/" className="logo logo-dark text-center">
              <span className="logo-sm">
                <img src={logoSm} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img
                  src={
                    layoutType === LayoutTypes.LAYOUT_TWO_COLUMN
                      ? logoDark2
                      : logoDark
                  }
                  alt=""
                  height="20"
                />
              </span>
            </Link>
            <Link to="/" className="logo logo-light text-center">
              <span className="logo-sm">
                <img src={logoSm} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img
                  src={
                    layoutType === LayoutTypes.LAYOUT_TWO_COLUMN
                      ? logoLight2
                      : logoLight
                  }
                  alt=""
                  height="20"
                />
              </span>
            </Link>
          </div>
        )}
        {!isCondensed && (
          <SimpleBar className="scrollbar show h-100" scrollbarMaxSize={320}>
            <SideBarContent />
          </SimpleBar>
        )}
        {isCondensed && <SideBarContent />}
      </div>
    </>
  );
};

LeftSidebar.defaultProps = {
  isCondensed: false,
};

export default LeftSidebar;
