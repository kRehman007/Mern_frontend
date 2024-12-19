import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Stack } from "@mui/material";

const Detail = () => {
  const [detail, setDetail] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setDetail(location?.state);
  }, []);

  console.log("Detail", detail);
  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h1"
        className="font-montserrat font-bold"
        sx={{ fontSize: { xs: "2rem", sm: "2.5rem" }, color: "#673ab7" }}
      >
        {detail?.course_title}
      </Typography>
      <Typography
        variant="h2"
        className="font-poppins"
        sx={{
          fontSize: "1rem",
          mt: 1,
          fontWeight: "semibold",
          color: "#e91363",
        }}
      >
        {detail?.course_sub_title}
      </Typography>
      <Typography
        className="font-roboto "
        sx={{ fontSize: "1rem", mt: 4, fontWeight: "semibold", color: "#333" }}
      >
        {detail?.course_desc}
      </Typography>
      <Typography
        variant="h2"
        className="font-poppins"
        sx={{
          fontSize: "2rem",
          mt: 4,
          fontWeight: "semibold",
          color: "#673ab7",
        }}
      >
        Highlights
      </Typography>
      <ul className="font-roboto list-disc list-outside pl-3 mt-5">
        {detail?.highlights?.map((highlight, index) => (
          <li className="mb-1" key={index}>
            {highlight}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Detail;
