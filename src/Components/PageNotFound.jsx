import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center h-screen justify-center flex-col -mt-8">
      <h1 className="text-7xl font-bold" style={{ color: "#673ab7" }}>
        404
      </h1>
      <p className="text-gray-500">Page not found</p>
      <Button
        onClick={() => navigate("/")}
        sx={{
          background: "#e913b7",
          mt: 2,
          color: "#fff",
          fontSize: "14px",
          textTransform: "capitalize",
        }}
      >
        Go to HomePage
      </Button>
    </div>
  );
};

export default PageNotFound;
