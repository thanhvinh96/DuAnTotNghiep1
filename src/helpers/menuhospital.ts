import {
  MENU_ITEMS,
  HORIZONTAL_MENU_ITEMS,
  TWO_COl_MENU_ITEMS,
  MenuItemTypes,
} from "../constants/menuhospital";
import jwt_decode from 'jwt-decode';

// Giả sử bạn đã lưu token trong localStorage
const getRoleFromToken = () => {
  const token = localStorage.getItem('tokenadmin');
  if (token) {
    const decoded:any = jwt_decode(token);
    console.log(decoded)

    return decoded.typeusers; // Giả sử `role` có trong payload
  }
  return null;
};

// Hàm lọc menu items theo role
const filterMenuItemsByRole = (menuItems: MenuItemTypes[], role: string | null) => {
  return menuItems.filter(item => {
    if (item.allowedRoles) {
      // Kiểm tra nếu role không phải là null
      return role ? item.allowedRoles.includes(role) : false;
    }
    return true; // Nếu không có điều kiện về role, cho phép hiển thị
  });
};


const getMenuItems = () => {
  const role = getRoleFromToken();
  return filterMenuItemsByRole(MENU_ITEMS, role);
};

const getHorizontalMenuItems = () => {
  const role = getRoleFromToken();
  return filterMenuItemsByRole(HORIZONTAL_MENU_ITEMS, role);
};

const getTwoColumnMenuItems = () => {
  const role = getRoleFromToken();
  return filterMenuItemsByRole(TWO_COl_MENU_ITEMS, role);
};

const findAllParent = (
  menuItems: MenuItemTypes[],
  menuItem: MenuItemTypes
): string[] => {
  let parents: string[] = [];
  const parent = findMenuItem(menuItems, menuItem["parentKey"]);

  if (parent) {
    parents.push(parent["key"]);
    if (parent["parentKey"])
      parents = [...parents, ...findAllParent(menuItems, parent)];
  }

  return parents;
};

const findMenuItem = (
  menuItems: MenuItemTypes[] | undefined,
  menuItemKey: MenuItemTypes["key"] | undefined
): MenuItemTypes | null => {
  if (menuItems && menuItemKey) {
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i];
      }
      var found = findMenuItem(menuItems[i].children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};

export {
  getMenuItems,
  getHorizontalMenuItems,
  getTwoColumnMenuItems,
  findAllParent,
  findMenuItem,
};
