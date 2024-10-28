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
  { key: "MAIN", label: "MAIN", isTitle: true  ,   allowedRoles: ['superadmin'],},
  {
    key: "/hospital/home",
    label: "Home",
    isTitle: false,
    icon: "calendar",
    url: "/hospital/home",
    allowedRoles: ['superadmin'], // Chỉ cho phép superadmin

  },
  { key: "HOSPITAL", label: "HOSPITAL", isTitle: true  ,   allowedRoles: ['superadmin'],},
  {
    key: "/hospital/profile-hospital",
    label: "Organizational information",
    isTitle: false,
    icon: "calendar",
    url: "/hospital/profile-hospital",
    allowedRoles: ['superadmin'], // Chỉ cho phép superadmin

  },
  {
    key: "Hospital branch",
    label: "Hospital branch",
    isTitle: false,
    icon: "calendar",
    url: "/hospital/hospital-branch",
    allowedRoles: ['superadmin'], // Chỉ cho phép superadmin

  },
  {
    key: "personnel management",
    label: "Personnel management",
    isTitle: false,
    icon: "user",
    url: "/hospital/personnel-management",
    allowedRoles: ['superadmin'], // Chỉ cho phép superadmin

  },
  {
    key: "patient management",
    label: "patient management",
    isTitle: false,
    icon: "user",
    url: "/hospital/patient-management",
    allowedRoles: ['superadmin'], // Chỉ cho phép superadmin

  },
  {
    key: "dashboard-1",
    label: "Manage book access rights",
    isTitle: false,
    icon: "book",
    url: "/request-medical-nurse",
    allowedRoles: ['superadmin'], // Chỉ cho phép superadmin

  },
  { key: "DOCTER", label: "HOME", isTitle: true  ,   allowedRoles: ['doctor'],},
  {
    key: "examine patient",
    label: "Home",
    isTitle: false,
    icon: "home",
    url: "/examine-patient",
    allowedRoles: ['doctor'], // Chỉ cho phép doctor

  },
  { key: "DOCTER", label: "DOCTER", isTitle: true  ,   allowedRoles: ['doctor'],},
  {
    key: "examine patient",
    label: "Examine Patient",
    isTitle: false,
    icon: "user",
    url: "/examine-patient",
    allowedRoles: [ 'doctor'], // Chỉ cho phép doctor

  },
  { key: "NURSE", label: "NURSE", isTitle: true ,   allowedRoles: ['doctor'], },
  {
    key: "Request Access Medical",
    label: "Request Access Medical",
    isTitle: false,
    icon: "calendar",
    url: "/request-medical-nurse",
    allowedRoles: ['doctor'], // Chỉ cho phép doctor

  },
  {
    key: "General nurse",
    label: "General Nurse",
    isTitle: false,
    icon: "calendar",
    url: "/general-nurse",
    allowedRoles: ['doctor'], // Chỉ cho phép doctor

  },
  {
    key: "internal medicine nurse",
    label: "Internal medicine Nurse",
    isTitle: false,
    icon: "calendar",
    url: "/internal-medicine-nurse",
    allowedRoles: ['doctor'], // Chỉ cho phép doctor

  },
  {
    key: "Blood test Nurse",
    label: "Blood test Nurse",
    isTitle: false,
    icon: "calendar",
    url: "/Blood-test-Nurse",
    allowedRoles: ['doctor'], // Chỉ cho phép doctor

  },
  {
    key: "Urine test Nurse",
    label: "Urine test Nurse",
    isTitle: false,
    icon: "calendar",
    url: "/Urine-test-Nurse",
    allowedRoles: ['doctor'], // Chỉ cho phép doctor

  },
  {
    key: "Xray Nurse",
    label: "X-ray Nurse",
    isTitle: false,
    icon: "calendar",
    url: "/Xray-nurse",
    allowedRoles: ['doctor'], // Chỉ cho phép doctor

  },


  { key: "BRACH", label: "BRACH", isTitle: true },

  {
    key: "home",
    label: "Home",
    isTitle: false,
    icon: "calendar",

    url: "/hospital/brach/index",
    allowedRoles: ['superadmin', 'doctor'], // Chỉ cho phép superadmin

  },
  {
    key: "personnel-management",
    label: "Personnel management",
    isTitle: false,
    icon: "calendar",

    url: "/hospital/brach/personnel-management",
    allowedRoles: ['superadmin', 'doctor'], // Chỉ cho phép superadmin

  },
  {
    key: "Manage medical records",
    label: "Manage medical records",
    isTitle: false,
    icon: "calendar",
    allowedRoles: ['superadmin', 'doctor'], // Chỉ cho phép superadmin

    url: "/hospital/brach/manage-medical-records",
  },
  {
    key: "Right to medical ",
    label: "Right to medical ",
    isTitle: false,
    icon: "calendar",
    allowedRoles: ['superadmin', 'doctor'], // Chỉ cho phép superadmin

    url: "/hospital/brach/right-to-medical ",
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
    ]
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
