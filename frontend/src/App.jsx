import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import InputEndLocation from "./pages/InputEndLocation";
import InputStartLocation from "./pages/InputStartLocation";
import InputTPTMode from './pages/InputTPTMode';
import FastestRoute from './pages/FastestRoute';
import FastestRouteDirections from './pages/FastestRouteDirections'; 
import LeastCongestedRoute from "./pages/LeastCongestedRoute";
import ViewLessCongestedRouteDirections from './pages/ViewLessCongestedRouteDirections';
import ViewDrivingRoute from "./pages/ViewDrivingRoute";
import ViewDrivingDirections from "./pages/ViewDrivingDirections";
import DrivingRouteNav from './pages/DrivingRouteNav';
import TPTRouteNav from './pages/TPTRouteNav';
import ViewPublicTransportRoute from './pages/ViewPublicTransportRoute';
import ViewCarParks from "./pages/ViewCarParks";
import MyBookings from "./pages/MyBookings";
import NoBookings from "./pages/NoBookings";
import Settings from "./pages/Settings";
import SettingsPage from "./pages/SettingsPage";
import FeedbackPage from "./pages/FeedbackPage";
import Feedback from './pages/Feedback';
import NotFoundPage from './pages/NotFoundPage';
import DisplayCongestionLevels from './pages/DisplayCongestionLevels';
import Profile from './pages/Profile';
import ProfileSignUp from "./pages/ProfileSignUp";
import ProfileLogIn from "./pages/ProfileLogIn";
import ProfileDetails from "./pages/ProfileDetails";
import PageTracker from "./components/PageTracker";

function App() {
  return (
    <Router>
      <PageTracker />
      <div className="App"> 
        <Routes>
          <Route path="/" element={<Navigate to="/end-location" />} />
          <Route path="/view-driving-route" element={<ViewDrivingRoute />} />
          <Route path="/end-location" element={<InputEndLocation />} />
          <Route path="/start-location" element={<InputStartLocation />} />
          <Route path="/input-TPT-mode" element={<InputTPTMode />} />
          <Route path="/fastest-route" element={<FastestRoute />} />
          <Route path="/display-congestion-levels" element={<DisplayCongestionLevels />}/>
          <Route path="/fastest-route-directions" element={<FastestRouteDirections />} />
          <Route path="/least-congested-route" element={<LeastCongestedRoute />} />
          <Route path="/view-less-congested-directions" element={<ViewLessCongestedRouteDirections />} />
          <Route path="/public-transport-nav" element={<TPTRouteNav />} />
          <Route path="/view-public-transport-route" element={<ViewPublicTransportRoute />} />
          <Route path="/view-car-parks" element={<ViewCarParks />}/>
          <Route path="/my-bookings" element={<MyBookings />}/>
          <Route path="/no-bookings" element={<NoBookings />}/>
          <Route path="/view-driving-route" element={<ViewDrivingRoute />} />
          <Route path="/view-driving-directions" element={<ViewDrivingDirections />} />
          <Route path="/driving-route-nav" element={<DrivingRouteNav />} />
          <Route path="/settings-page" element={<SettingsPage />} />
          <Route path="/feedback-page" element={<FeedbackPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-sign-up" element={<ProfileSignUp />} />
          <Route path="/profile-details" element={<ProfileDetails />} />
          <Route path="/profile-log-in" element={<ProfileLogIn />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
    