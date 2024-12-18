import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetCourseMutation,
  useGetTotalStudentsMutation,
} from "../../Redux/API/courseAPI";
import Toast from "../Toast";
import Nav from "../Home/Nav";
import { useAuth } from "../Hooks/useAuth";
import LoaderIcon from "../Loader";
import Footer from "../Home/Footer";

const Dashboardpage = () => {
  const { user } = useAuth();
  const [msg, setMsg] = useState(null);
  const [lastcourse, setLastCourse] = useState("");
  const [recentStudent, setRecentStudent] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [totalStudents, setTotalStudents] = useState();
  const [getCourse] = useGetCourseMutation();
  const [getTotalStudent, { isLoading }] = useGetTotalStudentsMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await getCourse();
      console.log("Total Courses", response);

      const TotalCourses = response?.data?.courses;

      setAllCourses(TotalCourses || []);
      setLastCourse(TotalCourses[TotalCourses.length - 1]);
    };
    const fetchAllStudents = async () => {
      const Total = await getTotalStudent();
      console.log("Total Students", Total);
      const AllStudents = Total?.data?.total;
      setRecentStudent(AllStudents[AllStudents.length - 1].fullName);
      setTotalStudents(Total?.data?.total?.length);
    };
    fetchCourseData();
    fetchAllStudents();
  }, []);

  const handleCourses = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      setMsg(null);
      setTimeout(() => {
        setMsg("You are unauthorized to access this route");
      }, 0);
    }
  };

  if (isLoading) {
    return <LoaderIcon />;
  }
  return (
    <>
      {msg && <Toast value={msg} severity="warning" />}
      <Nav />

      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 4, color: "#673ab7" }}
        >
          Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Summary Stats */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Courses</Typography>
                <Typography variant="h4" sx={{ color: "#e91367" }}>
                  {allCourses.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Students</Typography>
                <Typography variant="h4" sx={{ color: "#e91367" }}>
                  {totalStudents || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Manage Courses */}
          <Grid xs={12} item>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Manage Courses
                </Typography>
                <Button
                  sx={{
                    background: "#673ab7",
                    color: "#fff",
                    mr: 2,
                    fontSize: "12px",
                  }}
                  onClick={() => navigate("/courses")}
                >
                  View All Courses
                </Button>
                <Button
                  sx={{
                    background: "#e91367",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  onClick={handleCourses}
                >
                  Add New Course
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5">Recent Activity</Typography>
                <ul>
                  <li>
                    New Course Added:{" "}
                    <span style={{ color: "#e91367" }}>
                      {lastcourse?.course_title}
                    </span>
                  </li>
                  <li>
                    New Enrollment:{" "}
                    <span style={{ color: "#e91367" }}>{recentStudent}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboardpage;
