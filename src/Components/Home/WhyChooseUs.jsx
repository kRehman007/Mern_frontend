import { Container, Typography, Box } from "@mui/material";
import React from "react";

const WhyChooseUs = () => {
  return (
    <Container sx={{ mt: 9 }}>
      <Typography
        variant="h2"
        sx={{ fontSize: "2rem", fontWeight: "semibold", color: "#673ab7" }}
      >
        Why Choose Us
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontSize: "1rem", fontWeight: "medium", color: "#e91367" }}
      >
        Learn about us
      </Typography>
      <Box sx={{ mt: 2 }} className="font-roboto text-sm">
        <Typography>
          At EduLearn, we believe in empowering students by providing
          high-quality, accessible, and engaging courses designed to meet
          diverse learning needs. Our platform is built to ensure students not
          only gain knowledge but also develop the skills needed to excel in
          their chosen fields. With expertly curated content, interactive
          learning tools, and dedicated support, we make learning an enjoyable
          and rewarding journey.
        </Typography>
        <Typography sx={{ mt: 1 }}>
          Choosing EduLearn means choosing a brighter future. Our courses are
          designed by industry professionals and educators who are passionate
          about fostering growth and success. Whether you're looking to enhance
          your skills, explore new interests, or achieve academic excellence,
          EduLearn is here to guide you every step of the way. Join us today and
          unlock your true potential!
        </Typography>
      </Box>
    </Container>
  );
};

export default WhyChooseUs;
