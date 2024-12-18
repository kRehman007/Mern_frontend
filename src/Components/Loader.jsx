import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoaderIcon = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <CircularProgress color="secondary" size="5rem" />
    </div>
  );
};

export default LoaderIcon;
