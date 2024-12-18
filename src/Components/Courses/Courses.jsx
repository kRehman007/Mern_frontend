import React, { useEffect, useState } from "react";
import Lists from "./Lists";
import { useNavigate } from "react-router-dom";
import { useGetCourseMutation } from "../../Redux/API/courseAPI";
import Nav from "../Home/Nav";
import LoaderIcon from "../Loader";
import Footer from "../Home/Footer";

const Courses = () => {
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
    <div>
      <Nav />
      <Lists courses={courses} />
      <Footer />
    </div>
  );
};

export default Courses;
