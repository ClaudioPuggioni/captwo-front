import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { clearAll } from "../features/dataSlice";
import Logo from "./Logo";

const menuBarItem = {
  width: "100px",
  height: "88px",
  position: "relative",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderLeft: "0.1px solid darkgrey",
  borderRight: "0.1px solid darkgrey",
};

const settings = ["Profile", "Logout"];

export default function MainBar() {
  const { userInfo, userType } = useSelector((state) => state.wall);
  const location = useLocation();

  useEffect(() => {
    // console.log(location.pathname);
    if (location.pathname === "/doctor/bookings" || location.pathname === "/patient/bookings") setSelectedMenu(2);
  }, [location]);

  const dispatch = useDispatch();
  const goTo = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleGoProfile = () => {
    goTo(`/${userType.toLowerCase()}/profile`);
  };

  const settingsLinks = [handleGoProfile, [clearAll, logout]];

  return (
    <div
      id="mainBarContainer"
      style={{
        padding: "0 4%",
        height: "88px",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        borderBottom: "1.5px solid darkgrey",
      }}
    >
      <Logo width={50} gap={13} fontSize={30} text={"right"} />
      <Box sx={{ display: "flex", alignItems: "center", gap: "45px" }}>
        <div style={{ height: "88px", display: "flex", alignItems: "center" }}>
          <Box
            onClick={() => {
              setSelectedMenu(0);
              goTo(`/${userType.toLowerCase()}/home`);
            }}
            sx={menuBarItem}
          >
            Home<Box className={selectedMenu === 0 ? "selectedMenuBar" : 0}></Box>
          </Box>
          <Box
            onClick={() => {
              setSelectedMenu(1);
              goTo("/doctors");
            }}
            sx={{ ...menuBarItem, border: "none" }}
          >
            Doctors<Box className={selectedMenu === 1 ? "selectedMenuBar" : 0}></Box>
          </Box>
          <Box
            onClick={() => {
              setSelectedMenu(2);
              goTo(`/${userType.toLowerCase()}/bookings`);
            }}
            sx={menuBarItem}
          >
            Bookings<Box className={selectedMenu === 2 ? "selectedMenuBar" : 0}></Box>
          </Box>
        </div>
        <Box sx={{ flexGrow: 0 }}>
          <Box onClick={handleOpenUserMenu} sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            {userInfo ? userInfo.name : null}
          </Box>
          <Menu
            sx={{ mt: "30px" }}
            elevation={2}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting, idx) => (
              <MenuItem
                key={setting}
                onClick={() => {
                  handleCloseUserMenu();
                  if (idx === 0) settingsLinks[idx]();
                  if (idx === 1) {
                    dispatch(settingsLinks[idx][0]());
                    dispatch(settingsLinks[idx][1]());
                  }
                }}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </div>
  );
}
