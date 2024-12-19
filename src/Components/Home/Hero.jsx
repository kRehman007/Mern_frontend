import React, { useState, useEffect } from "react";
import { Container, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetCourseMutation } from "../../Redux/API/courseAPI";
import LoaderIcon from "../Loader";

const Hero = () => {
  const navigate = useNavigate();
  const [getCourse, { isLoading }] = useGetCourseMutation();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchAllCourses = async () => {
      const res = await getCourse();
      setCourses(res?.data?.courses);
    };
    fetchAllCourses();
  }, []);

  if (isLoading) {
    return <LoaderIcon />;
  }
  return (
    <Container sx={{ mt: 5 }}>
      <Stack direction="column" gap={0}>
        <Typography
          variant="h1"
          className="font-montserrat font-bold"
          sx={{ fontSize: { xs: "2rem", sm: "2.5rem" }, color: "#673ab7" }}
        >
          Welcome to EduLearn
        </Typography>
        <Typography
          variant="h2"
          className="font-poppins"
          sx={{ fontSize: "2rem", fontWeight: "semibold", color: "#e91363" }}
        >
          Gateway to Learn
        </Typography>
        <Typography className="font-roboto" sx={{ fontSize: "1rem", mt: 1 }}>
          Unlock your potential with EduLearn, your gateway to mastering new
          skills. Dive into expert-led courses accessible anytime, anywhere,
          designed to fuel your curiosity and empower your career. Start your
          learning journey today! Learn skills from top instructors, anytime,
          anywhere
        </Typography>
        <Button
          onClick={() => navigate("/courses")}
          sx={{
            background: "#e91363",
            width: "max-content",
            textTransform: "capitalize",
            color: "#fff",
            mt: 2,
            "&:hover": {
              transform: "scale(1.04)",
            },
          }}
        >
          Browse Courses
        </Button>
        <Typography
          variant="h2"
          className="font-poppins font-semibold"
          sx={{ fontSize: "2rem", color: "#673ab7", mt: 10 }}
        >
          Top Mentors
          <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mt: 2 }}>
            {courses?.slice(0, 3).map((course, index) => (
              <Typography
                key={index}
                component="div"
                className=" w-full sm:w-1/3 border p-5 shadow-lg rounded-sm"
              >
                <img
                  src={course?.instructor_image}
                  className="rounded-md  h-[250px]  object-center object-cover w-full mb-4"
                />
                <Typography>{course?.course_title} </Typography>
                <Typography sx={{ color: "#e91367" }}>
                  {course?.instructor_name}
                </Typography>
              </Typography>
            ))}
          </Stack>
        </Typography>
      </Stack>
    </Container>
  );
};

export default Hero;
