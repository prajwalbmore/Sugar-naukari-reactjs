import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../error/NotFound";
import Pricing from "../pages/pricing/Pricing";
import Jobs from "../pages/jobs/Jobs";
import FAQ from "../pages/faq/FAQ";
import Students from "../pages/students/Students";
import JoinAs from "../pages/auth/JoinAs";
import AuthLayout from "../pages/auth/AuthLayout";
import CreateProfileLayout from "../pages/auth/CreateProfileLayout";
import Enterprises from "../pages/enterprises/Enterprises";
import JobDetail from "../pages/jobs/jobDetails/JobDetail";
import Dashboard from "../pages/dashboard";
import JobsDashbosrd from "../pages/dashboard/jobs/Jobs";
import MyApplications from "../pages/dashboard/myapplications/MyApplications";
import FAQs from "../pages/dashboard/FAQ/FAQs";
import WorkHistory from "../pages/dashboard/workhistory/WorkHistory";
import PersonalInfo from "../pages/dashboard/personalinfo/PersonalInfo";
import Subscription from "../pages/dashboard/empyoerdashboard/subscription/Subscription";
import Applicants from "../pages/dashboard/empyoerdashboard/applicants/Applicants";
import JobsListing from "../pages/dashboard/empyoerdashboard/jobslisting/JobsListing";
import CompanyInformation from "../pages/dashboard/empyoerdashboard/companyinformation/CompanyInformation";
import JobHistory from "../pages/dashboard/empyoerdashboard/jobhistory/JobHistory";
import ApplicantDetails from "../pages/dashboard/empyoerdashboard/applicants/ApplicantDetails";
import JobDetailsIndex from "../pages/dashboard/empyoerdashboard/jobslisting/JobDetailsIndex";
import OngoingJobs from "../pages/dashboard/empyoerdashboard/ongoingJobs/OngoingJobs";
import CreateJobIndex from "../pages/dashboard/empyoerdashboard/post-job/CreateJobIndex";
import { useAuthContext } from "../contexts/auth/context";
import EditJobIndex from "../pages/dashboard/empyoerdashboard/edit-job/EditJobIndex";
import DuplicateJobIndex from "../pages/dashboard/empyoerdashboard/duplicate-job/DuplicateJobIndex";
import ContactDashboard from "../pages/contact/ContactDashboard";
import NearByJobs from "../pages/dashboard/locations/NearByJobs";
import ChatIndex from "../components/chats/ChatIndex";
import TermsAndConditionFooter from "../pages/termsAndPrivacy/TermsAndConditionFooter";
import PrivacyPolicy from "../pages/termsAndPrivacy/PrivacyPolicy";
import JobDetails from "../pages/dashboard/empyoerdashboard/post-job/JobDetails";

// Loading Screen Component
const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-emerald-500 backdrop-blur-sm z-50">
    <div className="text-center text-5xl font-bold mb-4 animate-spin-slow animate-bounce">
      {/* <img
        src="/assets/landingpage/BrandLogo.png"
        alt="App Logo"
        className="mb-4 animate-spin-slow animate-bounce"
      /> */}
      SugarNaukri
    </div>
  </div>
);

// ProtectedRoute: Only allows authenticated users, otherwise redirects to /
// const RedirectIfAuthenticated = ({ children }) => {
//   const { isAuthenticated, user, userType, isInitialized } = useAuthContext();
//   const location = useLocation();

//   // Wait for auth initialization
//   if (!isInitialized) return <LoadingScreen />;

//   if (isAuthenticated && user) {
//     if (!user?.isprofileCreated) {
//       const profilePath = `/create-profile/${userType}`;
//       if (!location.pathname.startsWith(profilePath)) {
//         return <Navigate to={profilePath} replace />;
//       }
//     } else if (!location.pathname.startsWith("/dashboard")) {
//       return <Navigate to="/dashboard" replace />;
//     }
//   }

//   return children || <Outlet />;
// };
const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated, user, userType, isInitialized } = useAuthContext();
  const location = useLocation();

  // Wait for auth initialization
  if (!isInitialized) return <LoadingScreen />;

  // Auth-only routes where logged-in users should NOT go
  const authPaths = [
    "/login",
    "/register",
    "/verify-code",
    "/forgot-password",
    "/new-password",
    "/join-as",
  ];

  // If logged-in user tries to access auth routes
  if (
    isAuthenticated &&
    user &&
    authPaths.some((p) => location.pathname.startsWith(p))
  ) {
    // if (!user?.isprofileCreated) {
    //   return <Navigate to={`/create-profile/${userType}`} replace />;
    // } else {
      return <Navigate to="/dashboard" replace />;
    // }
  }

  // If user logged in but profile not created → force them to create profile
  // if (isAuthenticated && user && !user?.isprofileCreated) {
  //   const profilePath = `/create-profile/${userType}`;
  //   if (!location.pathname.startsWith(profilePath)) {
  //     return <Navigate to={profilePath} replace />;
  //   }
  // }

  // Otherwise allow access (public routes)
  return children || <Outlet />;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children || <Outlet />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public & Auth Pages - redirect logged-in users */}
      <Route element={<RedirectIfAuthenticated />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/students" element={<Students />} />
          <Route path="/enterprises" element={<Enterprises />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/terms-condition"
            element={<TermsAndConditionFooter />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
        <Route path="/join-as" element={<JoinAs />} />
        <Route path="/login" element={<AuthLayout />} />
        <Route path="/register" element={<AuthLayout />} />
        <Route path="/verify-code" element={<AuthLayout />} />
        <Route path="/forgot-password" element={<AuthLayout />} />
        <Route path="/new-password" element={<AuthLayout />} />
        <Route path="/create-profile/:type" element={<CreateProfileLayout />} />
      </Route>

      {/* Dashboard routes (Protected) */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="messages" element={<ChatIndex />} />
        <Route path="jobs" element={<JobsDashbosrd />} />
        <Route path="jobs/:id" element={<JobDetails isDashboard />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="personal-info" element={<PersonalInfo />} />
        <Route path="work-history" element={<WorkHistory />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="applicants" element={<Applicants />} />
        <Route path="applicants/:id" element={<ApplicantDetails />} />
        <Route path="jobs-listing" element={<JobsListing />} />
        <Route path="jobs-listing/:id" element={<JobDetailsIndex />} />
        <Route path="ongoing" element={<OngoingJobs />} />
        <Route path="company-information" element={<CompanyInformation />} />
        <Route path="job-history" element={<JobHistory />} />
        <Route path="contact-us" element={<ContactDashboard />} />
        <Route path="post-job" element={<CreateJobIndex />} />
        <Route path="edit-job/:id" element={<EditJobIndex />} />
        <Route path="duplicate-job/:id" element={<DuplicateJobIndex />} />
        <Route path="nearby-jobs" element={<NearByJobs />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import DashboardLayout from "../layouts/DashboardLayout";
// import Home from "../pages/home/Home";
// import About from "../pages/about/About";
// import Contact from "../pages/contact/Contact";
// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
// import NotFound from "../error/NotFound";
// import Pricing from "../pages/pricing/Pricing";
// import Jobs from "../pages/jobs/Jobs";
// import FAQ from "../pages/faq/FAQ";
// import Students from "../pages/students/Students";
// import JoinAs from "../pages/auth/JoinAs";
// import AuthLayout from "../pages/auth/AuthLayout";
// import CreateProfileLayout from "../pages/auth/CreateProfileLayout";
// import Enterprises from "../pages/enterprises/Enterprises";
// import JobDetail from "../pages/jobs/jobDetails/JobDetail";
// import Dashboard from "../pages/dashboard";
// import JobsDashbosrd from "../pages/dashboard/jobs/Jobs";
// import MyApplications from "../pages/dashboard/myapplications/MyApplications";
// import FAQs from "../pages/dashboard/FAQ/FAQs";
// import WorkHistory from "../pages/dashboard/workhistory/WorkHistory";
// import PersonalInfo from "../pages/dashboard/personalinfo/PersonalInfo";
// import Subscription from "../pages/dashboard/empyoerdashboard/subscription/Subscription";
// import Applicants from "../pages/dashboard/empyoerdashboard/applicants/Applicants";
// import JobsListing from "../pages/dashboard/empyoerdashboard/jobslisting/JobsListing";
// import CompanyInformation from "../pages/dashboard/empyoerdashboard/companyinformation/CompanyInformation";
// import JobHistory from "../pages/dashboard/empyoerdashboard/jobhistory/JobHistory";
// import ApplicantDetails from "../pages/dashboard/empyoerdashboard/applicants/ApplicantDetails";
// import JobDetailsIndex from "../pages/dashboard/empyoerdashboard/jobslisting/JobDetailsIndex";
// import OngoingJobs from "../pages/dashboard/empyoerdashboard/ongoingJobs/OngoingJobs";
// import CreateJobIndex from "../pages/dashboard/empyoerdashboard/post-job/CreateJobIndex";
// import { useAuthContext } from "../contexts/auth/context";
// import { TokenRefresher } from "../utils/TokenRefresher";
// import NearByJobs from "../pages/dashboard/locations/NearByJobs";
// import EditJobIndex from "../pages/dashboard/empyoerdashboard/edit-job/EditJobIndex";
// import DuplicateJobIndex from "../pages/dashboard/empyoerdashboard/duplicate-job/DuplicateJobIndex";
// import ContactDashboard from "../pages/contact/ContactDashboard";
// import ChatIndex from "../components/chats/ChatIndex";

// const LoadingScreen = () => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-appcolor backdrop-blur-sm z-50">
//       <div className="text-center">
//         <img
//           src="/assets/landingpage/BrandLogo.png"
//           alt="App Logo"
//           className="mb-4 animate-spin-slow animate-bounce"
//         />
//       </div>
//     </div>
//   );
// };
// const RedirectIfAuthenticated = ({ children }) => {
//   const { isAuthenticated } = useAuthContext();
//   const location = useLocation();

//   // If authenticated and NOT already on /dashboard, redirect to dashboard
//   if (isAuthenticated && !location.pathname.startsWith("/dashboard")) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   // Otherwise, allow normal rendering
//   return children;
// };

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuthContext();
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   // If authenticated and trying to access the root/login page, redirect to dashboard
//   if (
//     isAuthenticated &&
//     (location.pathname === "/" || location.pathname === "/login")
//   ) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   // If not authenticated, block all protected routes and send to root
//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   // Normal: show protected content (dashboard etc.)
//   return children;
// };

// // export default ProtectedRoute;
// export default function AppRoutes() {
//   return (
//     <Routes>
//       {/* Layout pages */}
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/jobs" element={<Jobs />} />
//         <Route path="/jobs/:id" element={<JobDetail />} />
//         <Route path="/pricing" element={<Pricing />} />
//         <Route path="/students" element={<Students />} />
//         <Route path="/enterprises" element={<Enterprises />} />
//         <Route path="/faq" element={<FAQ />} />
//         <Route path="/contact" element={<Contact />} />
//       </Route>

//       {/* Auth pages */}
//       <Route path="/join-as" element={<JoinAs />} />
//       <Route path="/login" element={<AuthLayout />} />
//       <Route path="/register" element={<AuthLayout />} />
//       <Route path="/verify-code" element={<AuthLayout />} />
//       <Route path="/forgot-password" element={<AuthLayout />} />
//       <Route path="/new-password" element={<AuthLayout />} />
//       <Route path="/create-profile/:type" element={<CreateProfileLayout />} />

//       {/* Dashboard routes (Protected) */}
//       <Route
//         path="/dashboard/*"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* <TokenRefresher /> */}
//         <Route index element={<Dashboard />} />
//         <Route path="messages" element={<ChatIndex />} />
//         <Route path="jobs" element={<JobsDashbosrd />} />
//         <Route path="jobs/:id" element={<JobDetail isDashboard />} />
//         <Route path="applications" element={<MyApplications />} />
//         <Route path="personal-info" element={<PersonalInfo />} />
//         <Route path="work-history" element={<WorkHistory />} />
//         <Route path="faqs" element={<FAQs />} />
//         <Route path="subscription" element={<Subscription />} />
//         <Route path="applicants" element={<Applicants />} />
//         <Route path="applicants/:id" element={<ApplicantDetails />} />
//         <Route path="jobs-listing" element={<JobsListing />} />
//         <Route path="jobs-listing/:id" element={<JobDetailsIndex />} />
//         <Route path="ongoing" element={<OngoingJobs />} />
//         <Route path="company-information" element={<CompanyInformation />} />
//         <Route path="job-history" element={<JobHistory />} />
//         <Route path="contact-us" element={<ContactDashboard />} />
//         <Route path="post-job" element={<CreateJobIndex />} />
//         <Route path="edit-job/:id" element={<EditJobIndex />} />
//         <Route path="duplicate-job/:id" element={<DuplicateJobIndex />} />

//         <Route path="nearby-jobs" element={<NearByJobs />} />
//       </Route>

//       {/* 404 Page */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }
