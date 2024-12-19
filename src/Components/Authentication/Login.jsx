import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/LogoDesign.webp";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useUserLogInMutation } from "../../Redux/API/userAPI";
import Toast from "../Toast";
import { useAuth } from "../Hooks/useAuth";

const schema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
});

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [userLogIn] = useUserLogInMutation();
  const [msg, setMsg] = useState(null);
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    register,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await userLogIn(data).unwrap();
      console.log("res", response);
      setUser(response?.user);
      reset();
      navigate("/");
    } catch (error) {
      console.log("error", error?.data?.message);
      setMsg(null);
      setTimeout(() => {
        setMsg(error?.data?.message);
      }, 0);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
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
              height: { xs: "400px", md: "auto" },
            }}
          >
            <img src={logo} className="w-16 h-16  rounded-full lg:hidden" />
            <Typography
              variant="h5"
              className="font-montserrat font-semibold"
              sx={{
                color: "#673ab7",
                textAlign: "center",
                mt: 1,
              }}
            >
              Welcome to EduLearn
            </Typography>

            <form
              className=" w-full sm:w-3/4  flex flex-col gap-3 mt-5  mx-auto"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
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
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ffffff",
                      opacity: 0.4,
                    },
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
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ffffff",
                      opacity: 0.4,
                    },
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
                  "Login"
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
                Don't have an account?
              </Typography>
              <Typography
                onClick={() => navigate("/signup")}
                sx={{
                  color: "#673ab7",
                  textDecoration: "underline",
                  fontSize: "14px",
                  mt: -0.5,
                }}
                className="font-roboto underline-offset-4 pl-1 cursor-pointer"
              >
                Signup
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
