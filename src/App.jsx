import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/auth/Provider";
import ScrollToTop from "./ScrollToTop";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import AppRoutes from "./routes";
// import { AuthProvider } from "./contexts/auth/Provider";

// export default function App() {

//   return (
//     <AuthProvider>
//       <Router>
//         <AppRoutes />
//       </Router>
//     </AuthProvider>
//   );
// }
