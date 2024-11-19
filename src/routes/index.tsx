import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";

// components
import PrivateRoute from "./PrivateRoute";
import Dashboard1 from "../medical/dashboard/Dashboard1";
import Dashboard2 from "../medical/dashboard/Dashboard2";

// auth

const Login2 = React.lazy(() => import("../medical/auth2/Login2"));
const Logout2 = React.lazy(() => import("../medical/auth2/Logout2"));
const Register2 = React.lazy(() => import("../medical/auth2/Register2"));
const Confirm2 = React.lazy(() => import("../medical/auth2/Confirm2"));
const ForgetPassword2 = React.lazy(
  () => import("../medical/auth2/ForgetPassword2")
);
const LockScreen2 = React.lazy(() => import("../medical/auth2/LockScreen2"));
const SignInSignUp2 = React.lazy(() => import("../medical/auth2/SignInSignUp2"));

// landing
const Landing = React.lazy(() => import("../medical/landing/"));

// dashboard
// const Dashboard1 = React.lazy(() => import("../medical/dashboard/Dashboard1/"));
const Medicalexamination = React.lazy(() => import("../medical/examinationhistory/index"));
const MedicalRecordDetail = React.lazy(() => import("../medical/examinationhistory/medicalRecordDetail"));
const Managentapprove = React.lazy(() => import("../medical/approve/Managentapprove"));
const ProfileMedical = React.lazy(() => import("../medical/profile/profilemedical"));

const Error404 = React.lazy(() => import("../medical/error/Error404"));
const Error404Two = React.lazy(() => import("../medical/error/Error404Two"));
const Error500 = React.lazy(() => import("../medical/error/Error500"));
const Error500Two = React.lazy(() => import("../medical/error/Error500Two"));

const Upcoming = React.lazy(() => import("../medical/other/Upcoming"));

const Maintenance = React.lazy(() => import("../medical/other/Maintenance"));

// uikit
// const Buttons = React.lazy(() => import("../medical/uikit/Buttons"));

// hospital api
const Indexhospital = React.lazy(() => import("../hospital/dashboard/Dashboard1"));
const Profilehospital = React.lazy(() => import("../hospital/profilehospital/profile"));
const Registrationorg = React.lazy(() => import("../hospital/Organizationregistration/registrationorg"));
const Loginorg = React.lazy(() => import("../hospital/Organizationlogin/Login"));
const LogoutH = React.lazy(() => import("../hospital/auth2/Logout2"));
const Hospitalbranch = React.lazy(() => import("../hospital/hospitalbranch/hospitalbranch"));
const Createbranch = React.lazy(() => import("../hospital/hospitalbranch/createbranch"));
const Detailbranch = React.lazy(() => import("../hospital/hospitalbranch/detailbranch"));
const Personnelhospital = React.lazy(() => import("../hospital/personnel/index"));
const CreatePersonnel = React.lazy(() => import("../hospital/personnel/createpersonnel"));
const EditPersonnel = React.lazy(() => import("../hospital/personnel/editprersonnel"));
// const RequestMedical = React.lazy(() => import("../hospital/requestmedical/index"));
const ExaminePatient = React.lazy(() => import("../hospital/examinePatient/index"));
// const HospitalBrach = React.lazy(()=>import("../hospital/brach/index/index"));
// const PersonnelManagent = React.lazy(()=>import("../hospital/brach/personnel/personnelmanagent"));
const ManagentMedical = React.lazy(()=>import("../hospital/brach/medical/managemedical"));
const CreaterSeveri = React.lazy(()=>import("../hospital/hospitalbranch/createrseveri"));
const CreaterClinic = React.lazy(()=>import("../hospital/hospitalbranch/createrclinic"));
// const Rightmedical = React.lazy(()=>import("../hospital/brach/medical/rightmedical"));
// Nurse api
const BloodTestNurse = React.lazy(()=>import("../hospital/Nurse/BloodTestNurse/index"));
const GeneralNurse = React.lazy(()=>import("../hospital/Nurse/GeneralNurse/index"));
const InternalmedicineNurse = React.lazy(()=>import("../hospital/Nurse/InternalmedicineNurse/index"));
const UrineTestNurse = React.lazy(()=>import("../hospital/Nurse/UrineTestNurse/index"));
const XrayNurse = React.lazy(()=>import("../hospital/Nurse/XrayNurse/index"));
const Nurse = React.lazy(()=>import("../hospital/Nurse/diagnosis/index"));
const Nurseschedule = React.lazy(()=>import("../hospital/Nurse/schedule/index"));
const ManagentRequest = React.lazy(()=>import("../hospital/Nurse/Requestmedical/ManagentRequest"));
const DoctorHome = React.lazy(()=>import("../hospital/Nurse/home/index"));
const DoctorProfile = React.lazy(()=>import("../hospital/Nurse/profile/index"));
const BranchHome = React.lazy(()=>import("../hospital/hospitalbranch/home/homebranch"));
const Department = React.lazy(()=>import("../hospital/hospitalbranch/createdepartment"));
const CreateAppointments = React.lazy(()=>import("../hospital/hospitalbranch/CreateAppointment"));
const HospitalMain = React.lazy(()=>import("../hospital/hospitalbranch/main/index"));
const DoctorMedicalHistory = React.lazy(()=>import("../hospital/Nurse/Medicalhistory/index"));
const DoctorMedicalHistoryDetail = React.lazy(()=>import("../hospital/Nurse/Medicalhistory/Medicalhistorydetail"));
const Appointments = React.lazy(()=>import("../hospital/Nurse/appointments/index"));
const HospitalMedicalshare =React.lazy(()=>import("../hospital/medicalShare/index"));
// bill medical
const BillMedical =React.lazy(()=>import("../hospital/billmedical/index"));

export interface RoutesProps {
  path: RouteProps["path"];
  name?: string;
  element?: RouteProps["element"];
  route?: any;
  exact?: boolean;
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

// dashboards

const hospitalRouter: RoutesProps = {
  path: "/dashboard",
  name: "Hospital Dashboard",
  icon: "hospital",
  header: "Hospital Navigation",
  children: [
    {
      path: "/",
      name: "Home",
      element: <Navigate to="/hospital/dashboard-1" />,
      route: PrivateRoute,
    },
    {
      path: "/hospital/home",
      name: "Dashboard 1",
      element: <Indexhospital />,
      route: PrivateRoute,
    },
    {
      path: "/hospital/profile-hospital",
      name: "Dashboard 1",
      element: <Profilehospital />,
      route: PrivateRoute,
    },
    {
      path: "/hospital/hospital-branch",
      name: "Hospital branch",
      element: <Hospitalbranch />,
      route: PrivateRoute,
    },
    {
      path: "/hospital/create-branch",
      name: "Hospital branch",
      element: <Createbranch />,
      route: PrivateRoute,
    },
    {
      path: "/hospital/detail-branch",
      name: "Hospital branch",
      element: <Detailbranch />,
      route: PrivateRoute,
    },
    {

      path: "/hospital/personnel-management",
      name: "personnel management",
      element: <Personnelhospital />,
      route: PrivateRoute,
    },
    {

      path: "/hospital/create-personnel",
      name: "personnel management",
      element: <CreatePersonnel />,
      route: PrivateRoute,
    },
    {

      path: "/hospital/edit-personnel",
      name: "personnel management",
      element: <EditPersonnel />,
      route: PrivateRoute,
    },
    //doctor
    {
      path: "/examine-patient",
      name: "Examine-Patient",
      element: <ExaminePatient />,
      route: PrivateRoute,
    },
    //nurse
    {

      path: "/general-nurse",
      name: "general-nurse",
      element: <GeneralNurse />,
      route: PrivateRoute,
    },
    {

      path: "/internal-medicine-nurse",
      name: "internal-medicine-nurse",
      element: <InternalmedicineNurse />,
      route: PrivateRoute,
    },
    {
    path: "/Blood-test-Nurse",
    name: "Blood-test-Nurse",
      element: <BloodTestNurse />,
      route: PrivateRoute,
    },
    {
    path: "/Urine-test-Nurse",
    name: "Urine-test-Nurse",
      element: <UrineTestNurse />,
      route: PrivateRoute,
    },
    {

      path: "/hospital/brach/manage-medical-records",
      name: "personnel management",
      element: <ManagentMedical />,
      route: PrivateRoute,
    },
    {

      path: "/hospital/brach/create-apppoinment",
      name: "personnel management",
      element: <CreateAppointments />,
      route: PrivateRoute,
    },
    {

      path: "/hospital/brach/create-service",
      name: "personnel management",
      element: <CreaterSeveri />,
      route: PrivateRoute,
    },
    {

      path: "/hospital/brach/create-clinic",
      name: "create-clinic",
      element: <CreaterClinic />,
      route: PrivateRoute,
    },

    {

      path: "/hospital/brach/create-department",
      name: "create-clinic",
      element: <Department />,
      route: PrivateRoute,
    },
    {
      
      path: "/Xray-nurse",
      name: "Xray-nurse",
      element: <XrayNurse />,
      route: PrivateRoute,
    },
    {
      
      path: "/nurse",
      name: "nurse",
      element: <Nurse />,
      route: PrivateRoute,
    },
    {
      
      path: "/nurse-schedule",
      name: "nurse",
      element: <CreateAppointments />,
      route: PrivateRoute,
    },
    {
      
      path: "/doctor/home",
      name: "doctor/home",
      element: <DoctorHome />,
      route: PrivateRoute,
    },
    {
      
      path: "/doctor/history",
      name: "doctor/history",
      element: <DoctorMedicalHistory />,
      route: PrivateRoute,
    },
    {
      
      path: "/doctor/history-detail",
      name: "doctor/history",
      element: <DoctorMedicalHistoryDetail />,
      route: PrivateRoute,
    },
    {
      
      path: "/doctor/profile",
      name: "doctor/profile",
      element: <DoctorProfile />,
      route: PrivateRoute,
    },
    {
      
      path: "/doctor/appointments",
      name: "doctor/appointments",
      element: <Appointments />,
      route: PrivateRoute,
    },
    {
      
      path: "/request-medical-nurse",
      name: "request-medical-nurse",
      element: <ManagentRequest />,
      route: PrivateRoute,
    },
    {
      path: "/hospital/branch/home",
      name: "branch-home",
      element: <HospitalMain />,
      route: PrivateRoute,
    },
    {
      path: "/hospital/medical-share",
      name: "hospital/medical-share",
      element: <HospitalMedicalshare />,
      route: PrivateRoute,
    },
    {
      path: "/hospital/medicalbill",
      name: "hospital/medicalbill",
      element: <BillMedical />,
      route: PrivateRoute,
    },
    {
      path: "/hospital/branch/main",
      name: "hospital/hospital-branch",
      element: <HospitalMain />,
      route: PrivateRoute,
    }

  ],
};
const dashboardRoutes: RoutesProps = {
  path: "/dashboard",
  name: "Dashboards",
  icon: "airplay",
  header: "Navigation",
  children: [
    {
      path: "/medical/",
      name: "Root",
      element: <Navigate to="/medical/medical-record" />,
      route: PrivateRoute,
    },
    {
      path: "/medical/medical-record",
      name: "medical record",
      element: <Dashboard1 />,
      route: PrivateRoute,
    },
    {
      path: "/medical/medical record details",
      name: "medical record details",
      element: <Dashboard2 />,
      route: PrivateRoute,
    },
    {
      path: "/medical/medical-history",
      name: "medical-examination",
      element: <Medicalexamination />,
      route: PrivateRoute,
    },
    {
      path: "/medical/profile-medical",
      name: "profile-medical",
      element: <ProfileMedical />,
      route: PrivateRoute,
    },
    {
      path: "/medical/medical-record-detail",
      name: "examination-history",
      element: <MedicalRecordDetail />,
      route: PrivateRoute,
    },
    {
      path: "/medical/medical-managent-approve",
      name: "medical-managent-approve",
      element: <Managentapprove />,
      route: PrivateRoute,
    }
  ],
};



// auth
const authRoutes: RoutesProps[] = [
  {
    path: "/hospital/organization-registration",
    name: "Dashboard 1",
    element: <Registrationorg />,
    route: PrivateRoute,
  },
  {
    path: "/hospital/organization-loginorg",
    name: "Dashboard 1",
    element: <Loginorg />,
    route: PrivateRoute,
  },
  {
    path: "/hospital/auth/logout",
    name: "Dashboard 1",
    element: <LogoutH />,
    route: PrivateRoute,
  },

  
  {
    path: "/medical/auth/login2",
    name: "Login2",
    element: <Login2 />,
    route: Route,
  },
  {
    path: "/medical/auth/logout2",
    name: "Logout2",
    element: <Logout2 />,
    route: Route,
  },
  {
    path: "/medical/auth/register2",
    name: "Register2",
    element: <Register2 />,
    route: Route,
  },
  {
    path: "/medical/auth/confirm2",
    name: "Confirm2",
    element: <Confirm2 />,
    route: Route,
  },
  {
    path: "/medical/auth/forget-password2",
    name: "Forget Password2",
    element: <ForgetPassword2 />,
    route: Route,
  },
  {
    path: "/medical/auth/signin-signup2",
    name: "SignIn-SignUp2",
    element: <SignInSignUp2 />,
    route: Route,
  },
  {
    path: "/medical/auth/lock-screen2",
    name: "Lock Screen2",
    element: <LockScreen2 />,
    route: Route,
  },
  
];

// public routes
const otherPublicRoutes = [
  {
    path: "/page/landing",
    name: "landing",
    element: <Landing />,
    route: Route,
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    element: <Maintenance />,
    route: Route,
  },
  {
    path: "/error-404",
    name: "Error - 404",
    element: <Error404 />,
    route: Route,
  },
  {
    path: "/error-404-two",
    name: "Error - 404 Two",
    element: <Error404Two />,
    route: Route,
  },
  {
    path: "/error-500",
    name: "Error - 500",
    element: <Error500 />,
    route: Route,
  },
  {
    path: "/error-500-two",
    name: "Error - 500 Two",
    element: <Error500Two />,
    route: Route,
  },
  {
    path: "/upcoming",
    name: "Coming Soon",
    element: <Upcoming />,
    route: Route,
  },
];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const authProtectedRoutes = [
  dashboardRoutes,
 
];
const adminhospitalRouter = [
  hospitalRouter,
]
const publicRoutes = [...authRoutes, ...otherPublicRoutes];
const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
const publicProtectedFlattenRoutesHospital = flattenRoutes([...adminhospitalRouter]);
export {
  publicRoutes,
  authProtectedRoutes,
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
  publicProtectedFlattenRoutesHospital,
};
