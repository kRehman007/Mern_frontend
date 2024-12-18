import React, { useEffect, useState } from "react";
import { Container, Typography, Stack, Box, Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useParams } from "react-router-dom";
import EnrollmentModal from "../Modal";
import { useGetAllRatingsQuery } from "../../Redux/API/courseAPI";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [detail, setDetail] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setDetail(location?.state);
  }, []);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container sx={{ xs: 6, sm: 8 }}>
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
        FAQ Section
      </Typography>
      <Stack direction="column" mt={4} gap={2}>
        {detail?.faqs?.map((faq, index) => (
          <Stack key={index} className="flex flex-col gap-2">
            <Box className="w-full p-5 text-white text-lg flex justify-between items-center bg-gray-700 hover:bg-gray-600 rounded-md">
              <Typography>{faq.question}?</Typography>
              <button onClick={() => toggleAnswer(index)}>
                {activeIndex === index ? (
                  <RxCross2 style={{ color: "#e91367" }} className="text-3xl" />
                ) : (
                  <FaPlus style={{ color: "#e91367" }} className="text-3xl" />
                )}
              </button>
            </Box>
            {activeIndex === index && (
              <Box className="w-full p-5 text-white text-lg bg-gray-500 hover:bg-gray-600 rounded-md">
                {faq.answer}
              </Box>
            )}
          </Stack>
        ))}
      </Stack>

      <Button
        sx={{
          background: "#e91367",
          color: "#fff",
          mt: 2,
          textTransform: "capitalize",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Enroll Now
      </Button>

      <EnrollmentModal open={isModalOpen} handleClose={handleCloseModal} />
    </Container>
  );
};

export default FAQ;
