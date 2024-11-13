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
  allowedRoles?: string[]; // Thay đổi ở đây để nhận một mảng các vai trò
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
  { key: "MAIN", label: "CHÍNH", isTitle: true, allowedRoles: ["superadmin"] },
  {
    key: "/hospital/home",
    label: "Trang chủ",
    isTitle: false,
    icon: "calendar",
    url: "/hospital/home",
    allowedRoles: ["superadmin"], // Chỉ cho phép superadmin
  },
  {
    key: "HOSPITAL",
    label: "BỆNH VIỆN",
    isTitle: true,
    allowedRoles: ["superadmin"],
  },
  {
    key: "/hospital/profile-hospital",
    label: "Thông tin tổ chức",
    isTitle: false,
    icon: "calendar",
    url: "/hospital/profile-hospital",
    allowedRoles: ["superadmin"], // Chỉ cho phép superadmin
  },
  {
    key: "Hospital branch",
    label: "Chi nhánh bệnh viện",
    isTitle: false,
    icon: "calendar",
    url: "/hospital/hospital-branch",
    allowedRoles: ["superadmin"], // Chỉ cho phép superadmin
  },
  {
    key: "personnel management",
    label: "Quản lý nhân sự",
    isTitle: false,
    icon: "user",
    url: "/hospital/personnel-management",
    allowedRoles: ["superadmin"], // Chỉ cho phép superadmin
  },
  {
    key: "patient management",
    label: "Quản lý bệnh nhân",
    isTitle: false,
    icon: "user",
    url: "/hospital/patient-management",
    allowedRoles: ["superadmin"], // Chỉ cho phép superadmin
  },
  {
    key: "dashboard-1",
    label: "Quản lý quyền truy cập",
    isTitle: false,
    icon: "book",
    url: "/request-medical-nurse",
    allowedRoles: ["superadmin"], // Chỉ cho phép superadmin
  },
  {
    key: "DOCTER",
    label: "TRANG CHỦ",
    isTitle: true,
    allowedRoles: ["doctors"],
  },
  // {
  //   key: "examine patient",
  //   label: "Trang chủ",
  //   isTitle: false,
  //   icon: "home",
  //   url: "/examine-patient",
  //   allowedRoles: ['superadmin'], // Chỉ cho phép superadmin
  // },
  {
    key: "DOCTOR",
    label: "BÁC SĨ",
    isTitle: true,
    allowedRoles: ["doctor", "nurse"],
  },
  {
    key: "home",
    label: "Trang chủ",
    isTitle: false,
    icon: "user",
    url: "/doctor/home",
    allowedRoles: ["doctor", "nurse"], // Chỉ cho phép doctors và nurses
  },
  {
    key: "profile",
    label: "Thông tin cá nhân",
    isTitle: false,
    icon: "user",
    url: "/doctor/profile",
    allowedRoles: ["doctor", "nurse"], // Chỉ cho phép doctors và nurses
  },
  {
    key: "history-medical",
    label: "Lịch sử khám",
    isTitle: false,
    icon: "user",
    url: "/doctor/history",
    allowedRoles: ["doctor", "nurse"], // Chỉ cho phép doctors và nurses
  },
  {
    key: "appointment-history",
    label: "Lịch sử hẹn bệnh nhân",
    isTitle: false,
    icon: "user",
    url: "/doctor/appointments",
    allowedRoles: ["doctor"], // Chỉ cho phép doctors và nurses
  },
  {
    key: "Request Access Medical",
    label: "Yêu cầu truy cập hồ sơ",
    isTitle: false,
    icon: "calendar",
    url: "/request-medical-nurse",
    allowedRoles: ["doctors", "nurse"], // Chỉ cho phép doctors
  },

  { key: "BRACH", label: "CHI NHÁNH", isTitle: true, allowedRoles: ["admin"] },
  {
    key: "home",
    label: "Trang chủ",
    isTitle: false,
    icon: "calendar",
    url: "/hospital/branch/home",
    allowedRoles: ["admin"], // Chỉ cho phép superadmin
  },
  {
    key: "Thông tin tài khoản",
    label: "Thông tin tài khoản",
    isTitle: false,
    icon: "calendar",
    url: "/hospital/branch/profile",
    allowedRoles: ["admin"], // Chỉ cho phép superadmin
  },
  {
    key: "personnel-management",
    label: "Quản lý nhân sự",
    isTitle: false,
    icon: "calendar",
    url: "/hospital/brach/personnel-management",
    allowedRoles: ["admin"], // Chỉ cho phép superadmin
  },
  {
    key: "Manage medical records",
    label: "Quản lý hồ sơ y tế",
    isTitle: false,
    icon: "calendar",
    url: "/hospital/brach/manage-medical-records",
    allowedRoles: ["admin"], // Chỉ cho phép superadmin
  },
  {
    key: "Right to medical",
    label: "Quyền truy cập y tế",
    isTitle: false,
    icon: "calendar",
    url: "/hospital/brach/right-to-medical",
    allowedRoles: ["admin"], // Chỉ cho phép superadmin
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
        url: "/dashboard-1",
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
