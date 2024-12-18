import {
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Lists = ({ courses = [] }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const navigate = useNavigate();
  const categories = [
    {
      value: "All",
    },
    {
      value: "Technology",
    },
    {
      value: "Business",
    },
    {
      value: "Web Dev",
    },
  ];
  const handleSearch = (e) => {
    let updatedCourses;

    if (search) {
      updatedCourses = courses.filter((course) =>
        course.course_title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCourses(updatedCourses);
    }
    if (category !== "All") {
      updatedCourses = courses.filter((course) =>
        course.course_category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredCourses(updatedCourses);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search, category]);

  const coursesToDisplay =
    search || category !== "All" ? filteredCourses : courses;
  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h1"
        className="font-montserrat font-bold"
        sx={{ fontSize: { xs: "2rem", sm: "2.5rem" }, color: "#673ab7" }}
      >
        Explore Our Courses
      </Typography>
      <Typography
        variant="h6"
        className="font-poppins"
        sx={{ fontSize: "1rem", color: "#e91363" }}
      >
        Find the best courses to upskill and achieve your goals!
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={{ xs: 1, sm: 2 }}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 7 }}
      >
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Find your courses"
          variant="outlined"
          sx={{ width: "300px" }}
        />
        <Typography sx={{ fontWeight: "bold" }}>OR</Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <TextField
            select
            onChange={(e) => setCategory(e.target.value)}
            label="Select by category"
            value={category}
            sx={{ width: "300px" }}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>
      <Stack
        sx={{
          mt: 7,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
          },
          gap: 2,
        }}
      >
        {coursesToDisplay.length > 0 ? (
          coursesToDisplay?.map((course, index) => (
            <Stack
              key={index}
              direction="column"
              gap={0}
              className="border p-5 relative h-[380px] shadow-lg rounded-sm max-w-[350px]"
            >
              <img
                src={course.instructor_image}
                className="w-full max-h-[200px]  object-cover   rounded-md"
              />
              <Typography
                className="font-poppins"
                sx={{
                  mt: 2,
                  color: "#673ab7",
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                {course.course_title}
              </Typography>
              <Typography
                className="font-roboto"
                sx={{
                  fontSize: "14px",
                  wordWrap: "break-word",
                }}
              >
                {course.course_desc.substring(0, 50)}...
              </Typography>
              <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                ${course.course_price}
              </Typography>
              <Button
                onClick={() =>
                  navigate(`/course/${course._id}/detail`, { state: course })
                }
                sx={{
                  backgroundColor: "#e91367",
                  position: "absolute",
                  bottom: "14px",
                  color: "white",
                  width: "max-content",
                  textTransform: "capitalize",
                  mt: 1,
                  fontSize: "12px",

                  "&:hover": {
                    transform: "scale(1.04)",
                  },
                }}
              >
                Read More
              </Button>
            </Stack>
          ))
        ) : (
          <Typography
            sx={{ fontSize: "20px", textAlign: "center", color: "#673ab7" }}
          >
            No course Found
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default Lists;
