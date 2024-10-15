export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  url?: string;
  role?:String;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
  { key: "MAIN", label: "MAIN",role: "hospital", isTitle: true },
  {
    key: "/hospital/home",
    label: "Home",
    isTitle: false,
    icon: "calendar",
    url: "/hospital/home",
    role: "hospital",

  },
  { key: "HOSPITAL", label: "HOSPITAL",role: "hospital", isTitle: true },
  {
    key: "/hospital/profile-hospital",
    label: "Organizational information",
    isTitle: false,
    icon: "calendar",
    role: "hospital",
    url: "/hospital/profile-hospital?mode=hospital",

  },
  {
    key: "Hospital branch",
    label: "Hospital branch",
    isTitle: false,
    icon: "calendar",
    role: "hospital",
    url: "/hospital/hospital-branch",
  },
  {
    key: "personnel management",
    label: "Personnel management",
    isTitle: false,
    icon: "user",
    role: "hospital",
    url: "/hospital/personnel-management",
  },
  {
    key: "patient management",
    label: "patient management",
    isTitle: false,
    icon: "user",
    role: "hospital",
    url: "/hospital/patient-management",
  },
  {
    key: "dashboard-1",
    label: "Manage book access rights",
    isTitle: false,
    icon: "book",
    role: "hospital",
    url: "/dashboard-1",
  },

  { key: "PHARMACY", label: "PHARMACY",role: "hospital", isTitle: true },
  {
    key: "dashboard-1",
    label: "Manage prescriptions",
    isTitle: false,
    icon: "calendar",
    role: "hospital",
    url: "/dashboard-1",
  },
  { key: "DOCTER", label: "DOCTER",role: "doctor", isTitle: true },
  {
    key: "examine patient",
    label: "Examine Patient",
    isTitle: false,
    icon: "user",
    role: "doctor",
    url: "/examine-patient?mode=doctor",
  },
  { key: "NURSE", label: "NURSE",role: "doctor", isTitle: true },

  {
    key: "reception nurse",
    label: "Reception Nurse",
    isTitle: false,
    icon: "calendar",
    role: "doctor",
    url: "/reception-nurse?mode=doctor",
  },
  {
    key: "General nurse",
    label: "General Nurse",
    isTitle: false,
    icon: "calendar",
    role: "doctor",
    url: "/general-nurse?mode=doctor",
  },
  {
    key: "internal medicine nurse",
    label: "Internal medicine Nurse",
    isTitle: false,
    icon: "calendar",
    role: "doctor",
    url: "/internal-medicine-nurse?mode=doctor",
  },
  {
    key: "Blood test Nurse",
    label: "Blood test Nurse",
    isTitle: false,
    icon: "calendar",
    role: "doctor",
    url: "/Blood-test-Nurse?mode=doctor",
  },
  {
    key: "Urine test Nurse",
    label: "Urine test Nurse",
    isTitle: false,
    icon: "calendar",
    role: "doctor",
    url: "/Urine-test-Nurse?mode=doctor",
  },
  {
    key: "Xray Nurse",
    label: "X-ray Nurse",
    isTitle: false,
    icon: "calendar",
    role: "doctor",
    url: "/Xray-nurse?mode=doctor",
  },

  { key: "BRACH", label: "BRACH",role: "hospital", isTitle: true },

  {
    key: "home",
    label: "Home",
    isTitle: false,
    icon: "calendar",
    role: "hospital",
    url: "/hospital/brach/index",
  },
  {
    key: "personnel-management",
    label: "Personnel management",
    isTitle: false,
    icon: "calendar",
    role: "hospital",
    url: "/hospital/brach/personnel-management",
  },
  {
    key: "Manage medical records",
    label: "Manage medical records",
    isTitle: false,
    icon: "calendar",
    role: "hospital",
    url: "/hospital/brach/manage-medical-records",
  },
  {
    key: "Right to medical ",
    label: "Right to medical ",
    isTitle: false,
    icon: "calendar",
    role: "hospital",
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
