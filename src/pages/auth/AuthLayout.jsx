import React from "react";
import { useLocation, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import VerifyCode from "./VerifyCode";
import ForgotPassword from "./ForgotPassword";
import NewPassword from "./NewPassword";

const AuthLayout = () => {
  const location = useLocation();

  const renderForm = () => {
    switch (location?.pathname) {
      case "/login":
        return <Login />;
      case "/register":
        return <Register />;
      case "/verify-code":
        return <VerifyCode />;
      case "/forgot-password":
        return <ForgotPassword />;
      case "/new-password":
        return <NewPassword />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* Main content */}
        <main className="mx-auto flex max-w-6xl px-4  sm:px-6 lg:px-8 ">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
            {/* Left side - Branding & Benefits */}
            <div className="max-w-md mx-auto lg:mx-0 lg:max-w-lg">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent sm:text-5xl md:text-6xl">
                  Welcome to your
                  <br />
                  <span className="text-[#008000]">professional network</span>
                </h2>
                <p className="mt-6 text-lg text-slate-600 max-w-md mx-auto lg:mx-0">
                  Connect with opportunities, track applications, and grow your
                  career with India's leading job platform.
                </p>
              </div>

              <div className=" space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-sm">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-slate-700">
                    10M+ jobs posted monthly
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-sm">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-slate-700">
                    AI-powered job matching
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-sm">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-slate-700">
                    Profile insights & analytics
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Your existing forms */}
            <div className="flex justify-center lg:justify-end lg:mt-0">
              <div className="w-full  relative">
                <div
                // className={`bg-white/80 backdrop-blur-xl border border-slate-100 shadow-2xl rounded-3xl  `}
                >
                  {/* Your existing forms render here - perfectly centered */}
                  <div className="w-full">{renderForm()}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
// import React from "react";
// import { useLocation } from "react-router-dom";
// import Login from "./Login";
// import Register from "./Register";
// import VerifyCode from "./VerifyCode";
// import ForgotPassword from "./ForgotPassword";
// import NewPassword from "./NewPassword";

// const AuthLayout = () => {
//   const location = useLocation();
//   //   const { selectedOption } = location?.state;
//   const renderForm = () => {
//     switch (location?.pathname) {
//       case "/login":
//         return <Login />;
//       case "/register":
//         return <Register />;
//       case "/verify-code":
//         return <VerifyCode />;
//       case "/forgot-password":
//         return <ForgotPassword />;
//       case "/new-password":
//         return <NewPassword />;
//       default:
//         return null;
//     }
//   };
//   return (
//     <div className="flex min-h-screen">
//       <div
//         className="absolute
//                   sm:left-0 sm:right-0
//                 md:left-[50px] md:right-[50px]
//                 lg:left-[100px] lg:right-[100px]"
//       >
//         {" "}
//         {renderForm()}
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;
