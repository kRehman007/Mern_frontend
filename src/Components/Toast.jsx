import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";

const Toast = ({ value, severity = "success" }) => {
  const [showToast, setShowToast] = useState(true);
  useEffect(() => {
    let timer;
    if (value) {
      setShowToast(true);
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return (
    <>
      {value && showToast && (
        <Alert
          variant="filled"
          severity={severity}
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 2000,
            backgroundColor: "#673ab7",
            color: "#fff",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "8px",
            padding: "10px 20px",
          }}
        >
          {value}
        </Alert>
      )}
    </>
  );
};

export default Toast;
