import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import "../styles.css";
import Consultation from "./Consultation";
import Dashboard from "./Dashboard";
import BookingsDoctor from "./Doctor/BookingsDoctor";
import DoctorHome from "./Doctor/DoctorHome";
import ProfileDoctor from "./Doctor/ProfileDoctor";
import Landing from "./Landing";
import BookingsPatient from "./Patient/BookingsPatient";
import PatientHome from "./Patient/PatientHome";
import ProfilePatient from "./Patient/ProfilePatient";
import SearchDoctors from "./SearchDoctors";
import UpdatePW from "./UpdatePW";
import UserInterface from "./UserInterface";
import Verify from "./Verify";

export default function Main() {
  const location = useLocation();
  const goTo = useNavigate();
  const dispatch = useDispatch();
  const { lgn, onboard, userType } = useSelector((state) => state.wall);

  useEffect(() => {
    dispatch(logout());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let regex = /^\/\w+/;
    let pathname;
    if (location.pathname !== "/") pathname = location.pathname.match(regex)[0];
    if (!lgn && pathname !== "/verify" && pathname !== "/updatepw") {
      goTo("/landing");
    } else if (lgn) {
      goTo(`/${userType.toLowerCase()}/home`);
    } else if (!lgn) {
      goTo("/landing");
    }
    // eslint-disable-next-line
  }, [lgn]);

  return (
    <div id="mainContainer">
      <Routes>
        <Route path={"/landing"} element={<Landing />} />
        <Route path={"/"} element={<UserInterface />}>
          <Route index element={<Dashboard />} />

          <Route path={"/doctors"} element={<SearchDoctors />} />

          <Route path={"/doctor/home"} element={<DoctorHome />} />
          <Route path={"/patient/home"} element={<PatientHome />} />

          <Route path={"/doctor/bookings"} element={<BookingsDoctor />} />
          <Route path={"/patient/bookings"} element={<BookingsPatient />} />

          <Route path={"/doctor/profile"} element={<ProfileDoctor />} />
          <Route path={"/patient/profile"} element={<ProfilePatient />} />
        </Route>
        <Route path={"/verify/:hash"} element={<Verify />} />
        <Route path={"/updatepw/:hash"} element={<UpdatePW />} />
        <Route path={"/consultation"} element={<Consultation />} />
      </Routes>
    </div>
  );
}
