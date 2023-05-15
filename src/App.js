import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import NavBar from "./Components/NavBar";
import { AuthProvider } from "./AuthContext";

// super admin Pages
import SuperAdminDashboard from "./SuperAdmin/SuperAdminDashboard";
import SupportRequests from "./SuperAdmin/SupportRequests";
import ReceivedPayment from "./SuperAdmin/ReceivedPayment";
import DirectWithdrawRequest from "./SuperAdmin/DirectWithdrawRequest";
import AdsViewWithdrawRequest from "./SuperAdmin/AdsViewWithdrawRequest";
import Login from "./SuperAdmin/Login";

function App() {
  return (
    <AuthProvider>
      <Router basename="/">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/Super-Admin-Dashboard"
            element={
              <>
                <Sidebar />
                <NavBar />
                <SuperAdminDashboard />
              </>
            }
          />

          <Route
            path="/Received-Payment"
            element={
              <>
                <Sidebar />
                <NavBar />
                <ReceivedPayment />
              </>
            }
          />
          <Route
            path="/Direct-Withdraw-Request"
            element={
              <>
                <Sidebar />
                <NavBar />
                <DirectWithdrawRequest />
              </>
            }
          />
          <Route
            path="/Ads-View-Withdraw-Request"
            element={
              <>
                <Sidebar />
                <NavBar />
                <AdsViewWithdrawRequest />
              </>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
