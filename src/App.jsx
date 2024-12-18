import HomePage from "./Components/Home/HomePage";
import { Route, Routes } from "react-router-dom";
import Courses from "./Components/Courses/Courses";
import Pannel from "./Components/Admin/Pannel";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import DetailPage from "./Components/CourseDetail/DetailPage";
import Dashboardpage from "./Components/Dashboard/Dashboardpage";
import { useAuth } from "./Components/Hooks/useAuth";
import ProtectedRoute from "./Components/ProtectedRoute";
import PageNotFound from "./Components/PageNotFound";

function App() {
  const { user } = useAuth();
  console.log("user info:- ", user);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admin" element={<Pannel />} />
        <Route path="/dashboard" element={<Dashboardpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/course/:id/detail" element={<DetailPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
