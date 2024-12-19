import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircularProgress, TextField } from "@mui/material";

import { useParams } from "react-router-dom";
import {
  useAddStudentMutation,
  useGetAllRatingsQuery,
} from "../Redux/API/courseAPI";
import Toast from "./Toast";
import RatingModal from "./RatingModal";

const schema = z.object({
  fullName: z.string().nonempty("Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(11, "Enter valid phone number")
    .max(11, ""),

  city: z.string().nonempty("enter your city"),
  country: z.string().nonempty("Enter your country"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function EnrollmentModal({ open, handleClose }) {
  const params = useParams();
  const [addStudent] = useAddStudentMutation();
  const { refetch } = useGetAllRatingsQuery();
  const [isRatingModal, setIsRatingModal] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = { ...data, courseId: params.id };
      const response = await addStudent(formData).unwrap();
      setMessage(response?.message);
      reset();
      handleClose();
      if (response?.message.includes("success")) {
        handleOpenRatingModal();
      }
    } catch (error) {
      console.log("error in adding student", error);
      setMessage(error?.data?.message);
      setFocus("email");
    }
  };
  setTimeout(() => {
    setMessage(null);
  }, 3000);
  const handleCloseRatingModal = () => {
    setIsRatingModal(false);
  };
  const handleOpenRatingModal = () => {
    setIsRatingModal(true);
  };
  return (
    <div>
      {message && <Toast value={message} />}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} className="w-[350px] sm:w-[400px]">
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            className="font-montserrat"
            sx={{ color: "#673ab7" }}
          >
            Enroll here
          </Typography>
          <Typography
            id="keep-mounted-modal-description"
            className="font-roboto"
            sx={{ fontSize: "14px" }}
          >
            Thank you for showing interest. Please proceed with the enrollment
            process.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="flex flex-col mt-5 gap-2">
              <TextField
                size="small"
                placeholder="FullName"
                type="text"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                {...register("fullName")}
              />

              <TextField
                placeholder=" Email"
                size="small"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
              />
              <TextField
                placeholder="Phone Number"
                size="small"
                type="tel"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register("phone")}
              />
              <TextField
                placeholder="City"
                size="small"
                type="text"
                error={!!errors.city}
                helperText={errors.city?.message}
                {...register("city")}
              />
              <TextField
                placeholder="Country"
                size="small"
                type="text"
                error={!!errors.country}
                helperText={errors.country?.message}
                {...register("country")}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-max mt-1"
                sx={{
                  background: "#e91367",
                  color: "#fff",
                  textTransform: "capitalize",
                  "&:hover": {
                    transform: "scale(1.04)",
                  },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress color="secondary" size="25px" />
                ) : (
                  "Enroll"
                )}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      <RatingModal
        open={isRatingModal}
        handleClose={handleCloseRatingModal}
        refetchRatings={refetch}
      />
    </div>
  );
}
