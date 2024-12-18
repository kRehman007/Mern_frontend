import { Container, Typography, Stack, Box } from "@mui/material";
import img from "../../assets/12.jpg";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../Redux/API/courseAPI";

const Detail2 = () => {
  const params = useParams();
  console.log("id", params.id);
  const { data } = useGetSingleStudentQuery({ id: params.id });
  const [detail, setDetail] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setDetail(location?.state);
  }, []);
  return (
    <Container sx={{ xs: 6, sm: 8 }}>
      <Typography
        variant="h2"
        className="font-poppins"
        sx={{
          fontSize: "2rem",
          mt: { xs: 6, sm: 8 },
          fontWeight: "semibold",
          color: "#673ab7",
        }}
      >
        Course Details
      </Typography>
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1,1fr)", sm: "repeat(2,1fr)" },
          gap: 3,
        }}
        mt={3}
      >
        <Box
          className="border p-3 rounded-md shadow-lg overflow-hidden col-span-1 order-2 sm:order-1"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            color: "#333",

            wordWrap: "break-word",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} className="font-roboto">
            Instructor Name:{" "}
            <span style={{ fontWeight: "normal" }}>
              {detail?.instructor_name}
            </span>
          </Typography>
          <Typography
            sx={{ fontWeight: "bold" }}
            className="font-roboto max-w-full"
          >
            Instructor Bio:{" "}
            <span style={{ fontWeight: "normal" }}>
              {detail?.instructor_bio}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }} className="font-roboto">
            Price:{" "}
            <span style={{ fontWeight: "normal" }}>
              ${detail?.course_price}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }} className="font-roboto">
            Category:{" "}
            <span style={{ fontWeight: "normal" }}>
              {detail?.course_category}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }} className="font-roboto">
            Language: <span style={{ fontWeight: "normal" }}>English</span>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }} className="font-roboto">
            Enrolled Students:{" "}
            <span style={{ fontWeight: "normal" }}>{data?.totalStudents}</span>
          </Typography>
        </Box>
        <Box className="border rounded-md p-3 shadow-lg w-full h-[400px] lg:w-3/4 overflow-hidden  order-1 sm:order-2">
          <img
            src={detail?.instructor_image}
            className="min-w-full h-full object-cover  rounded-md"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default Detail2;
