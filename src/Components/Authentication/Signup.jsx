import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import logo from "../../assets/LogoDesign.webp";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useUserSignupMutation } from "../../Redux/API/userAPI";
import img from "../../assets/photo-1488998427799-e3362cec87c3.avif";
import Toast from "../Toast";

const schema = z.object({
  fullname: z.string().nonempty("Fullname is required"),
  username: z.string().nonempty("Username is required"),
  email: z.string().nonempty("Email is required").email("Invalid Email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be of 6 characters"),
});

const Signup = () => {
  const [userSignup] = useUserSignupMutation();
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await userSignup(data).unwrap();
      console.log("response", response);
      reset();
      navigate("/login");
    } catch (error) {
      setMsg(null);
      setTimeout(() => {
        setMsg(error?.data?.message);
      }, 0);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-800 text-white">
      <Container sx={{ pt: { xs: 10 } }}>
        {msg && <Toast value={msg} severity="error" />}
        <Box
          sx={{ display: "flex" }}
          className="border border-gray-600 rounded-md"
        >
          <Box
            sx={{
              width: "48%",
              display: { xs: "none", md: "block" },
              height: "500px",
            }}
          >
            <img src={logo} className="w-full h-full object-cover" />
          </Box>
          <Box
            sx={{
              width: { xs: "95%", md: "48%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <img src={logo} className="w-16 h-16 mt-1 rounded-full lg:hidden" />
            <Typography
              variant="h5"
              className="font-montserrat "
              sx={{ color: "#673ab7", textAlign: "center", mt: 1 }}
            >
              Create an Account
            </Typography>
            <form
              className=" w-full sm:w-3/4   flex flex-col gap-3 p-3   "
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                label="FullName"
                type="text"
                name="fullname"
                size="small"
                {...register("fullname")}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#fff",
                    opacity: 0.5,
                  },
                  "& .MuiInputBase-input": {
                    color: "#ffffff",
                  },
                }}
              />
              <TextField
                label="UserName"
                type="text"
                name="username"
                size="small"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#fff",
                    opacity: 0.5,
                  },
                  "& .MuiInputBase-input": {
                    color: "#ffffff",
                  },
                }}
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                size="small"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#fff",
                    opacity: 0.5,
                  },
                  "& .MuiInputBase-input": {
                    color: "#ffffff",
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                size="small"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#fff",
                    opacity: 0.5,
                  },
                  "& .MuiInputBase-input": {
                    color: "#ffffff",
                  },
                }}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                sx={{
                  background: "#e91367",
                  color: "#fff",
                  padding: "7px 25px",
                  textTransform: "capitalize",
                  "&:hover": {
                    transform: "scale(1.04)",
                  },
                }}
                className="w-[max-content]"
              >
                {isSubmitting ? (
                  <CircularProgress color="secondary" size="25px" />
                ) : (
                  "Signup"
                )}
              </Button>
            </form>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              mt={{ xs: "20px", md: "10px" }}
            >
              <Typography
                className="font-roboto"
                sx={{ color: "#fff", fontSize: "14px" }}
              >
                Already have an account?
              </Typography>
              <Typography
                onClick={() => navigate("/login")}
                sx={{
                  color: "#673ab7",
                  textDecoration: "underline",
                  fontSize: "14px",
                }}
                className="font-roboto underline-offset-4 pl-1 cursor-pointer"
              >
                Login
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;
