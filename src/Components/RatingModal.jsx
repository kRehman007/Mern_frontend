import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography, Box, TextField, CircularProgress } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddRatingMutation,
  useGetSingleStudentQuery,
} from "../Redux/API/courseAPI";
import useUserAuth from "./Hooks/useUserAuth";
import Toast from "./Toast";
import { useNavigate, useParams } from "react-router-dom";

const schema = z.object({
  rating: z.number().min(1, "Please provide a rating..."),
  comment: z.string().min(1, "at least 10 characters are requird"),
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
const RatingModal = ({ open, handleClose, refetchRatings }) => {
  const params = useParams();
  const { refetch } = useGetSingleStudentQuery({ id: params.id });
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const { user } = useUserAuth();
  const [addRating] = useAddRatingMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const formData = { ...data, userID: user?.id, courseID: params.id };
      const response = await addRating(formData).unwrap();
      setMessage(response?.message);
      reset();
      handleClose();
      if (refetchRatings) refetchRatings();
      if (refetch) refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {message && <Toast value={message} />}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Box sx={style} className="w-[350px] ">
            <Typography
              id="spring-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "#673ab7" }}
            >
              Leave your Rviews
            </Typography>
            <div className="flex justify-center flex-col gap-1 mt-7">
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={field.value}
                    onChange={(e, newValue) => field.onChange(newValue)}
                  />
                )}
              />
              {errors.rating && (
                <span className="text-sm text-red-600">
                  {errors.rating.message}
                </span>
              )}
            </div>
            <TextField
              {...register("comment")}
              name="comment"
              placeholder="leave your thoughts..."
              variant="standard"
              margin="dense"
              error={!!errors.review}
              helperText={errors.review?.message}
              fullWidth
              multiline
            />

            <Button
              type="submit"
              sx={{
                background: "#e91367",
                color: "#fff",
                font: "small-caption",
                mt: 3,
                float: "right",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress color="secondary" size="20px" />
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default RatingModal;
