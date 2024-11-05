import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import classNames from "classnames";
import FeatherIcon from "feather-icons-react";
import jwtDecode from "jwt-decode";

// helpers
import { findAllParent, findMenuItem } from "../helpers/menu";

// constants
import { MenuItemTypes } from "../constants/menumedical";

interface SubMenus {
  item: MenuItemTypes;
  linkClassName?: string;
  subMenuClassNames?: string;
  activeMenuItems?: Array<string>;
  toggleMenu?: (item: MenuItemTypes, status: boolean) => void;
  className?: string;
}

interface AppMenuProps {
  menuItems: MenuItemTypes[];
}

const AppMenu: React.FC<AppMenuProps> = ({ menuItems }) => {
  const location = useLocation();
  const menuRef = useRef<HTMLUListElement>(null);
  const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);
  const [fixedMenuItems, setFixedMenuItems] = useState<Array<MenuItemTypes>>([]);

  const showDataSeveri = async () => {
    try {
      const tokenAdmin = localStorage.getItem("tokenadmin");
      if (tokenAdmin) {
        const decodedToken = jwtDecode<any>(tokenAdmin);
        const res = await fetch("http://127.0.0.1:8000/api/check-services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${tokenAdmin}`,
          },
          body: JSON.stringify({
            serviceName: decodedToken.specialized,
          }),
        });
  
        const data = await res.json();
        console.log(data.data); // In ra toàn bộ mảng để kiểm tra
  
        // Kiểm tra nếu `data.data` là một mảng và có ít nhất một phần tử
        if (Array.isArray(data.data) && data.data.length > 0) {
          data.data.forEach((service: any) => {
            // Kiểm tra nếu service chưa tồn tại trong fixedMenuItems
            setFixedMenuItems((prevItems) => {
              const exists = prevItems.some((item) => item.key === service.serviceCode);
              if (!exists) {
                return [
                  ...prevItems,
                  {
                    key: service.serviceCode,
                    label: service.serviceName,
                    icon: 'calendar',
                    url: "/nurse?typeform=" + service.serviceType,
                  },
                ];
              }
              return prevItems;
            });
          });
        } else {
          console.warn("data.data không phải là mảng hoặc là mảng rỗng.");
        }
      } else {
        console.warn("No tokenadmin found in localStorage");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      alert("Có lỗi xảy ra khi kết nối với server.");
    }
  };
  
  const toggleMenu = (menuItem: MenuItemTypes, show: boolean) => {
    if (show) {
      setActiveMenuItems([
        menuItem.key,
        ...findAllParent([...fixedMenuItems, ...menuItems], menuItem),
      ]);
    }
  };

  const activeMenu = useCallback(() => {
    const div = document.getElementById("main-side-menu");
    let matchingMenuItem: HTMLAnchorElement | null = null;

    if (div) {
      let items = div.getElementsByClassName(
        "side-nav-link-ref"
      ) as HTMLCollectionOf<HTMLAnchorElement>;
      for (let i = 0; i < items.length; ++i) {
        const trimmedURL = location.pathname.replace(
          process.env.PUBLIC_URL || "",
          ""
        );
        if (
          trimmedURL ===
          items[i].pathname.replace(process.env.PUBLIC_URL || "", "")
        ) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute("data-menu-key")!;
        const activeMt = findMenuItem([...fixedMenuItems, ...menuItems], mid);
        if (activeMt) {
          setActiveMenuItems([
            activeMt.key,
            ...findAllParent([...fixedMenuItems, ...menuItems], activeMt),
          ]);
        }
      } else {
        setActiveMenuItems([]); // reset if no match
      }
    }
  }, [location, menuItems, fixedMenuItems]);

  useEffect(() => {
    activeMenu();
    showDataSeveri();
    // Chỉ gọi `showDataSeveri` một lần khi component mount
  }, []);

  return (
    <ul className="menu" ref={menuRef} id="main-side-menu">
      {[...menuItems, ...fixedMenuItems].map((item, idx) => (
        <React.Fragment key={idx}>
          {"isTitle" in item && item.isTitle ? (
            <li className={classNames("menu-title", { "mt-2": idx !== 0 })}>
              {item.label}
            </li>
          ) : item.children ? (
            <MenuItemWithChildren
              item={item}
              toggleMenu={toggleMenu}
              subMenuClassNames="sub-menu"
              activeMenuItems={activeMenuItems}
              linkClassName="menu-link"
            />
          ) : (
            <MenuItem
              item={item}
              linkClassName="menu-link"
              className={activeMenuItems.includes(item.key) ? "menuitem-active" : ""}
            />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

const MenuItemWithChildren: React.FC<SubMenus> = ({
  item,
  linkClassName,
  subMenuClassNames,
  activeMenuItems,
  toggleMenu,
}) => {
  const [open, setOpen] = useState<boolean>(activeMenuItems?.includes(item.key) ?? false);

  useEffect(() => {
    setOpen(activeMenuItems?.includes(item.key) ?? false);
  }, [activeMenuItems, item]);

  const toggleMenuItem = () => {
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };

  return (
    <li className={classNames("menu-item", { "menuitem-active": open })}>
      <Link
        to="#"
        onClick={toggleMenuItem}
        data-menu-key={item.key}
        aria-expanded={open}
        className={classNames("menu-link", linkClassName, {
          "menuitem-active": activeMenuItems?.includes(item.key),
        })}
      >
        {item.icon && (
          <span className="menu-icon">
            <FeatherIcon icon={item.icon} />
          </span>
        )}
        <span className="menu-text"> {item.label} </span>
        {!item.badge ? (
          <span className="menu-arrow"></span>
        ) : (
          <span className={`badge bg-${item.badge.variant} rounded-pill ms-auto`}>
            {item.badge.text}
          </span>
        )}
      </Link>
      <Collapse in={open}>
        <div>
          <ul className={classNames(subMenuClassNames)}>
            {(item.children || []).map((child, i) => (
              <React.Fragment key={i}>
                {child.children ? (
                  <MenuItemWithChildren
                    item={child}
                    linkClassName={activeMenuItems?.includes(child.key) ? "active" : ""}
                    activeMenuItems={activeMenuItems}
                    subMenuClassNames="sub-menu"
                    toggleMenu={toggleMenu}
                  />
                ) : (
                  <MenuItem
                    item={child}
                    className={activeMenuItems?.includes(child.key) ? "menuitem-active" : ""}
                    linkClassName={activeMenuItems?.includes(child.key) ? "active" : ""}
                  />
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </Collapse>
    </li>
  );
};

const MenuItem: React.FC<SubMenus> = ({ item, className, linkClassName }) => (
  <li className={classNames("menu-item", className)}>
    <MenuItemLink item={item} className={linkClassName} />
  </li>
);

const MenuItemLink: React.FC<SubMenus> = ({ item, className }) => (
  <Link
    to={item.url!}
    target={item.target}
    className={classNames("side-nav-link-ref menu-link", className)}
    data-menu-key={item.key}
  >
    {item.icon && (
      <span className="menu-icon">
        <FeatherIcon icon={item.icon} />
      </span>
    )}
    <span className="menu-text"> {item.label} </span>
    {item.badge && (
      <span className={`badge bg-${item.badge.variant}`}>
        {item.badge.text}
      </span>
    )}
  </Link>
);

export default AppMenu;
