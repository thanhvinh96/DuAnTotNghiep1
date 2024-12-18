export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  url?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
  { key: "CHÍNH", label: "CHÍNH", isTitle: true },
  {
    key: "y_te",
    label: "Trang chủ",
    isTitle: false,
    icon: "home",
    url: "/medical",
  },
  {
    key: "Ho_so_y_te",
    label: "Thông Tin Cá Nhân",
    isTitle: false,
    icon: "user",
    url: "/medical/profile-medical",
  },
  {
    key: "lich_su_kham",
    label: "Lịch sử khám bệnh",
    isTitle: false,
    icon: "clipboard",
    url: "/medical/medical-history",
  },
  {
    key: "Quan_ly_duyet",
    label: "Quản lý phê duyệt",
    isTitle: false,
    icon: "lock",
    url: "/medical/medical-managent-approve",
  },
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
  {
    key: "dashboard",
    icon: "home",
    label: "Dashboard",
    isTitle: true,
    children: [
      {
        key: "ds-dashboard-1",
        label: "Dashboard 1",
        url: "/medical/dashboard-1",
        parentKey: "dashboard",
      },
    ],
  },
];

const TWO_COl_MENU_ITEMS: MenuItemTypes[] = [
  {
    key: "dashboard",
    icon: "home",
    label: "Dashboard",
    isTitle: true,
    children: [
      {
        key: "ds-dashboard-1",
        label: "Dashboard 1",
        url: "/dashboard-1",
        parentKey: "dashboard",
      },
      {
        key: "ds-dashboard-2",
        label: "Dashboard 2",
        url: "/dashboard-2",
        parentKey: "dashboard",
      },
      {
        key: "ds-dashboard-3",
        label: "Dashboard 3",
        url: "/dashboard-3",
        parentKey: "dashboard",
      },
      {
        key: "ds-dashboard-4",
        label: "Dashboard 4",
        url: "/dashboard-4",
        parentKey: "dashboard",
      },
    ],
  },

  {
    isTitle: true,
    key: "widgets",
    label: "Other page",
    icon: "gift",
    url: "/ui/widgets",
    children: [
      {
        key: "widgets1",
        label: "Widgets",
        url: "/ui/widgets",
        parentKey: "widgets",
      },
    ],
  },
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
