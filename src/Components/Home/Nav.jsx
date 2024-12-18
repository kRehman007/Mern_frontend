import React, { useEffect } from "react";
import { AppBar, Stack, Typography, Toolbar, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoDesign.webp";

import { useUserLogOutMutation } from "../../Redux/API/userAPI";
import { useAuth } from "../Hooks/useAuth";

const Nav = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [userLogOut] = useUserLogOutMutation();

  const handleLogOut = async () => {
    try {
      await userLogOut().unwrap();
      navigate("/login");
      setUser(null);
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#333",
        zIndex: "1000",
        padding: "10px 0px 10px 0px",
        paddingRight: { xs: "0", sm: "50px" },
        paddingLeft: { xs: 0, sm: "50px" },
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={Logo} alt="Logo" className="w-12 sm:w-16 rounded-full" />
        </Typography>
        <Stack direction="row" spacing={{ xs: 2, sm: 4 }}>
          <NavLink
            to="/"
            underline="none"
            style={({ isActive }) => ({
              color: isActive ? "#e91367" : "#fff",
              fontSize: "14px",
            })}
          >
            Home
          </NavLink>
          {user?.role !== "admin" && (
            <NavLink
              to="/courses"
              underline="none"
              style={({ isActive }) => ({
                color: isActive ? "#e91367" : "#fff",
                fontSize: "14px",
              })}
            >
              Courses
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              underline="none"
              style={({ isActive }) => ({
                color: isActive ? "#e91367" : "#fff",
                fontSize: "14px",
              })}
            >
              Admin
            </NavLink>
          )}

          <NavLink
            to="/dashboard"
            underline="none"
            style={({ isActive }) => ({
              color: isActive ? "#e91367" : "#fff",
              fontSize: "14px",
            })}
          >
            Dashboard
          </NavLink>
          {user ? (
            <>
              <Button
                onClick={handleLogOut}
                sx={{ p: 0, color: "#fff", textTransform: "capitalize" }}
                className="font-montserrat"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                underline="none"
                style={({ isActive }) => ({
                  color: isActive ? "#e91367" : "#fff",
                })}
              >
                Login
              </NavLink>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
