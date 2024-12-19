import React, { useState } from "react";
import { Container, Stack, Typography, Box, Avatar } from "@mui/material";

import img from "../../assets/12.jpg";
import Rating from "@mui/material/Rating";
import { useGetAllRatingsQuery } from "../../Redux/API/courseAPI";
import { Link, useParams } from "react-router-dom";
import LoaderIcon from "../Loader";

function ReviewAndRatings() {
  const params = useParams();
  const [showComment, setShowComment] = useState(false);
  const { data, isLoading } = useGetAllRatingsQuery(params.id);
  console.log("data", data);
  console.log(showComment);

  if (isLoading) {
    return <LoaderIcon />;
  }
  return (
    <>
      {data?.comments?.length > 0 && (
        <Container sx={{ xs: 6, sm: 8, zIndex: "0" }}>
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
            Reviews and Ratings
          </Typography>
          <Typography
            className="text-gray-500"
            sx={{ fontSize: "14px", mt: 1 }}
          >
            Reviews and ratings are verified and from people who uses the same
            type of device that you use
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0, mt: 2 }}>
            <Typography variant="h6" sx={{ color: "#333", fontWeight: "600" }}>
              Overall Rating
            </Typography>
            <div className="flex   gap-1 mb-2 items-center w-max">
              <p
                className="text-3xl font-semibold "
                style={{ color: "#e91367" }}
              >
                {(data?.avgRating).toFixed(1)}
              </p>
              <Rating value={data?.avgRating ?? 0} readOnly size="large" />
            </div>
          </Box>
          <Link
            onClick={() => setShowComment(!showComment)}
            to=""
            className="text-sm "
          >
            {!showComment ? "See reviews ..." : "Hide reviews ..."}
          </Link>
          {showComment &&
            data?.comments?.map((comment, index) => (
              <Stack
                key={index}
                direction="column"
                gap={2}
                mt={3}
                className="border rounded-md p-3 shadow-lg"
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Avatar src="/broken-image.jpg" />
                  <Typography sx={{ color: "#e91367", fontSize: "14px" }}>
                    {comment.created_by}
                  </Typography>
                </Box>
                <Typography
                  className="font-roboto  text-sm text-gray-700"
                  sx={{ fontSize: "14px", mt: -1 }}
                >
                  {comment.text}
                </Typography>
              </Stack>
            ))}
        </Container>
      )}
    </>
  );
}

export default ReviewAndRatings;
