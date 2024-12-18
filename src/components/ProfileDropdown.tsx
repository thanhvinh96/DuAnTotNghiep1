import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";

interface ProfileMenuItem {
  label: string;
  icon: string;
  redirectTo: string;
}

interface ProfileDropdownProps {
  menuItems: Array<ProfileMenuItem>;
  profilePic?: string;
  username: string;
  userTitle?: string;
}

const ProfileDropdown = (props: ProfileDropdownProps) => {
  const { profilePic, menuItems, username } = props;
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  /*
   * toggle profile-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  /*
   * handle menu item click
   */
  const handleMenuClick = (redirectTo: string) => {
    if (redirectTo === "/auth/logout") {
      // Xóa token khỏi local storage
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('tokenadmin');

      // Chuyển hướng đến trang đăng xuất
      navigate(redirectTo);
    } else {
      // Chuyển hướng đến trang khác
      navigate(redirectTo);
    }
    // Đóng dropdown sau khi chọn
    toggleDropdown();
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-profile"
        as="a"
        onClick={toggleDropdown}
        className={classNames(
          "nav-link nav-user me-0 waves-effect waves-light",
          { show: dropdownOpen }
        )}
      >
        <img src={profilePic || ""} className="rounded-circle" alt="" />
        <span className="pro-user-name ms-1">
          {username} <i className="mdi mdi-chevron-down"></i>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end profile-dropdown">
        <div onClick={toggleDropdown}>
          <div className="dropdown-header noti-title">
            <h6 className="text-overflow m-0">Welcome !</h6>
          </div>
          {(menuItems || []).map((item, i) => (
            <React.Fragment key={i}>
              {i === menuItems.length - 1 && (
                <div className="dropdown-divider"></div>
              )}
              <a
                href="#!"
                className="dropdown-item notify-item"
                onClick={() => handleMenuClick(item.redirectTo)}
              >
                <i className={`${item.icon} me-1`}></i>
                <span>{item.label}</span>
              </a>
            </React.Fragment>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
