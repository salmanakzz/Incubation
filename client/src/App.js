import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/user/Login";
import SignupPage from "./pages/user/Signup";
import HomePage from "./pages/user/Home";

import UserPrivateRoutes from "./private_routes/UserPrivateRoutes";
import { adminAuth, adminLogin, userAuth, userLogin } from "./urls/urls";
import ApplicationPage from "./pages/user/Application";
import AdminLoginPage from "./pages/admin/Login";
import DashboardPage from "./pages/admin/Dashboard";
import AdminPrivateRoutes from "./private_routes/AdminPrivateRoute";
import RecordTrackPage from "./pages/admin/RecordTrack";
import BookingSlotPage from "./pages/admin/BookingSlot";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginPage user={true} url={userLogin}/>} />
          <Route path="/register" element={<SignupPage />} />
          <Route element={<UserPrivateRoutes authUrl={userAuth} />}>
            <Route element={<HomePage user={true} />} path="/home" exact />
            <Route element={<ApplicationPage user={true} />} path="/application" exact />
          </Route>
          <Route path="/admin" exact element={<AdminLoginPage admin={true} url={adminLogin}/>} />
          <Route element={<AdminPrivateRoutes authUrl={adminAuth} />} >
            <Route path="/dashboard" exact element={<DashboardPage />} />
            <Route path="/record_track" exact element={<RecordTrackPage />} />
            <Route path="/booking_slot" exact element={<BookingSlotPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
